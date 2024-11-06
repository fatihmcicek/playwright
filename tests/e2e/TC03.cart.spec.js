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
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        
        await inventoryPage.goToCart();
        
        expect(await cartPage.getCartItemsCount()).toBe(2);
        
        const firstItemPrice = await cartPage.getItemPrice(0);
        expect(firstItemPrice).toBeGreaterThan(0);
    });

    test('TC03.02 - Remove items from cart', async () => {
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        await inventoryPage.goToCart();
        
        await cartPage.removeItem(0);
        expect(await cartPage.getCartItemsCount()).toBe(1);
        
        await cartPage.removeItem(0);
        expect(await cartPage.getCartItemsCount()).toBe(0);
    });

    test('TC03.03 - Cart navigation', async ({ page }) => {
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.goToCart();

        await cartPage.continueShopping();
        await expect(page).toHaveURL(new RegExp('/inventory.html'));
        
        await inventoryPage.goToCart();
        expect(await cartPage.getCartItemsCount()).toBe(1);
    });
});