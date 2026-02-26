import { isParallelogramAngles } from './paralelogram.js'

type TestCase = {
  name: string
  angles: number[]
  expectResult: boolean
  expectErrorContains?: string
}

const tests: TestCase[] = [
  {
    name: 'Simple valid parallelogram (60,120,60,120)',
    angles: [60, 120, 60, 120],
    expectResult: true,
  },
  {
    name: 'Floating values within tolerance',
    angles: [60.0000001, 119.9999999, 60.0000001, 119.9999999],
    expectResult: true,
  },
  {
    name: 'Sum 360 but not parallelogram (random ordering)',
    angles: [80, 100, 70, 110], // sum 360 but opposite not equal
    expectResult: false,
    expectErrorContains: 'parallelogram properties',
  },
  {
    name: 'Sum not 360',
    angles: [90, 90, 90, 80],
    expectResult: false,
    expectErrorContains: 'sum to 360',
  },
  {
    name: 'Non-numeric input simulated with NaN',
    angles: [NaN, 90, 90, 90],
    expectResult: false,
    expectErrorContains: 'not a valid number',
  },
  {
    name: 'Invalid angle ranges (0 or >=180)',
    angles: [0, 180, 90, 90],
    expectResult: false,
    expectErrorContains: 'out of valid range',
  },
]

let passed = 0
let failed = 0

for (const t of tests) {
  const res = isParallelogramAngles(t.angles)
  const ok = res.result === t.expectResult && (t.expectResult || (t.expectErrorContains ? (res.error || '').includes(t.expectErrorContains) : true))
  if (ok) {
    console.log(`[PASS] ${t.name}`)
    passed++
  } else {
    console.error(`[FAIL] ${t.name}`)
    console.error('  angles:', t.angles)
    console.error('  got:', res)
    console.error('  expectedResult:', t.expectResult, 'expectedErrorContains:', t.expectErrorContains)
    failed++
  }
}

console.log(`\nSummary: ${passed} passed, ${failed} failed, ${tests.length} total`) 

if (failed > 0) process.exit(1)
