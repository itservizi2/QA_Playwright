/**
 * Test Suite for Grocery Store Checkout System
 * 
 * Test Scenario: You are at the cash register of a grocery store. 
 * You have bought five products (x, y, z, a and b). 
 * You pay and head towards the EXIT door.
 */

import { CashRegister, Scanner, storeProducts } from './shop.js';
import type { Product, PaymentCard } from './shop.js';

// Simple test framework
let testsPassed = 0;
let testsFailed = 0;

function test(description: string, fn: () => boolean): void {
    try {
        const result = fn();
        if (result) {
            console.log(`✓ PASS: ${description}`);
            testsPassed++;
        } else {
            console.log(`✗ FAIL: ${description}`);
            testsFailed++;
        }
    } catch (error) {
        console.log(`✗ ERROR: ${description}`);
        console.log(`  ${error}`);
        testsFailed++;
    }
}

console.log("=== GROCERY STORE CHECKOUT TESTS ===\n");

// TEST IDEA 1: Scanner reads correct product information
console.log("--- Test Suite 1: Scanner Functionality ---");
test("Scanner should correctly identify product X by barcode", () => {
    const scanner = new Scanner();
    const product = scanner.scanProduct("1234567890", storeProducts);
    return product !== null && product.name === "Product X - Milk" && product.price === 3.99;
});

test("Scanner should return null for invalid barcode", () => {
    const scanner = new Scanner();
    const product = scanner.scanProduct("9999999999", storeProducts);
    return product === null;
});

test("Scanner should correctly read all five product barcodes", () => {
    const scanner = new Scanner();
    const barcodes = ["1234567890", "2345678901", "3456789012", "4567890123", "5678901234"];
    const scanned = barcodes.map(bc => scanner.scanProduct(bc, storeProducts));
    return scanned.every(p => p !== null) && scanned.length === 5;
});

// TEST IDEA 2: All five products can be scanned successfully
console.log("\n--- Test Suite 2: Scanning Multiple Products ---");
test("Cash register should scan all 5 products (x, y, z, a, b) successfully", () => {
    const register = new CashRegister();
    const success1 = register.scanItem("1234567890", storeProducts); // X
    const success2 = register.scanItem("2345678901", storeProducts); // Y
    const success3 = register.scanItem("3456789012", storeProducts); // Z
    const success4 = register.scanItem("4567890123", storeProducts); // A
    const success5 = register.scanItem("5678901234", storeProducts); // B
    return success1 && success2 && success3 && success4 && success5;
});

test("Cash register should track exactly 5 products after scanning", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts);
    register.scanItem("2345678901", storeProducts);
    register.scanItem("3456789012", storeProducts);
    register.scanItem("4567890123", storeProducts);
    register.scanItem("5678901234", storeProducts);
    return register.getScannedProducts().length === 5;
});

// TEST IDEA 3: Total price calculation is correct
console.log("\n--- Test Suite 3: Price Calculation ---");
test("Total price should be correctly calculated for all 5 products", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts); // 3.99
    register.scanItem("2345678901", storeProducts); // 2.49
    register.scanItem("3456789012", storeProducts); // 4.99
    register.scanItem("4567890123", storeProducts); // 5.49
    register.scanItem("5678901234", storeProducts); // 6.99
    const expectedTotal = 3.99 + 2.49 + 4.99 + 5.49 + 6.99; // 23.95
    return Math.abs(register.getTotal() - expectedTotal) < 0.01;
});

// TEST IDEA 4: Card scanning and validation
console.log("\n--- Test Suite 4: Payment Card Scanning ---");
test("Scanner should accept valid payment card", () => {
    const scanner = new Scanner();
    return scanner.scanCard("1234567812345678");
});

test("Scanner should reject invalid payment card (too short)", () => {
    const scanner = new Scanner();
    return !scanner.scanCard("12345");
});

// TEST IDEA 5: Payment processing with sufficient funds
console.log("\n--- Test Suite 5: Payment Processing ---");
test("Payment should succeed when card has sufficient balance", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts);
    register.scanItem("2345678901", storeProducts);
    register.scanItem("3456789012", storeProducts);
    register.scanItem("4567890123", storeProducts);
    register.scanItem("5678901234", storeProducts);
    
    const card: PaymentCard = { cardNumber: "1234567812345678", balance: 50.00 };
    return register.processPayment(card);
});

test("Card balance should be reduced by correct amount after payment", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts); // 3.99
    
    const card: PaymentCard = { cardNumber: "1234567812345678", balance: 10.00 };
    register.processPayment(card);
    const expectedBalance = 10.00 - 3.99;
    return Math.abs(card.balance - expectedBalance) < 0.01;
});

// TEST IDEA 6: Payment processing with insufficient funds
console.log("\n--- Test Suite 6: Insufficient Funds Handling ---");
test("Payment should fail when card has insufficient balance", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts);
    register.scanItem("2345678901", storeProducts);
    register.scanItem("3456789012", storeProducts);
    register.scanItem("4567890123", storeProducts);
    register.scanItem("5678901234", storeProducts);
    
    const card: PaymentCard = { cardNumber: "1234567812345678", balance: 5.00 }; // Only $5
    return !register.processPayment(card);
});

// TEST IDEA 7: Invalid card handling
console.log("\n--- Test Suite 7: Invalid Payment Card ---");
test("Payment should fail with invalid card number", () => {
    const register = new CashRegister();
    register.scanItem("1234567890", storeProducts);
    
    const card: PaymentCard = { cardNumber: "123", balance: 50.00 };
    return !register.processPayment(card);
});

// TEST IDEA 8: Empty cart scenario
console.log("\n--- Test Suite 8: Edge Cases ---");
test("Total should be zero for empty cart", () => {
    const register = new CashRegister();
    return register.getTotal() === 0;
});

test("Payment should succeed for empty cart (free)", () => {
    const register = new CashRegister();
    const card: PaymentCard = { cardNumber: "1234567812345678", balance: 0.00 };
    return register.processPayment(card);
});

// TEST IDEA 9: Scanning wrong/invalid barcode
console.log("\n--- Test Suite 9: Error Handling ---");
test("Scanning invalid barcode should fail gracefully", () => {
    const register = new CashRegister();
    const success = register.scanItem("INVALID", storeProducts);
    return !success && register.getScannedProducts().length === 0;
});

// TEST IDEA 10: Complete checkout flow simulation
console.log("\n--- Test Suite 10: Complete Checkout Flow ---");
test("Complete checkout flow: scan 5 products, pay, and verify", () => {
    const register = new CashRegister();
    const card: PaymentCard = { cardNumber: "1234567812345678", balance: 100.00 };
    const initialBalance = card.balance;
    
    // Scan all 5 products
    const scanned = [
        register.scanItem("1234567890", storeProducts),
        register.scanItem("2345678901", storeProducts),
        register.scanItem("3456789012", storeProducts),
        register.scanItem("4567890123", storeProducts),
        register.scanItem("5678901234", storeProducts)
    ];
    
    const total = register.getTotal();
    const paymentSuccess = register.processPayment(card);
    
    return scanned.every(s => s) && 
           paymentSuccess && 
           register.getScannedProducts().length === 5 &&
           card.balance === initialBalance - total;
});

// Print summary
console.log("\n=== TEST SUMMARY ===");
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed === 0) {
    console.log("\n✓ All tests passed! Ready to head to EXIT door.");
} else {
    console.log("\n✗ Some tests failed. Please check the system.");
    process.exit(1);
}
