class OrderPage {
    constructor(page) {
        this.page = page;
        
        // Checkout Information Form
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        
        // Cart and Checkout
        this.cartButton = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        
        // Order Summary
        this.inventoryItems = page.locator('.cart_item');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.totalAmount = page.locator('.summary_total_label');
        this.completionHeader = page.locator('.complete-header');
        this.completionText = page.locator('.complete-text');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async goToCart() {
        await this.cartButton.click();
        await this.waitForPageLoad();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.waitForPageLoad();
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
        await this.waitForPageLoad();
    }

    async completeOrder() {
        await this.finishButton.click();
        await this.waitForPageLoad();
        await this.completionHeader.waitFor({ state: 'visible' });
    }

    async getOrderSummary() {
        const itemTotalText = await this.itemTotal.textContent();
        const taxText = await this.tax.textContent();
        const totalText = await this.totalAmount.textContent();

        return {
            itemTotal: parseFloat(itemTotalText.replace(/[^0-9.]/g, '')),
            tax: parseFloat(taxText.replace(/[^0-9.]/g, '')),
            total: parseFloat(totalText.replace(/[^0-9.]/g, ''))
        };
    }

    async getCartItemsCount() {
        return await this.inventoryItems.count();
    }

    async getCompletionMessage() {
        return {
            header: await this.completionHeader.textContent(),
            text: await this.completionText.textContent()
        };
    }

    async returnToProducts() {
        await this.backToProductsButton.click();
        await this.waitForPageLoad();
    }
}

module.exports = OrderPage;