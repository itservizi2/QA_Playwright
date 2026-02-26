/**
 * Grocery Store Checkout System
 * 
 * This program simulates a grocery store checkout process with automatic scanners.
 */

export interface Product {
    id: string;
    name: string;
    price: number;
    barcode: string;
}

export interface PaymentCard {
    cardNumber: string;
    balance: number;
}

export class Scanner {
    scanProduct(barcode: string, products: Product[]): Product | null {
        const product = products.find(p => p.barcode === barcode);
        return product || null;
    }

    scanCard(cardNumber: string): boolean {
        // Simulate card scanning - basic validation
        return cardNumber.length >= 16;
    }
}

export class CashRegister {
    private scannedProducts: Product[] = [];
    private scanner: Scanner;

    constructor() {
        this.scanner = new Scanner();
    }

    scanItem(barcode: string, availableProducts: Product[]): boolean {
        const product = this.scanner.scanProduct(barcode, availableProducts);
        if (product) {
            this.scannedProducts.push(product);
            console.log(`Scanned: ${product.name} - $${product.price}`);
            return true;
        }
        console.log(`Error: Product with barcode ${barcode} not found`);
        return false;
    }

    getTotal(): number {
        return this.scannedProducts.reduce((sum, product) => sum + product.price, 0);
    }

    getScannedProducts(): Product[] {
        return [...this.scannedProducts];
    }

    processPayment(card: PaymentCard): boolean {
        const total = this.getTotal();
        
        if (!this.scanner.scanCard(card.cardNumber)) {
            console.log("Error: Invalid card");
            return false;
        }

        if (card.balance >= total) {
            card.balance -= total;
            console.log(`Payment successful! Total: $${total}, Remaining balance: $${card.balance}`);
            return true;
        }

        console.log("Error: Insufficient funds");
        return false;
    }

    clear(): void {
        this.scannedProducts = [];
    }
}

// Sample products database
export const storeProducts: Product[] = [
    { id: "1", name: "Product X - Milk", price: 3.99, barcode: "1234567890" },
    { id: "2", name: "Product Y - Bread", price: 2.49, barcode: "2345678901" },
    { id: "3", name: "Product Z - Eggs", price: 4.99, barcode: "3456789012" },
    { id: "4", name: "Product A - Butter", price: 5.49, barcode: "4567890123" },
    { id: "5", name: "Product B - Cheese", price: 6.99, barcode: "5678901234" },
];

// Example usage
// Run this file directly to see the demo: npx tsx src/shop.ts
const isDirect = import.meta.url === `file://${process.argv[1]}`;
if (isDirect) {
    console.log("=== Grocery Store Checkout System ===\n");

    const register = new CashRegister();
    const customerCard: PaymentCard = { cardNumber: "1234567812345678", balance: 50.00 };

    console.log("Scanning 5 products...\n");
    register.scanItem("1234567890", storeProducts); // X
    register.scanItem("2345678901", storeProducts); // Y
    register.scanItem("3456789012", storeProducts); // Z
    register.scanItem("4567890123", storeProducts); // A
    register.scanItem("5678901234", storeProducts); // B

    console.log(`\nTotal: $${register.getTotal()}`);
    console.log("\nProcessing payment...");
    register.processPayment(customerCard);

    console.log("\n=== Heading to EXIT door ===");
}
