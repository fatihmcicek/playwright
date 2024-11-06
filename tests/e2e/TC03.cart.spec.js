const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC03 - Cart Operations Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
    });

    test('TC03.01 - View cart contents', async () => {
        // Add items to cart
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        
        // Go to cart
        await inventoryPage.goToCart();
        
        // Verify cart contents
        expect(await cartPage.getCartItemsCount()).toBe(2);
        
        // Verify prices are displayed
        const firstItemPrice = await cartPage.getItemPrice(0);
        expect(firstItemPrice).toBeGreaterThan(0);
    });

    test('TC03.02 - Remove items from cart', async () => {
        // Add items and go to cart
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        await inventoryPage.goToCart();
        
        // Remove first item
        await cartPage.removeItem(0);
        expect(await cartPage.getCartItemsCount()).toBe(1);
        
        // Remove second item
        await cartPage.removeItem(0);
        expect(await cartPage.getCartItemsCount()).toBe(0);
    });

    test('TC03.03 - Cart navigation', async ({ page }) => {
        // Add item and go to cart
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.goToCart();
        
        // Continue shopping
        await cartPage.continueShopping();
        await expect(page).toHaveURL(new RegExp('/inventory.html'));
        
        // Return to cart and verify item still exists
        await inventoryPage.goToCart();
        expect(await cartPage.getCartItemsCount()).toBe(1);
    });
});