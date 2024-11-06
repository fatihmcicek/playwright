# SauceDemo Test Automation Project

This project contains the automated test suite for the [SauceDemo](https://www.saucedemo.com/) e-commerce web application. It is developed using Playwright and JavaScript.

![Report Screenshot](test-results/report.png)

## 🚀 Project Structure

```
my-playwright-project/
├── node_modules/            # Project dependencies
├── pages/                   # Page Object Models
│   ├── LoginPage.js        # Login page operations
│   ├── InventoryPage.js    # Product list operations
│   ├── CartPage.js         # Cart operations
│   ├── CheckoutPage.js     # Payment operations
│   ├── UserProfilePage.js  # User profile operations
│   ├── OrderPage.js        # Order operations
│   └── PerformancePage.js  # Performance measurement operations
├── playwright-report/       # HTML test reports
│   └── index.html          # Main report file
├── test-results/           # Test execution artifacts
│   ├── screenshots/        # Failed test screenshots
│   ├── videos/            # Test execution recordings
│   └── traces/            # Playwright trace files
├── tests/
│   ├── e2e/               # E2E test scenarios
│   │   ├── TC01.auth.spec.js
│   │   ├── TC02.inventory.spec.js
│   │   ├── TC03.cart.spec.js
│   │   ├── TC04.checkout.spec.js
│   │   ├── TC05.filter.spec.js
│   │   ├── TC06.profile.spec.js
│   │   ├── TC07.order.spec.js
│   │   └── TC08.performance.spec.js
│   ├── fixtures/          # Test data
│   │   └── test-data.json
│   └── manual-test-cases/ # Manual test documentation
│       ├── TC01-authentication.md
│       ├── TC02-inventory-management.md
│       ├── TC03-cart-operations.md
│       ├── TC04-checkout-process.md
│       ├── TC05-filtering-searching.md
│       ├── TC06-user-profile.md
│       ├── TC07-order-history.md
│       └── TC08-performance.md
├── utils/                 # Utility functions and helpers
│   ├── test-helpers.js   # Common test helper functions
│   └── test-constants.js # Test constants and configurations
├── .gitignore            # Git ignore configurations
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── playwright.config.js  # Playwright configuration
└── README.md            # Project documentation
```

## 🔧 Installation

1. Install Node.js (v14 or higher)
2. Clone the project:
```bash
git clone [repository-url]
cd my-playwright-project
```

3. Install dependencies:
```bash
npm install
```

4. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### Run all tests:
```bash
npm test
```

### Run a specific test file:
```bash
npx playwright test [test-file]
# Example: npx playwright test TC01.auth.spec.js
```

### Run in debug mode:
```bash
npx playwright test --debug
```

### Run in UI mode:
```bash
npx playwright test --ui
```

```
## 📝 Test Scenarios

### TC01 - Authentication Tests
- Successful login
- Login with invalid credentials
- Locked user validation

### TC02 - Inventory Tests
- Product listing
- Product details
- Adding/removing products

### TC03 - Cart Tests
- Adding items to cart
- Removing items from cart
- Cart updates

### TC04 - Checkout Tests
- Successful order completion
- Form validations
- Order summary validations

### TC05 - Filter Tests
- Product filtering
- Sorting operations
- Search functionality

### TC06 - Profile Tests
- User profile operations
- Session management
- Application state management

### TC07 - Order Tests
- Order processes
- Order summary
- Order completion

### TC08 - Performance Tests
- Page load times
- API response times
- Resource utilization
```
## 📊 Reporting

To view test results:
```bash
npx playwright show-report
```

## 🔍 Features

- Page Object Model (POM) architecture
- Separate test data management
- Detailed manual test scenarios
- Performance metrics measurement
- Comprehensive error handling
- HTML and JSON reporting
- Multi-browser support (Chromium, Firefox)

## 💡 Key Features

1. **Robust Test Architecture**
   - Page Object Model for better maintainability
   - Reusable components and utilities
   - Clear separation of concerns

2. **Comprehensive Test Coverage**
   - End-to-end functional tests
   - Performance testing
   - Error handling scenarios
   - Cross-browser testing

3. **Enhanced Reporting**
   - Detailed HTML reports
   - Performance metrics
   - Screenshot and video capture on failure
   - Trace viewing capabilities

4. **Performance Monitoring**
   - Page load time measurements
   - Resource utilization tracking
   - API response time monitoring
   - Memory usage analysis

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 🔧 Configuration

The project uses Playwright's configuration file (`playwright.config.js`) for setting up:
- Test timeouts
- Browser configurations
- Parallel execution settings
- Retry mechanisms
- Screenshot and video capture rules

## 🔍 Best Practices Implemented

- Proper page load handling
- Efficient selector strategies
- Consistent waiting mechanisms
- Error recovery methods
- Test isolation
- Clean test data management

## 📜 License

This project is licensed under the MIT License.

## 👥 Contact

Project Owner - [Linkedin: @fatihcicek](https://www.linkedin.com/in/fatihmcicek/)

Project Link: [https://github.com/fatihcicek/playwright-test-project](https://github.com/fatihcicek/playwright-test-project)

## 🔑 Important Notes

1. Ensure all dependencies are installed before running tests
2. Chrome and Firefox browsers should be installed on the system
3. Node.js version 14 or higher is required
4. Some tests require specific test data that is included in the fixtures

## 🐛 Known Issues

Please check the [Issues](https://github.com/fatihcicek/playwright-test-project/issues) page for current known issues and planned enhancements.

## 🙏 Acknowledgments

- SauceDemo for providing the test application
- Playwright team for the excellent testing framework
- All contributors who have helped with the project