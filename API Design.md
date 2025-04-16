---
tags:
  - Projects
  - api-design
---

---

### **User Registration & Authentication**

| Function                   | Method | Endpoint                              | Input                                   | Output        |
| -------------------------- | ------ | ------------------------------------- | --------------------------------------- | ------------- |
| **User Sign up**           | POST   | `/api/v1/auth/signup`                 | `name`, `email`, `password`, `userType` | `201 Created` |
| **User Login**             | POST   | `/api/v1/auth/login`                  | `email`, `password`                     | `200 OK`      |
| **Request Password Reset** | POST   | `/api/v1/auth/password-reset/request` | `email`                                 | `200 OK`      |
| **Reset Password**         | POST   | `/api/v1/auth/password-reset`         | `token`, `newPassword`                  | `200 OK`      |
| **Toggle Account Status**  | PATCH  | `/api/v1/users/:userId/status`        | `active` (boolean)                      | `200 OK`      |
| **Verify Email**           | POST   | `/api/v1/auth/verify-email`           | `token`, `otp`                          | `200 OK`      |
| **Verify Phone**           | POST   | `/api/v1/auth/verify-phone`           | `otp`                                   | `200 OK`      |
| **OAuth Login**            | POST   | `/api/v1/auth/oauth`                  | `provider`, `authCode`                  | `200 OK`      |
| **Update Profile**         | PUT    | `/api/v1/users/:userId/profile`       | `newProfileData`                        | `200 OK`      |
| **Logout**                 | POST   | `/api/v1/auth/logout`                 | `userId`                                | `200 OK`      |

---

### **Cart Management**

| Function                   | Method | Endpoint                                     | Input                                 | Output        |
| -------------------------- | ------ | -------------------------------------------- | ------------------------------------- | ------------- |
| **Add Item to Cart**       | POST   | `/api/v1/carts/:customerId/items`            | `cartItem`                            | `201 Created` |
| **Clear Cart**             | DELETE | `/api/v1/carts/:customerId`                  | —                                     | `200 OK`      |
| **Modify Entire Cart**     | PUT    | `/api/v1/carts/:customerId`                  | `newCartItems`                        | `200 OK`      |
| **View Cart**              | GET    | `/api/v1/carts/:customerId`                  | —                                     | `200 OK`      |
| **Remove Item from Cart**  | DELETE | `/api/v1/carts/:customerId/items/:itemId`    | —                                     | `200 OK`      |
| **Checkout Cart**          | POST   | `/api/v1/carts/:customerId/checkout`         | `paymentMethod`, `shipmentAddress`    | `200 OK`      |
| **Update Item Quantities** | PATCH  | `/api/v1/carts/:customerId/items/quantities` | `quantities`: [{`cartItemId`, `qty`}] | `200 OK`      |

---

## **Restaurant & Menu Management**

| Function                        | Method | Endpoint                                          | Input                                       | Output        |
| ------------------------------- | ------ | ------------------------------------------------- | ------------------------------------------- | ------------- |
| **Register Restaurant**         | POST   | `/api/v1/restaurants`                             | `name`, `address`, `contactNumber`, `owner` | `201 Created` |
| **Update Restaurant**           | PUT    | `/api/v1/restaurants/:restaurantId`               | `name`, `address`, `contactNumber`, `owner` | `200 OK`      |
| **Enable / Disable Restaurant** | PATCH  | `/api/v1/restaurants/:restaurantId/status`        | `active` (boolean)                          | `200 OK`      |
| **View All Restaurants**        | GET    | `/api/v1/restaurants`                             | —                                           | `200 OK`      |
| **Create Menu**                 | POST   | `/api/v1/menus`                                   | `restaurantId`, `menuItems`                 | `201 Created` |
| **Update Menu**                 | PUT    | `/api/v1/menus/:menuId`                           | `menuItems`, `menuName`, etc.               | `200 OK`      |
| **Delete Menu**                 | DELETE | `/api/v1/menus/:menuId`                           | —                                           | `200 OK`      |
| **Enable / Disable Menu**       | PATCH  | `/api/v1/menus/:menuId/status`                    | `active` (boolean)                          | `200 OK`      |
| **View Historical Menus**       | GET    | `/api/v1/restaurants/:restaurantId/menus/history` | —                                           | `200 OK`      |
| **Search Restaurants**          | GET    | `/api/v1/restaurants/search`                      | `name`, `cuisine`, `location`               | `200 OK`      |
| **Search Menu Items**           | GET    | `/api/v1/menus/search`                            | `keyword`, `category`, `priceRange`         | `200 OK`      |
| **Top Rated Restaurants**       | GET    | `/api/v1/restaurants/top-rated`                   | —                                           | `200 OK`      |
| **Recommended Restaurants**     | GET    | `/api/v1/restaurants/recommended`                 | `customerId`, `location`, `preference`      | `200 OK`      |

