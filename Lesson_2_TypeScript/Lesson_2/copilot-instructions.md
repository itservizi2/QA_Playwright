# Grocery Store Checkout System - TypeScript Project

This project contains a TypeScript program that simulates a grocery store checkout system with automatic scanners.

## Scenario

You are at the cash register of a grocery store. You have bought five products (x, y, z, a, and b). You pay using a card and head towards the EXIT door.

## Project Structure

```
Lesson_2/
├── src/
│   ├── shop.ts         # Main program with checkout system logic
│   └── shop_tests.ts   # Test suite for the checkout system
├── temp/               # Compilation output directory (auto-generated)
├── package.json
├── tsconfig.json
└── copilot-instructions.md
```

## Test Ideas Implemented

The test suite (`shop_tests.ts`) includes the following test scenarios:

1. **Scanner Functionality Tests**
   - Scanner correctly identifies products by barcode
   - Scanner returns null for invalid barcodes
   - Scanner reads all five product barcodes correctly

2. **Multiple Products Scanning**
   - All 5 products (x, y, z, a, b) can be scanned successfully
   - Cash register tracks the correct number of products

3. **Price Calculation**
   - Total price is calculated correctly for all 5 products

4. **Payment Card Scanning**
   - Valid payment cards are accepted
   - Invalid payment cards are rejected

5. **Payment Processing (Sufficient Funds)**
   - Payment succeeds when card has sufficient balance
   - Card balance is reduced by the correct amount

6. **Insufficient Funds Handling**
   - Payment fails gracefully when card has insufficient balance

7. **Invalid Card Handling**
   - Payment fails with invalid card number

8. **Edge Cases**
   - Empty cart returns zero total
   - Payment succeeds for empty cart

9. **Error Handling**
   - Invalid barcodes are handled gracefully

10. **Complete Checkout Flow**
    - End-to-end test: scan 5 products → pay → verify → head to EXIT

## Compilation Output

TypeScript files are compiled into JavaScript and placed in a temporary folder called `temp` (not alongside `.ts` files).

The `tsconfig.json` should include:
```json
{
  "compilerOptions": {
    "outDir": "./temp",
    "rootDir": "./src"
  }
}
```

## Commands (Terminal)

### Install Development Tools (if needed)
```bash
npm install --save-dev typescript @types/node ts-node tsx
```

### Compile TypeScript to JavaScript (output in `temp/`)
```bash
npx tsc --outDir temp --rootDir src
```
Or if TypeScript is installed globally:
```bash
tsc --outDir temp --rootDir src
```

### Build the Project
```bash
npm run build
```

### Run the Compiled JavaScript
```bash
# Run the main shop program
node temp/shop.js

# Run the test suite
node temp/shop_tests.js
```

### Run TypeScript Directly (without compilation)
Using `tsx` or `ts-node`:
```bash
# Run the main shop program
npx tsx src/shop.ts

# Run the test suite
npx tsx src/shop_tests.ts
```

Alternative with `ts-node`:
```bash
npx ts-node src/shop.ts
npx ts-node src/shop_tests.ts
```

## Program Features

### Classes and Interfaces

- **Product**: Represents a grocery product with id, name, price, and barcode
- **PaymentCard**: Represents a customer's payment card with number and balance
- **Scanner**: Handles barcode scanning and card validation
- **CashRegister**: Manages the checkout process, scanning items, and payment

### Sample Products

The system includes 5 pre-defined products:
- Product X - Milk ($3.99)
- Product Y - Bread ($2.49)
- Product Z - Eggs ($4.99)
- Product A - Butter ($5.49)
- Product B - Cheese ($6.99)

## Expected Output

When running the tests, you should see:
- ✓ PASS for successful tests
- ✗ FAIL for failed tests
- A summary showing total tests, passed, and failed count
- A message indicating readiness to head to the EXIT door

## Notes

- The program uses ES modules (`import`/`export`) with `.js` extensions in import statements for compatibility
- All TypeScript compilation outputs go to the `temp/` directory
- The test suite includes 20+ test cases covering various scenarios
- Payment processing includes validation for card format and sufficient funds
