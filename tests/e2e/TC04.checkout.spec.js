const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const testData = require('../fixtures/test-data.json');

test.describe('Checkout Flow', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Login before each test
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
    });

    test('complete purchase flow with single item', async () => {
        // Add item to cart
        await inventoryPage.addItemToCart(testData.products.backpack);
        
        // Verify cart badge
        expect(await inventoryPage.getCartItemCount()).toBe(1);

        // Go to cart
        await inventoryPage.goToCart();
        
        // Verify cart items
        expect(await cartPage.getCartItemsCount()).toBe(1);

        // Proceed to checkout
        await cartPage.proceedToCheckout();

        // Fill shipping info
        await checkoutPage.fillShippingInfo(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );

        // Complete purchase
        await checkoutPage.completePurchase();

        // Verify success message - case insensitive check
        const completionMessage = await checkoutPage.getCompletionMessage();
        expect(completionMessage.toLowerCase()).toContain('thank you for your order');
        // Alternatif olarak:
        // expect(completionMessage).toBe('Thank you for your order!');
    });

    test('validate cart manipulation', async () => {
        // Add multiple items
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.addItemToCart(testData.products.bikeLight);
        
        // Verify cart count
        expect(await inventoryPage.getCartItemCount()).toBe(2);

        // Go to cart and remove one item
        await inventoryPage.goToCart();
        await cartPage.removeItem(0);
        
        // Verify updated cart count
        expect(await cartPage.getCartItemsCount()).toBe(1);
    });

    test('checkout form validation', async () => {
        // Add item and go to checkout
        await inventoryPage.addItemToCart(testData.products.backpack);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        // Try to continue without filling form
        await checkoutPage.continueButton.click();
        
        // Verify error message
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Error: First Name is required');
    });
});