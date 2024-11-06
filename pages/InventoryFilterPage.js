class InventoryFilterPage {
    constructor(page) {
        this.page = page;
        
        // Locators güncellendi
        this.sortDropdown = page.locator('.product_sort_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemPrices = page.locator('.inventory_item_price');
        this.inventoryItemNames = page.locator('.inventory_item_name');
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        // Menu items için data-test attribute'larını kullanıyoruz
        this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
        this.menuContainer = page.locator('.bm-menu-wrap');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('.inventory_list', { state: 'visible' });
        await this.sortDropdown.waitFor({ state: 'visible' });
    }

    async getProductPrices() {
        const prices = await this.inventoryItemPrices.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async getProductsInPriceRange(minPrice, maxPrice) {
        const products = await this.page.$$('.inventory_item');
        const filteredProducts = [];

        for (const product of products) {
            const priceText = await product.$eval('.inventory_item_price', el => el.textContent);
            const price = parseFloat(priceText.replace('$', ''));
            
            if (price >= minPrice && price <= maxPrice) {
                const name = await product.$eval('.inventory_item_name', el => el.textContent);
                filteredProducts.push({ name, price });
            }
        }

        return filteredProducts;
    }

    async openBurgerMenu() {
        // Menu container'ın görünürlüğünü kontrol et
        const isMenuVisible = await this.menuContainer.evaluate(el => 
            window.getComputedStyle(el).width !== '0px'
        ).catch(() => false);

        if (!isMenuVisible) {
            await this.burgerMenu.click();
            // Menu container'ın görünür olmasını bekle
            await this.menuContainer.waitFor({ state: 'visible' });
            // İlk menu item'ın görünür olmasını bekle
            await this.allItemsLink.waitFor({ state: 'visible' });
        }
    }

    async selectCategory(categoryName) {
        await this.openBurgerMenu();
        
        // Kategori ismini kontrol et ve ilgili linke tıkla
        switch (categoryName.toLowerCase()) {
            case 'all items':
                await this.allItemsLink.click();
                break;
            case 'about':
                await this.aboutLink.click();
                break;
            case 'logout':
                await this.logoutLink.click();
                break;
            case 'reset app state':
                await this.resetAppStateLink.click();
                break;
            default:
                throw new Error(`Category "${categoryName}" not found`);
        }
        
        await this.page.waitForLoadState('networkidle');
    }

    async getVisibleProductNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async getVisibleProductCount() {
        return await this.inventoryItems.count();
    }

    async sortProducts(option) {
        await this.sortDropdown.waitFor({ state: 'visible' });
        switch(option.toLowerCase()) {
            case 'az':
                await this.sortDropdown.selectOption('az');
                break;
            case 'za':
                await this.sortDropdown.selectOption('za');
                break;
            case 'lohi':
                await this.sortDropdown.selectOption('lohi');
                break;
            case 'hilo':
                await this.sortDropdown.selectOption('hilo');
                break;
            default:
                throw new Error(`Invalid sort option: ${option}`);
        }
        await this.page.waitForTimeout(500);
    }

    async resetFilters() {
        await this.openBurgerMenu();
        await this.resetAppStateLink.click();
        await this.page.waitForTimeout(500);
    }
}

module.exports = InventoryFilterPage;