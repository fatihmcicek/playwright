class InventoryPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.removeButtons = page.locator('[data-test^="remove"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('select.product_sort_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemPrices = page.locator('.inventory_item_price');
    }

    async goto() {
        await this.page.goto('/inventory.html');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForPageLoad() {
        try {
            // Wait for the main container
            await this.page.waitForSelector('#inventory_container', { timeout: 10000 });
            // Wait for at least one inventory item
            await this.page.waitForSelector('.inventory_item', { timeout: 10000 });
            // Wait for sort dropdown
            await this.page.waitForSelector('select.product_sort_container', { timeout: 10000 });
        } catch (error) {
            console.error('Error while waiting for page load:', error);
            throw error;
        }
    }

    async addItemToCart(itemIndex) {
        await this.addToCartButtons.nth(itemIndex).waitFor({ state: 'visible' });
        await this.addToCartButtons.nth(itemIndex).click();
    }

    async removeItemFromCart(itemIndex) {
        await this.removeButtons.nth(itemIndex).waitFor({ state: 'visible' });
        await this.removeButtons.nth(itemIndex).click();
    }

    async getCartItemCount() {
        try {
            await this.shoppingCartBadge.waitFor({ state: 'visible', timeout: 2000 });
            const text = await this.shoppingCartBadge.textContent();
            return parseInt(text);
        } catch {
            return 0;
        }
    }

    async goToCart() {
        await this.shoppingCartLink.click();
        await this.page.waitForURL('**/cart.html');
    }

    async sortProducts(sortOption) {
        try {
            // Wait for dropdown to be ready
            await this.page.waitForSelector('select.product_sort_container', { state: 'visible', timeout: 10000 });

            const optionMap = {
                'az': 'az',
                'za': 'za',
                'lohi': 'lohi',
                'hilo': 'hilo'
            };

            const value = optionMap[sortOption.toLowerCase()];
            if (!value) {
                throw new Error(`Invalid sort option: ${sortOption}`);
            }

            await this.sortDropdown.selectOption(value);
            
            // Wait for sorting to complete
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.error('Error during sorting:', error);
            throw error;
        }
    }

    async getItemNames() {
        await this.inventoryItems.first().waitFor({ state: 'visible' });
        const elements = await this.page.locator('.inventory_item_name').all();
        return Promise.all(elements.map(async (el) => await el.textContent()));
    }

    async getItemPrices() {
        await this.inventoryItems.first().waitFor({ state: 'visible' });
        const elements = await this.page.locator('.inventory_item_price').all();
        return Promise.all(elements.map(async (el) => {
            const text = await el.textContent();
            return parseFloat(text.replace('$', ''));
        }));
    }
}

module.exports = InventoryPage;