---

## **Order Management**

| Function                                 | Method | Endpoint                                           | Input                                              | Output        |
| ---------------------------------------- | ------ | -------------------------------------------------- | -------------------------------------------------- | ------------- |
| **Place Order**                          | POST   | `/api/v1/orders`                                   | `customerId`, `cartId`, `paymentMethod`, `address` | `201 Created` |
| **Cancel Order (Customer / Restaurant)** | PATCH  | `/api/v1/orders/:orderId/cancel`                   | `cancelledBy`, `reason`                            | `200 OK`      |
| **Update Order Status**                  | PATCH  | `/api/v1/orders/:orderId/status`                   | `status`                                           | `200 OK`      |
| **Restaurant Order History**             | GET    | `/api/v1/restaurants/:restaurantId/orders/history` | —                                                  | `200 OK`      |
| **Order Summary**                        | GET    | `/api/v1/orders/:orderId/summary`                  | —                                                  | `200 OK`      |
| **Order Details**                        | GET    | `/api/v1/orders/:orderId`                          | —                                                  | `200 OK`      |

---

## **Customer Management**

| Function                       | Method | Endpoint                                                    | Input                                             | Output        |
| ------------------------------ | ------ | ----------------------------------------------------------- | ------------------------------------------------- | ------------- |
| **Customer Order History**     | GET    | `/api/v1/customers/:customerId/orders`                      | —                                                 | `200 OK`      |
| **Preferred Payment Settings** | GET    | `/api/v1/customers/:customerId/payment-settings`            | —                                                 | `200 OK`      |
| **Create Address**             | POST   | `/api/v1/customers/:customerId/addresses`                   | `address`, `label`, `isDefault`                   | `201 Created` |
| **View Addresses**             | GET    | `/api/v1/customers/:customerId/addresses`                   | —                                                 | `200 OK`      |
| **Update Address**             | PUT    | `/api/v1/customers/:customerId/addresses/:addressId`        | `updatedFields`                                   | `200 OK`      |
| **Enable / Disable Address**   | PATCH  | `/api/v1/customers/:customerId/addresses/:addressId/status` | `active` (boolean)                                | `200 OK`      |
| **Deactivate Account**         | PATCH  | `/api/v1/customers/:customerId/deactivate`                  | `reason`, optional `feedback`                     | `200 OK`      |
| **Rating & Comments**          | POST   | `/api/v1/reviews`                                           | `customerId`, `restaurantId`, `rating`, `comment` | `201 Created` |
| **Track Order Status**         | GET    | `/api/v1/orders/:orderId/status`                            | —                                                 | `200 OK`      |

---

## **Payment Integration**

| Function                            | Method | Endpoint                                       | Input                              | Output   |
| ----------------------------------- | ------ | ---------------------------------------------- | ---------------------------------- | -------- |
| **Third-party Payment Integration** | POST   | `/api/v1/payments/initiate`                    | `customerId`, `amount`, `provider` | `200 OK` |
| **View Payment Transactions**       | GET    | `/api/v1/payments/transactions`                | `customerId`, optional filters     | `200 OK` |
| **Generate Transaction Receipt**    | GET    | `/api/v1/payments/transactions/:txnId/receipt` | —                                  | `200 OK` |

