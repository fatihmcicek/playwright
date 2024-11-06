class UserProfilePage {
    constructor(page) {
        this.page = page;
        
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.resetAppStateButton = page.locator('[data-test="reset-sidebar-link"]');
        this.menuContainer = page.locator('.bm-menu-wrap');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.removeButtons = page.locator('[data-test^="remove"]');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.burgerMenu.waitFor({ state: 'visible' });
    }

    async openBurgerMenu() {
        try {
            await this.burgerMenu.click();
            await this.page.waitForTimeout(1000);
            await this.logoutLink.waitFor({ state: 'visible' });
        } catch (error) {
            console.error('Error opening burger menu:', error);
            throw error;
        }
    }

    async closeBurgerMenu() {
        try {
            await this.closeMenuButton.click();
            await this.logoutLink.waitFor({ state: 'hidden' });
        } catch (error) {
            console.error('Error closing burger menu:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.openBurgerMenu();
            await this.logoutLink.click();
            await this.page.waitForURL('**/');
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }

    async isOnLoginPage() {
        return await this.page.locator('[data-test="login-button"]').isVisible();
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}

module.exports = UserProfilePage;