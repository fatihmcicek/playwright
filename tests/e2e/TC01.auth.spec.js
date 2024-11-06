const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const { TEST_USERS, ROUTES } = require('../../utils/test-constants');

test.describe('TC01 - Authentication Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC01.01 - Standard user login successful', async ({ page }) => {
        await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
        await expect(page).toHaveURL(new RegExp(ROUTES.INVENTORY));
    });

    test('TC01.02 - Locked out user login failed', async () => {
        await loginPage.login(TEST_USERS.LOCKED.username, TEST_USERS.LOCKED.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Sorry, this user has been locked out');
    });

    test('TC01.03 - Invalid credentials login failed', async () => {
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });
});