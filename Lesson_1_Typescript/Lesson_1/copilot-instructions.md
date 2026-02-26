# Copilot instructions — Lesson 1

Task: implement a TypeScript console application that reads four angles of a quadrilateral and decides whether those angles can be the angles of a parallelogram.

Files to create (place in the project):
- `src/paralelogram.ts` — the application and exported validation function
- `src/paralelogram_tests.ts` — test runner containing a list of tests

Compilation output:
- TypeScript must compile into JavaScript files placed in a temporary folder called `temp` (do not put generated `.js` files next to `.ts`). Use a `tsconfig.json` with `outDir` set to `temp` or call `tsc --outDir temp`.

paralelogram.ts — requirements and hints
- Implement a function exported as `isParallelogramAngles(angles: number[]): { result: boolean; error?: string }` that:
  - Validates there are exactly four numeric values.
  - Validates each angle is a number strictly between 0 and 180 (not inclusive).
  - Validates the four angles sum to 360 (use a small epsilon tolerance for floating point).
  - Checks parallelogram properties (from school geometry): opposite angles are equal (angle1 === angle3 and angle2 === angle4) or equivalently each pair of adjacent angles are supplementary (sum to 180). Use a tolerance when comparing.
  - Returns `{ result: true }` when all checks pass, or `{ result: false, error: '...' }` with a short error message when invalid.

- Also implement a console entry point (readline) so running the compiled `temp/paralelogram.js` asks the user (one by one) to enter four angle values.
  - Parse input with `parseFloat` and treat non-numeric input as an error (print a helpful message and exit non-zero).
  - Print a clear message: either "These angles CAN be angles of a parallelogram" or "These angles CANNOT be angles of a parallelogram" plus the error when relevant.

paralelogram_tests.ts — requirements
- Import the exported `isParallelogramAngles` function and implement a list of test cases covering:
  - Valid parallelogram (e.g. 60, 120, 60, 120)
  - Valid parallelogram with floating values and tolerance
  - Non-parallelogram quadrilateral (sum 360 but opposite angles not equal)
  - Sum not 360 (invalid)
  - Non-numeric input (simulate by calling with `NaN` or by catching the exported validator error)
  - Invalid angle ranges (0 or >=180, negative)
- The test runner should print per-test PASS/FAIL and a short summary (X passed / Y total).
- Keep tests as a plain TypeScript file that imports the validation function; do not require a test framework (so they are runnable with `ts-node` or by compiling and running the compiled JS in `temp`).

Commands (terminal)
- Install dev tools if needed:
  - `npm install --save-dev typescript @types/node ts-node`
- Compile TypeScript into `temp`:
  - `npx tsc --outDir temp`  (or just `tsc --outDir temp` if `tsc` is installed globally)
- Run the console app from terminal:
  - `npm run build`
  - `node temp/paralelogram.js`
  - `node temp/paralelogram_tests.js`
- Run the tests (two options):
  - Directly : `npx tsx src/paralelogram.ts`
  - Directly : `npx tsx src/paralelogram_tests.ts`
  

Notes and testing hints
- Use a small epsilon (for example `1e-6`) when comparing floating point sums and equality.
- The CLI should handle non-digital entries gracefully by printing an error and exiting non-zero.
- Keep `paralelogram.ts` export-friendly (so tests can import the validator) and self-contained for CLI usage.

End of instructions.