const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const UserProfilePage = require('../../pages/UserProfilePage');
const testData = require('../fixtures/test-data.json');

test.describe('TC06 - User Profile Tests', () => {
    let loginPage;
    let userProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        userProfilePage = new UserProfilePage(page);

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await userProfilePage.waitForPageLoad();
    });

    test('TC06.01 - Verify burger menu functionality', async () => {
        await test.step('Open burger menu and verify elements', async () => {
            await userProfilePage.openBurgerMenu();
            
            await expect(userProfilePage.logoutLink).toBeVisible();
            await expect(userProfilePage.resetAppStateButton).toBeVisible();
        });

        await test.step('Close burger menu', async () => {
            await userProfilePage.closeBurgerMenu();
            await expect(userProfilePage.logoutLink).not.toBeVisible();
        });
    });

    test('TC06.02 - Session management and logout functionality', async () => {
        await test.step('Verify logout redirects to login page', async () => {
            await userProfilePage.logout();
            expect(await userProfilePage.isOnLoginPage()).toBeTruthy();
        });

        await test.step('Verify cannot access inventory after logout', async () => {
            await userProfilePage.page.goto('/inventory.html');
            expect(await userProfilePage.getCurrentUrl()).toContain('/');
        });

        await test.step('Verify can login again after logout', async () => {
            await loginPage.login(testData.validUser.username, testData.validUser.password);
            expect(await userProfilePage.getCurrentUrl()).toContain('/inventory.html');
        });
    });
});