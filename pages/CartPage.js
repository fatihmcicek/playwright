class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.removeButtons = page.locator('[data-test^="remove"]');
    }

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async removeItem(itemIndex) {
        const removeButton = this.removeButtons.nth(itemIndex);
        await removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async getItemPrice(itemIndex) {
        const priceElement = this.cartItems.nth(itemIndex).locator('.inventory_item_price');
        const priceText = await priceElement.textContent();
        return parseFloat(priceText.replace('$', ''));
    }
}

module.exports = CartPage;