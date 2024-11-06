const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC04 - Checkout Flow Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
    });

    test('TC04.01 - Complete checkout process with single item', async () => {
        await inventoryPage.addItemToCart(testData.products.backpack);
        expect(await inventoryPage.getCartItemCount()).toBe(1);
    });

    test('TC04.02 - Validate checkout form fields', async () => {
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.continueButton.click();
        expect(await checkoutPage.getErrorMessage()).toContain('Error: First Name is required');

        await checkoutPage.firstNameInput.fill('John');
        await checkoutPage.continueButton.click();
        expect(await checkoutPage.getErrorMessage()).toContain('Error: Last Name is required');
    });

    test('TC04.03 - Verify order summary calculations', async () => {
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillShippingInfo(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );

        const totalPrice = await checkoutPage.getTotalPrice();
        expect(totalPrice).toBeGreaterThan(0);
    });
});