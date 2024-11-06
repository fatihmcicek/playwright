const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const OrderPage = require('../../pages/OrderPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC07 - Order Process Tests', () => {
    let loginPage;
    let inventoryPage;
    let orderPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        orderPage = new OrderPage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await inventoryPage.waitForPageLoad();
    });

    test('TC07.01 - Complete purchase flow with single item', async () => {
        await test.step('Add item to cart and go to checkout', async () => {
            await inventoryPage.addItemToCart(0);
            await orderPage.goToCart();
            expect(await orderPage.getCartItemsCount()).toBe(1);
        });

        await test.step('Complete checkout process', async () => {
            await orderPage.proceedToCheckout();
            await orderPage.fillCheckoutInfo(
                testData.checkoutInfo.firstName,
                testData.checkoutInfo.lastName,
                testData.checkoutInfo.postalCode
            );
        });

        await test.step('Verify order completion', async () => {
            await orderPage.completeOrder();
            const completionMessage = await orderPage.getCompletionMessage();
            expect(completionMessage.header).toContain('Thank you for your order');
        });
    });

    test('TC07.02 - Order summary validation', async () => {
        await test.step('Add multiple items and verify cart', async () => {
            await inventoryPage.addItemToCart(0);
            await inventoryPage.addItemToCart(1);
            await orderPage.goToCart();
            expect(await orderPage.getCartItemsCount()).toBe(2);
        });

        await test.step('Proceed to checkout and verify summary', async () => {
            await orderPage.proceedToCheckout();
            await orderPage.fillCheckoutInfo(
                testData.checkoutInfo.firstName,
                testData.checkoutInfo.lastName,
                testData.checkoutInfo.postalCode
            );

            const summary = await orderPage.getOrderSummary();
            expect(summary.itemTotal).toBeGreaterThan(0);
            expect(summary.tax).toBeGreaterThan(0);
            expect(summary.total).toBe(summary.itemTotal + summary.tax);
        });
    });

});