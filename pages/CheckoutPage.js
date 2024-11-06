class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.completionHeader = page.locator('.complete-header');
        this.totalPrice = page.locator('.summary_total_label');
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getCompletionMessage() {
        return await this.completionHeader.textContent();
    }

    async getTotalPrice() {
        const priceText = await this.totalPrice.textContent();
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }
}

module.exports = CheckoutPage;