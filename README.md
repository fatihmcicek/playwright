### Prerequisites

First you need to install node.js, then install npm for package management.

```
npm install
npm install -g npm
node -v
npm -v
```

To start the project, you must set up the web project in the file path. If you are using Linux or Mac, you must run the command sudo chmod +x '../../resources/your_web_application' from the terminal.
```
sudo chmod +x '../../resources/your_web_application
```

After all installation and package management is completed, you can specifically run the scenarios in the tests.
```
npm run test tests/my_account.spec.js   
npm run test tests/new_user_full_journey.spec.js
npm run test tests/product_page_add_item.spec.js
```
