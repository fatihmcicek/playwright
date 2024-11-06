const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC02 - Inventory Management Tests', () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        
        await page.waitForURL('**/inventory.html');
        await inventoryPage.waitForPageLoad();
    });

    test('TC02.01 - Product sorting functionality', async () => {
        await inventoryPage.waitForPageLoad();

        await test.step('Sort A to Z', async () => {
            await inventoryPage.sortProducts('az');
            const namesAZ = await inventoryPage.getItemNames();
            const sortedNamesAZ = [...namesAZ].sort();
            expect(namesAZ).toEqual(sortedNamesAZ);
        });

        await test.step('Sort Z to A', async () => {
            await inventoryPage.sortProducts('za');
            const namesZA = await inventoryPage.getItemNames();
            const sortedNamesZA = [...namesZA].sort().reverse();
            expect(namesZA).toEqual(sortedNamesZA);
        });

        await test.step('Sort price low to high', async () => {
            await inventoryPage.sortProducts('lohi');
            const prices = await inventoryPage.getItemPrices();
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sortedPrices);
        });

        await test.step('Sort price high to low', async () => {
            await inventoryPage.sortProducts('hilo');
            const prices = await inventoryPage.getItemPrices();
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).toEqual(sortedPrices);
        });
    });

    test('TC02.02 - Add multiple items to cart', async () => {
        await inventoryPage.waitForPageLoad();
        
        await test.step('Add first item', async () => {
            await inventoryPage.addItemToCart(testData.products.backpack);
            expect(await inventoryPage.getCartItemCount()).toBe(1);
        });

        await test.step('Add second item', async () => {
            await inventoryPage.addItemToCart(testData.products.bikeLight);
            expect(await inventoryPage.getCartItemCount()).toBe(2);
        });

        await expect(inventoryPage.removeButtons.first()).toBeVisible();
    });

    test('TC02.03 - Product details view', async ({ page }) => {
        await inventoryPage.waitForPageLoad();
        
        await test.step('Navigate to product details', async () => {
            await page.click('.inventory_item_name');
            
            await expect(page.locator('.inventory_details_name')).toBeVisible();
            await expect(page.locator('.inventory_details_desc')).toBeVisible();
            await expect(page.locator('.inventory_details_price')).toBeVisible();
            await expect(page.locator('[data-test^="add-to-cart"]')).toBeVisible();
        });
    });
});