## **Dashboard & Reports**

### System-Level Reports

| Function                                | Method | Endpoint                                          | Input             | Output   |
| --------------------------------------- | ------ | ------------------------------------------------- | ----------------- | -------- |
| **Count Restaurants**                   | GET    | `/api/v1/reports/system/count-restaurants`        | —                 | `200 OK` |
| **Count Customers**                     | GET    | `/api/v1/reports/system/count-customers`          | —                 | `200 OK` |
| **Count Active Customers**              | GET    | `/api/v1/reports/system/count-active-customers`   | —                 | `200 OK` |
| **Daily Orders Count**                  | GET    | `/api/v1/reports/system/orders/daily-count`       | `date` (optional) | `200 OK` |
| **Monthly Total Orders**                | GET    | `/api/v1/reports/system/orders/monthly-total`     | `month`, `year`   | `200 OK` |
| **Daily Cancelled Orders**              | GET    | `/api/v1/reports/system/orders/daily-cancelled`   | `date` (optional) | `200 OK` |
| **Monthly Cancelled Orders**            | GET    | `/api/v1/reports/system/orders/monthly-cancelled` | `month`, `year`   | `200 OK` |
| **Daily Transactions [Count, Money]**   | GET    | `/api/v1/reports/system/transactions/daily`       | `date` (optional) | `200 OK` |
| **Monthly Transactions [Count, Money]** | GET    | `/api/v1/reports/system/transactions/monthly`     | `month`, `year`   | `200 OK` |

#### Reports

| Function                                 | Method | Endpoint                                             | Input           | Output   |
| ---------------------------------------- | ------ | ---------------------------------------------------- | --------------- | -------- |
| **Generate Daily Transactions Report**   | GET    | `/api/v1/reports/system/export/daily-transactions`   | `date`          | `200 OK` |
| **Generate Monthly Transactions Report** | GET    | `/api/v1/reports/system/export/monthly-transactions` | `month`, `year` | `200 OK` |

---

### **Restaurant-Level Reports**

#### API Endpoints

| Function                                | Method | Endpoint                                                               | Input             | Output   |
| --------------------------------------- | ------ | ---------------------------------------------------------------------- | ----------------- | -------- |
| **Daily Orders Count**                  | GET    | `/api/v1/reports/restaurants/:restaurantId/orders/daily-count`         | `date` (optional) | `200 OK` |
| **Daily Orders Not Delivered Count**    | GET    | `/api/v1/reports/restaurants/:restaurantId/orders/daily-not-delivered` | `date` (optional) | `200 OK` |
| **Monthly Total Orders Count**          | GET    | `/api/v1/reports/restaurants/:restaurantId/orders/monthly-total`       | `month`, `year`   | `200 OK` |
| **Daily Cancelled Orders**              | GET    | `/api/v1/reports/restaurants/:restaurantId/orders/daily-cancelled`     | `date` (optional) | `200 OK` |
| **Monthly Cancelled Orders**            | GET    | `/api/v1/reports/restaurants/:restaurantId/orders/monthly-cancelled`   | `month`, `year`   | `200 OK` |
| **Daily Transactions [Count, Money]**   | GET    | `/api/v1/reports/restaurants/:restaurantId/transactions/daily`         | `date` (optional) | `200 OK` |
| **Monthly Transactions [Count, Money]** | GET    | `/api/v1/reports/restaurants/:restaurantId/transactions/monthly`       | `month`, `year`   | `200 OK` |

#### Reports

| Function                                 | Method | Endpoint                                                                | Input           | Output   |
| ---------------------------------------- | ------ | ----------------------------------------------------------------------- | --------------- | -------- |
| **Generate Daily Transactions Report**   | GET    | `/api/v1/reports/restaurants/:restaurantId/export/daily-transactions`   | `date`          | `200 OK` |
| **Generate Monthly Transactions Report** | GET    | `/api/v1/reports/restaurants/:restaurantId/export/monthly-transactions` | `month`, `year` | `200 OK` |
