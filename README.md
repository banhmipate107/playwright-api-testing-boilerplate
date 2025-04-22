## 🌟 Sample boilerplate structure using Playwirght API tests with CRUD test cases

I use [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) for this project. Big shoutout to [Mark Winteringham](https://github.com/mwinteringham) for making this awesome resource available to the public 👏🏼💯🎇.

### **🗂️ Project structure**

```
project
│
│───apis - contain services of auth api and booking api
│   │───auth - Auth API
│   │   │   auth-api.ts
│   │───booking - Booking API
│   │   │   booking-api.ts
│   │   │   booking.interface.ts
│
│───assert - contain functions to assert response's data
│   │   assert.ts
│
│───mock-data - dynamic data for request body
│   │   booking-data.ts
│
│───tests - contains automation API test cases
│   │   create-booking.spec.ts
│   │   delete-booking.spec.ts
│   │   ...
│
│───utils - contain function related to handle data
│   │   key.utils.ts
│
│───package.json
│───splaywright.config.ts
└───README.md
```

#### **Clone repository**

    git clone https://github.com/banhmipate107/playwright-api-testing-boilerplate.git

#### **Install dependencies**

    npm install

#### **To run tests regarding Create Booking API**

    npm run create-booking

#### **To run tests regarding Delete Booking API**

    npm run delete-booking

#### **To run tests regarding Get Booking API**

    npm run get-booking

#### **To run tests regarding Update Booking API**

    npm run update-booking

#### **To open Playwright's report**

    npx playwright show-report

#### **To open Allure report**

    npm run allure-report

#### **To download the latest version**

    npm run reinstall
