const { test, expect } = require('@playwright/test');
const PerformancePage = require('../../pages/PerformancePage');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const testData = require('../fixtures/test-data.json');

test.describe('TC08 - Performance Tests', () => {
    let performancePage;
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        performancePage = new PerformancePage(page);
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
    });

    test('TC08.01 - Page load times', async () => {
        await test.step('Measure login page load', async () => {
            const loadTime = await performancePage.measurePageLoad('https://www.saucedemo.com');
            console.log('Login page load time:', loadTime, 'ms');
            expect(loadTime).toBeLessThan(5000); // 5 saniye altında olmalı
        });

        await test.step('Measure inventory page load', async () => {
            await loginPage.goto();
            await loginPage.login(testData.validUser.username, testData.validUser.password);
            const metrics = await performancePage.getPerformanceMetrics();
            console.log('Performance metrics:', metrics);
            
            expect(metrics.totalLoad).toBeLessThan(8000); // 8 saniye altında olmalı
            expect(metrics.navigationToResponse).toBeLessThan(3000); // 3 saniye altında olmalı
        });
    });

    test('TC08.02 - User action response times', async () => {
        await test.step('Measure common user actions', async () => {
            // Login sayfasına git ve giriş yap
            await loginPage.goto();
            await loginPage.login(testData.validUser.username, testData.validUser.password);
            
            // Add to cart performansını ölç
            const addToCartTime = await performancePage.measureActionTime(async () => {
                await inventoryPage.addItemToCart(0);
            });
            console.log('Add to cart time:', addToCartTime, 'ms');
            expect(addToCartTime).toBeLessThan(5000);

            // Sort performansını ölç
            const sortTime = await performancePage.measureActionTime(async () => {
                await inventoryPage.sortProducts('az');
            });
            console.log('Sort products time:', sortTime, 'ms');
            expect(sortTime).toBeLessThan(5000);
        });
    });

    test('TC08.03 - Memory usage', async () => {
        await test.step('Monitor memory usage during navigation', async () => {
            // Login sayfasına git ve giriş yap
            await loginPage.goto();
            await loginPage.login(testData.validUser.username, testData.validUser.password);
            await inventoryPage.waitForPageLoad();
            
            // Memory kullanımını ölç
            const memoryMetrics = await performancePage.getCPUMemoryMetrics();
            console.log('Memory metrics:', memoryMetrics);

            if (typeof memoryMetrics.jsHeapSize === 'number') {
                expect(memoryMetrics.jsHeapSize).toBeLessThan(100); // 100 MB altında olmalı
            }
        });

        await test.step('Monitor memory after multiple actions', async () => {
            // Birkaç aksiyon gerçekleştir
            await inventoryPage.addItemToCart(0);
            await inventoryPage.addItemToCart(1);
            await inventoryPage.sortProducts('az');
            
            // Memory kullanımını tekrar ölç
            const memoryAfterActions = await performancePage.getCPUMemoryMetrics();
            console.log('Memory metrics after actions:', memoryAfterActions);

            if (typeof memoryAfterActions.jsHeapSize === 'number') {
                expect(memoryAfterActions.jsHeapSize).toBeLessThan(150); // 150 MB altında olmalı
            }
        });
    });
});