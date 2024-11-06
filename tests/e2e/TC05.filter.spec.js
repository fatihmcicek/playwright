const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryFilterPage = require('../../pages/InventoryFilterPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC05 - Product Filtering and Search Tests', () => {
    let loginPage;
    let inventoryFilterPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryFilterPage = new InventoryFilterPage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await inventoryFilterPage.waitForPageLoad();
    });

    test('TC05.01 - Filter products by price range', async () => {
        await test.step('Sort products by price (low to high)', async () => {
            await inventoryFilterPage.sortProducts('lohi');
            const prices = await inventoryFilterPage.getProductPrices();
            
            // Verify sorting
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sortedPrices);
        });

        await test.step('Check products in specific price range', async () => {
            const filteredProducts = await inventoryFilterPage.getProductsInPriceRange(10, 50);
            
            // Verify filtered products
            filteredProducts.forEach(product => {
                expect(product.price).toBeGreaterThanOrEqual(10);
                expect(product.price).toBeLessThanOrEqual(50);
            });
        });
    });



    test('TC05.02 - Product sorting options', async () => {
        await test.step('Test all sorting options', async () => {
            // A to Z
            await inventoryFilterPage.sortProducts('az');
            const namesAZ = await inventoryFilterPage.getVisibleProductNames();
            expect(namesAZ).toEqual([...namesAZ].sort());

            // Z to A
            await inventoryFilterPage.sortProducts('za');
            const namesZA = await inventoryFilterPage.getVisibleProductNames();
            expect(namesZA).toEqual([...namesZA].sort().reverse());

            // Low to High
            await inventoryFilterPage.sortProducts('lohi');
            const pricesLoHi = await inventoryFilterPage.getProductPrices();
            expect(pricesLoHi).toEqual([...pricesLoHi].sort((a, b) => a - b));

            // High to Low
            await inventoryFilterPage.sortProducts('hilo');
            const pricesHiLo = await inventoryFilterPage.getProductPrices();
            expect(pricesHiLo).toEqual([...pricesHiLo].sort((a, b) => b - a));
        });
    });
});