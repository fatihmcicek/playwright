# E-Commerce Test Automation Project with Playwright

This project contains automated end-to-end tests for an e-commerce application using Playwright test framework. The tests cover various user journeys including product browsing, checkout process, user registration, and payment flows.

## 🛠 Tech Stack

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [UUID](https://github.com/uuidjs/uuid) - For generating unique identifiers
- [Dotenv](https://github.com/motdotla/dotenv) - For environment variable management

## 📁 Project Structure

```
project-root/
├── tests/                      # Test scenarios
│   ├── my_account.spec.js
│   ├── new_user_full_journey.spec.js
│   └── product_page_add_item.spec.js
├── page-objects/              # Page Object Models
│   ├── Checkout.js
│   ├── DeliveryDetails.js
│   ├── LoginPage.js
│   └── MyAccountPage.js
│   └── Navigation.js
│   └── PaymentPage.js
│   └── ProductsPage.js
│   └── RegisterPage.js
├── data/                      # Test data
│   ├── deliveryDetails.js
│   ├── paymentDetails.js
│   └── userDetails.js
├── api-calls/                 # API utilities
│   └── getLoginToken.js
├── playwright.config.js       # Playwright configuration
└── package.json              # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

1. Node.js (v18 or higher)
2. npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/new_user_full_journey.spec.js

# Run tests in headed mode
npm test -- --headed

# Run tests in specific browser
npm test -- --project=chromium
```

## 🧪 Test Scenarios

### 1. New User Full Journey
- Product browsing and sorting
- Shopping basket management
- User registration
- Delivery details
- Payment process with discount

### 2. My Account Functionality
- Cookie injection testing
- Network request mocking
- Error handling verification

### 3. Product Page Interactions
- Add to basket functionality
- Basket counter verification
- Checkout navigation

## 📊 Test Reports

Generate and view HTML reports:
```bash
# After running tests
npx playwright show-report
```

Access the report at `playwright-report/index.html`

## 🔧 Configuration

### Browser Support
- Chromium
- Firefox
- WebKit

Configure in `playwright.config.js`:
```javascript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  // Add more browsers as needed
]
```

### Environment Variables
Required environment variables:
- `ADMIN_PASSWORD`
- `BASE_URL` (default: http://localhost:2221)

## 🚥 CI/CD Integration

The project is configured for CI environments with:
- Parallel test execution
- Retries on failure
- Artifact collection

```javascript
// playwright.config.js
{
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
}
```

## 🐛 Debugging

1. Use Playwright Inspector:
```bash
PWDEBUG=1 npm test
```

2. Debug logs:
```bash
DEBUG=pw:api npm test
```

## 📝 Best Practices

1. Page Object Model
   - Each page has its own class
   - Encapsulated selectors and actions
   - Reusable methods

2. Test Data Management
   - Separate data files
   - Environment variables for sensitive data
   - Dynamic data generation using UUID

3. Error Handling
   - Explicit waits
   - Clear error messages
   - Request mocking capabilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the ISC License

## 🆘 Troubleshooting

Common issues and solutions:

1. **Test Timeout Issues**
   - Increase timeout in playwright.config.js
   - Check for network conditions
   - Verify selector stability

2. **Element Not Found**
   - Verify selectors
   - Add explicit waits
   - Check page load conditions

3. **Environment Issues**
   - Verify .env file configuration
   - Check Node.js version
   - Clear browser cache: `npx playwright clear-browsers`
