export function isParallelogramAngles(angles: number[]): { result: boolean; error?: string } {
  const eps = 1e-6

  if (!Array.isArray(angles)) {
    return { result: false, error: 'Input must be an array of numbers' }
  }

  if (angles.length !== 4) {
    return { result: false, error: 'Exactly four angles are required' }
  }

  for (let i = 0; i < 4; i++) {
    const a = angles[i]
    if (typeof a !== 'number' || Number.isNaN(a)) {
      return { result: false, error: `Angle at index ${i} is not a valid number` }
    }
    if (!(a > 0 && a < 180)) {
      return { result: false, error: `Angle at index ${i} is out of valid range (0, 180)` }
    }
  }

  const sum = angles.reduce((s, v) => s + v, 0)
  if (Math.abs(sum - 360) > eps) {
    return { result: false, error: `Angles must sum to 360 (got ${sum})` }
  }

  const eq = (x: number, y: number) => Math.abs(x - y) <= eps

  const angle0 = angles[0]!
  const angle1 = angles[1]!
  const angle2 = angles[2]!
  const angle3 = angles[3]!

  // Check opposite angles equal (angle0 == angle2 and angle1 == angle3)
  if (eq(angle0, angle2) && eq(angle1, angle3)) {
    return { result: true }
  }

  // Or adjacent angles are supplementary (sum to 180)
  const sup = (x: number, y: number) => Math.abs(x + y - 180) <= eps
  if (sup(angle0, angle1) && sup(angle1, angle2) && sup(angle2, angle3) && sup(angle3, angle0)) {
    return { result: true }
  }

  return { result: false, error: 'Angles do not satisfy parallelogram properties (opposite angles equal or adjacent supplementary)' }
}

// CLI entry point
import { createInterface } from 'readline'
import { fileURLToPath } from 'url'

if (import.meta.url === `file:///${process.argv[1]?.replace(/\\/g, '/')}`) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const angles: number[] = []
  let idx = 0

  const ask = (): void => {
    if (idx >= 4) {
      rl.close()
      const result = isParallelogramAngles(angles)
      if (result.result) {
        console.log('These angles CAN be angles of a parallelogram')
        process.exit(0)
      } else {
        console.log('These angles CANNOT be angles of a parallelogram')
        if (result.error) console.log('Reason:', result.error)
        process.exit(0)
      }
      return
    }

    rl.question(`Enter angle ${idx + 1}: `, (answer: string) => {
      const v = parseFloat(answer)
      if (Number.isNaN(v)) {
        console.error('Invalid numeric input. Please enter a valid number.')
        rl.close()
        process.exit(1)
        return
      }
      angles.push(v)
      idx++
      ask()
    })
  }

  ask()
}
