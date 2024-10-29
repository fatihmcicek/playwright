# Project Setup and Testing Guide

#### Prerequisites

	1.	Install Node.js: First, make sure Node.js is installed.
	2.	Install npm: Use npm for package management.

```
npm install
npm install -g npm
node -v
npm -v
```
	3.	Set Permissions (Linux/Mac): If you’re using Linux or Mac, set execute permissions for the web application setup file by running the command below in your terminal.

```
sudo chmod +x '../../resources/your_web_application
```

#### Running the Project

After completing all the installation and setup steps, you can run specific test files or the entire test suite:

```
- Run a Specific Test:
npm run test tests/my_account.spec.js   
npm run test tests/new_user_full_journey.spec.js
npm run test tests/product_page_add_item.spec.js

- Run all test
npm run test
```

#### Test Reporting

To generate and view reports for test execution:

	1.	Test Results are stored in the test-results folder by default.
	2.	HTML Report: To generate a detailed HTML report, use:

```
npx playwright show-report
```
This will open an HTML report in your browser, providing details on each test’s success, failure, and more.

## Manual Test Scenarios

    A. My Account Page - Cookie Injection and Network Request Mocking
Title: My Account Page Load with Cookie Injection and Network Request Mocking
Steps:

	1.	Mock an API response for the endpoint **/api/user** to return a 500 error with the message “PLAYWRIGHT ERROR FROM MOCKING”.
	2.	Generate a login token using valid admin credentials.
	3.	Set a browser cookie with the generated login token.
	4.	Navigate to the My Account page.

    Expected Results:

	•	Verify that the My Account page loads despite the mocked error response.
	•	Confirm that the page displays an error message saying “PLAYWRIGHT ERROR FROM MOCKING”.
	•	Ensure the page heading is visible on the My Account page.

    B. New User Full End-to-End Test Journey
Title: New User Journey from Product Browsing to Checkout and Payment
Steps:

    1.	Navigate to the Products page.
	2.	Sort the products by price from lowest to highest.
	3.	Add the second cheapest product to the basket.
	4.	Navigate to the Checkout page.
	5.	Remove the cheapest product from the basket.
	6.	Proceed with checkout.
	7.	Navigate to the Sign-up page.
	8.	Register a new account using a unique email and password.
	9.	Fill in delivery details with valid address information.
	10.	Proceed to the Payment page.
	11.	Activate any available discount on the Payment page.
	12.	Enter valid payment details and complete the payment.

    Expected Results:

	•	Products should sort by price, and the correct product should be added and later removed from the basket.
	•	New user registration should complete successfully.
	•	Delivery details should save correctly and allow progression to payment.
	•	Discount should apply, and payment should complete successfully with an order confirmation.

    B. Add to Basket
Title: Adding a Product to the Basket and Verifying Basket Count
Steps:

    1.	Navigate to the main page of the application.
	2.	Locate the “Add to Basket” button for the first product and verify it displays “Add to Basket”.
	3.	Verify the basket counter shows “0”.
	4.	Click on the “Add to Basket” button.
	5.	Verify the button text changes to “Remove from Basket”.
	6.	Confirm the basket counter updates to “1”.
	7.	Click on the “Checkout” link.

    Expected Results:

	•	The “Add to Basket” button changes to “Remove from Basket” upon clicking.
	•	The basket counter updates from “0” to “1”.
	•	Clicking the “Checkout” link successfully navigates to the checkout page.


#### Additional Notes

	•	Environment Variables: Store sensitive information (e.g., API keys, login credentials) in an environment file (e.g., .env) and ensure it’s properly loaded into the test suite.
	•	Debugging: Run tests with the DEBUG=pw:api flag to get detailed logs:


```
DEBUG=pw:api npm run test
```
	•	Headless Mode: Tests run in headless mode by default for performance. To see the tests visually, disable headless mode in the configuration or use the --headed flag:

### Troubleshooting

If you encounter any issues:

	•	Permissions: Ensure all necessary permissions are granted, especially when working in a Linux or Mac environment.
	•	Dependencies: If you encounter errors related to missing packages, reinstall dependencies:

```
npm install
```