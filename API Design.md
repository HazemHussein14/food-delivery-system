# Food Delivery API Design Documentation

This document outlines the API design for a food delivery application, covering key features including **User Registration & Authentication**, **Cart Management**, **Restaurant & Menu Management**, **Order Management**, **Customer Management**, **Payment Integration**, and **Dashboard & Reports**. The API follows RESTful principles, uses JSON for data exchange, and assumes authentication via JWT tokens.

## Base URL

```
https://example.com/api/v1
```

## Authentication

- All endpoints require a valid JWT token in the `Authorization` header, except for public endpoints such as signup and login.
- Format: `Bearer <jwt_token>`

## 1. User Registration & Authentication

The User Registration & Authentication feature allows users to create accounts, log in, reset passwords, and manage their authentication status.

### 1.1 User Sign Up

Register a new user account.

- **Endpoint**: `POST /auth/signup`
- **Description**: Creates a new user account in the system.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "userType": "string" // e.g., "customer", "restaurant_owner"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "userId": "string",
      "name": "string",
      "email": "string",
      "userType": "string",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input or email already exists.

### 1.2 User Login

Authenticate an existing user.

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "userId": "string",
      "token": "string",
      "refreshToken": "string",
      "expiresIn": "integer"
    }
    ```
  - **400 Bad Request**: Invalid credentials.
  - **401 Unauthorized**: Account inactive or unverified.

### 1.3 Request Password Reset

Initiate a password reset process.

- **Endpoint**: `POST /auth/password-reset/request`
- **Description**: Sends a password reset token to the user's email.
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Password reset instructions sent to your email"
    }
    ```
  - **404 Not Found**: Email not found.

### 1.4 Reset Password

Complete the password reset process.

- **Endpoint**: `POST /auth/password-reset`
- **Description**: Resets the user's password using the token sent to their email.
- **Request Body**:
  ```json
  {
    "token": "string",
    "newPassword": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Password successfully reset"
    }
    ```
  - **400 Bad Request**: Invalid token or password requirements not met.

### 1.5 Toggle Account Status

Enable or disable a user account.

- **Endpoint**: `PATCH /users/{userId}/status`
- **Description**: Updates the active status of a user account.
- **Path Parameters**:
  - `userId`: The ID of the user to update.
- **Request Body**:
  ```json
  {
    "active": "boolean"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "userId": "string",
      "active": "boolean",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: User not found.

### 1.6 Verify Email

Verify a user's email address.

- **Endpoint**: `POST /auth/verify-email`
- **Description**: Confirms a user's email address using the token and OTP sent to them.
- **Request Body**:
  ```json
  {
    "token": "string",
    "otp": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Email successfully verified"
    }
    ```
  - **400 Bad Request**: Invalid token or OTP.

### 1.7 Verify Phone

Verify a user's phone number.

- **Endpoint**: `POST /auth/verify-phone`
- **Description**: Confirms a user's phone number using the OTP sent to them.
- **Request Body**:
  ```json
  {
    "otp": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Phone number successfully verified"
    }
    ```
  - **400 Bad Request**: Invalid OTP.

### 1.8 OAuth Login

Authenticate using a third-party OAuth provider.

- **Endpoint**: `POST /auth/oauth`
- **Description**: Authenticates a user using a third-party OAuth provider.
- **Request Body**:
  ```json
  {
    "provider": "string", // e.g., "google", "facebook"
    "authCode": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "userId": "string",
      "token": "string",
      "refreshToken": "string",
      "expiresIn": "integer"
    }
    ```
  - **400 Bad Request**: Invalid provider or auth code.

### 1.9 Update Profile

Update a user's profile information.

- **Endpoint**: `PUT /users/{userId}/profile`
- **Description**: Updates the profile information of a user.
- **Path Parameters**:
  - `userId`: The ID of the user to update.
- **Request Body**:
  ```json
  {
    "newProfileData": {
      "name": "string",
      "phoneNumber": "string",
      "profilePicture": "string"
      // Other profile fields
    }
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "userId": "string",
      "name": "string",
      "phoneNumber": "string",
      "profilePicture": "string",
      // Other updated profile fields
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: User not found.

### 1.10 Logout

End a user's session.

- **Endpoint**: `POST /auth/logout`
- **Description**: Invalidates the user's JWT token.
- **Request Body**:
  ```json
  {
    "userId": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
  - **400 Bad Request**: Invalid user ID.

## 2. Cart Management

The Cart Management feature allows users to add, update, and remove items in their cart, as well as view the cart's contents.

### 2.1 Add Item to Cart

Add a food item to the user's cart.

- **Endpoint**: `POST /carts/{customerId}/items`
- **Description**: Adds a specified item to the user's cart.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "cartItem": {
      "menuItemId": "string",
      "quantity": "integer",
      "notes": "string" // Optional
    }
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "cartId": "string",
      "itemId": "string",
      "menuItemId": "string",
      "quantity": "integer",
      "notes": "string",
      "price": "number",
      "subtotal": "number"
    }
    ```
  - **400 Bad Request**: Invalid input (e.g., negative quantity).
  - **404 Not Found**: Menu item not found.

### 2.2 Clear Cart

Remove all items from a user's cart.

- **Endpoint**: `DELETE /carts/{customerId}`
- **Description**: Removes all items from the cart.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Cart successfully cleared"
    }
    ```
  - **404 Not Found**: Customer not found.

### 2.3 Modify Entire Cart

Replace all items in a cart.

- **Endpoint**: `PUT /carts/{customerId}`
- **Description**: Replaces the entire contents of the cart with new items.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "newCartItems": [
      {
        "menuItemId": "string",
        "quantity": "integer",
        "notes": "string" // Optional
      }
    ]
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "cartId": "string",
      "items": [
        {
          "itemId": "string",
          "menuItemId": "string",
          "quantity": "integer",
          "notes": "string",
          "price": "number",
          "subtotal": "number"
        }
      ],
      "total": "number"
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Customer not found.

### 2.4 View Cart

Retrieve the contents of the user's cart.

- **Endpoint**: `GET /carts/{customerId}`
- **Description**: Returns the list of items in the user's cart along with the total price.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Response**:
  - **200 OK**:
    ```json
    {
      "cartId": "string",
      "items": [
        {
          "itemId": "string",
          "menuItemId": "string",
          "name": "string",
          "quantity": "integer",
          "price": "number",
          "notes": "string",
          "subtotal": "number"
        }
      ],
      "total": "number"
    }
    ```
  - **404 Not Found**: Customer not found.

### 2.5 Remove Item from Cart

Remove an item from the user's cart.

- **Endpoint**: `DELETE /carts/{customerId}/items/{itemId}`
- **Description**: Removes the specified item from the cart.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
  - `itemId`: The ID of the cart item to remove.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Item successfully removed from cart"
    }
    ```
  - **404 Not Found**: Cart item not found.

### 2.6 Checkout Cart

Proceed to checkout with the current cart.

- **Endpoint**: `POST /carts/{customerId}/checkout`
- **Description**: Initiates the checkout process for the current cart.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "paymentMethod": "string",
    "shipmentAddress": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    }
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "cartId": "string",
      "total": "number",
      "paymentMethod": "string",
      "shipmentAddress": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "status": "string"
    }
    ```
  - **400 Bad Request**: Invalid input or empty cart.
  - **404 Not Found**: Customer not found.

### 2.7 Update Item Quantities

Update quantities for multiple items in the cart.

- **Endpoint**: `PATCH /carts/{customerId}/items/quantities`
- **Description**: Updates quantities for multiple items in the cart in a single request.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "quantities": [
      {
        "cartItemId": "string",
        "qty": "integer"
      }
    ]
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "cartId": "string",
      "items": [
        {
          "itemId": "string",
          "menuItemId": "string",
          "quantity": "integer",
          "price": "number",
          "subtotal": "number"
        }
      ],
      "total": "number"
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: One or more cart items not found.

## 3. Restaurant & Menu Management

The Restaurant & Menu Management feature allows restaurant owners to manage their restaurant profiles and menus, and enables customers to search for restaurants and menu items.

### 3.1 Register Restaurant

Create a new restaurant profile.

- **Endpoint**: `POST /restaurants`
- **Description**: Registers a new restaurant in the system.
- **Request Body**:
  ```json
  {
    "name": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "contactNumber": "string",
    "owner": "string" // User ID of the owner
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "restaurantId": "string",
      "name": "string",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "contactNumber": "string",
      "owner": "string",
      "active": "boolean",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.

### 3.2 Update Restaurant

Update an existing restaurant profile.

- **Endpoint**: `PUT /restaurants/{restaurantId}`
- **Description**: Updates the profile information of a restaurant.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant to update.
- **Request Body**:
  ```json
  {
    "name": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "contactNumber": "string",
    "owner": "string" // User ID of the owner
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "name": "string",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "contactNumber": "string",
      "owner": "string",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Restaurant not found.

### 3.3 Enable/Disable Restaurant

Toggle the active status of a restaurant.

- **Endpoint**: `PATCH /restaurants/{restaurantId}/status`
- **Description**: Enables or disables a restaurant.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Request Body**:
  ```json
  {
    "active": "boolean"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "active": "boolean",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Restaurant not found.

### 3.4 View All Restaurants

Retrieve a list of all restaurants.

- **Endpoint**: `GET /restaurants`
- **Description**: Returns a list of all restaurants in the system.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurants": [
        {
          "restaurantId": "string",
          "name": "string",
          "address": {
            "city": "string",
            "state": "string"
          },
          "rating": "number",
          "active": "boolean"
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```

### 3.5 Create Menu

Create a new menu for a restaurant.

- **Endpoint**: `POST /menus`
- **Description**: Creates a new menu for a restaurant.
- **Request Body**:
  ```json
  {
    "restaurantId": "string",
    "menuItems": [
      {
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "image": "string" // URL
      }
    ]
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "menuId": "string",
      "restaurantId": "string",
      "menuItems": [
        {
          "itemId": "string",
          "name": "string",
          "description": "string",
          "price": "number",
          "category": "string",
          "image": "string"
        }
      ],
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Restaurant not found.

### 3.6 Update Menu

Update an existing menu.

- **Endpoint**: `PUT /menus/{menuId}`
- **Description**: Updates an existing menu.
- **Path Parameters**:
  - `menuId`: The ID of the menu to update.
- **Request Body**:
  ```json
  {
    "menuItems": [
      {
        "itemId": "string", // Optional for existing items
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "image": "string" // URL
      }
    ],
    "menuName": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "menuId": "string",
      "restaurantId": "string",
      "menuName": "string",
      "menuItems": [
        {
          "itemId": "string",
          "name": "string",
          "description": "string",
          "price": "number",
          "category": "string",
          "image": "string"
        }
      ],
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Menu not found.

### 3.7 Delete Menu

Delete an existing menu.

- **Endpoint**: `DELETE /menus/{menuId}`
- **Description**: Deletes an existing menu.
- **Path Parameters**:
  - `menuId`: The ID of the menu to delete.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Menu successfully deleted"
    }
    ```
  - **404 Not Found**: Menu not found.

### 3.8 Enable/Disable Menu

Toggle the active status of a menu.

- **Endpoint**: `PATCH /menus/{menuId}/status`
- **Description**: Enables or disables a menu.
- **Path Parameters**:
  - `menuId`: The ID of the menu.
- **Request Body**:
  ```json
  {
    "active": "boolean"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "menuId": "string",
      "active": "boolean",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Menu not found.

### 3.9 View Historical Menus

Retrieve historical menus for a restaurant.

- **Endpoint**: `GET /restaurants/{restaurantId}/menus/history`
- **Description**: Returns a list of historical menus for a restaurant.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "menus": [
        {
          "menuId": "string",
          "menuName": "string",
          "version": "integer",
          "active": "boolean",
          "createdAt": "string" // ISO 8601 format
        }
      ]
    }
    ```
  - **404 Not Found**: Restaurant not found.

### 3.10 Search Restaurants

Search for restaurants based on various criteria.

- **Endpoint**: `GET /restaurants/search`
- **Description**: Searches for restaurants based on name, cuisine, or location.
- **Query Parameters**:
  - `name`: The name to search for.
  - `cuisine`: The cuisine type to search for.
  - `location`: The location to search in.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurants": [
        {
          "restaurantId": "string",
          "name": "string",
          "cuisine": "string",
          "address": {
            "city": "string",
            "state": "string"
          },
          "rating": "number"
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```

### 3.11 Search Menu Items

Search for menu items based on various criteria.

- **Endpoint**: `GET /menus/search`
- **Description**: Searches for menu items based on keyword, category, or price range.
- **Query Parameters**:
  - `keyword`: The keyword to search for.
  - `category`: The category to filter by.
  - `priceRange`: The price range to filter by (e.g., "10-20").
- **Response**:
  - **200 OK**:
    ```json
    {
      "menuItems": [
        {
          "itemId": "string",
          "name": "string",
          "description": "string",
          "price": "number",
          "category": "string",
          "restaurantId": "string",
          "restaurantName": "string"
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```

### 3.12 Top Rated Restaurants

Retrieve a list of top-rated restaurants.

- **Endpoint**: `GET /restaurants/top-rated`
- **Description**: Returns a list of top-rated restaurants.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurants": [
        {
          "restaurantId": "string",
          "name": "string",
          "rating": "number",
          "reviewCount": "integer",
          "cuisine": "string",
          "address": {
            "city": "string",
            "state": "string"
          }
        }
      ]
    }
    ```

### 3.13 Recommended Restaurants

Retrieve personalized restaurant recommendations.

- **Endpoint**: `GET /restaurants/recommended`
- **Description**: Returns restaurant recommendations based on customer preferences and location.
- **Query Parameters**:
  - `customerId`: The ID of the customer.
  - `location`: The location to search in.
  - `preference`: The cuisine preference.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurants": [
        {
          "restaurantId": "string",
          "name": "string",
          "rating": "number",
          "cuisine": "string",
          "address": {
            "city": "string",
            "state": "string"
          },
          "distance": "number" // in kilometers
        }
      ]
    }
    ```
  - **404 Not Found**: Customer not found.

## 4. Order Management

The Order Management feature allows customers to place orders and enables restaurants to manage and fulfill those orders.

### 4.1 Place Order

Create a new order.

- **Endpoint**: `POST /orders`
- **Description**: Places a new order based on the customer's cart.
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "cartId": "string",
    "paymentMethod": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    }
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "orderId": "string",
      "customerId": "string",
      "cartId": "string",
      "restaurantId": "string",
      "items": [
        {
          "menuItemId": "string",
          "name": "string",
          "quantity": "integer",
          "price": "number"
        }
      ],
      "total": "number",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "paymentMethod": "string",
      "status": "string",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input or empty cart.
  - **404 Not Found**: Customer or cart not found.

### 4.2 Cancel Order

Cancel an existing order.

- **Endpoint**: `PATCH /orders/{orderId}/cancel`
- **Description**: Cancels an existing order.
- **Path Parameters**:
  - `orderId`: The ID of the order to cancel.
- **Request Body**:
  ```json
  {
    "cancelledBy": "string", // "customer" or "restaurant"
    "reason": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "status": "string", // "cancelled"
      "cancelledBy": "string",
      "reason": "string",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid reason or order cannot be cancelled.
  - **404 Not Found**: Order not found.

### 4.3 Update Order Status

Update the status of an order.

- **Endpoint**: `PATCH /orders/{orderId}/status`
- **Description**: Updates the status of an order.
- **Path Parameters**:
  - `orderId`: The ID of the order to update.
- **Request Body**:
  ```json
  {
    "status": "string" // e.g., "confirmed", "preparing", "out_for_delivery", "delivered"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "status": "string",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid status transition.
  - **404 Not Found**: Order not found.

### 4.4 Restaurant Order History

Retrieve order history for a restaurant.

- **Endpoint**: `GET /restaurants/{restaurantId}/orders/history`
- **Description**: Returns the order history for a restaurant.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Response**:
  - **200 OK**:
    ```json
    {
      "orders": [
        {
          "orderId": "string",
          "customerId": "string",
          "customerName": "string",
          "total": "number",
          "status": "string",
          "createdAt": "string" // ISO 8601 format
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

### 4.5 Order Summary

Retrieve a summary of an order.

- **Endpoint**: `GET /orders/{orderId}/summary`
- **Description**: Returns a summary of an order.
- **Path Parameters**:
  - `orderId`: The ID of the order.
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "customerId": "string",
      "restaurantId": "string",
      "restaurantName": "string",
      "total": "number",
      "status": "string",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Order not found.

### 4.6 Order Details

Retrieve detailed information about an order.

- **Endpoint**: `GET /orders/{orderId}`
- **Description**: Returns detailed information about an order.
- **Path Parameters**:
  - `orderId`: The ID of the order.
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "customerId": "string",
      "customerName": "string",
      "restaurantId": "string",
      "restaurantName": "string",
      "items": [
        {
          "menuItemId": "string",
          "name": "string",
          "quantity": "integer",
          "price": "number",
          "subtotal": "number"
        }
      ],
      "total": "number",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "paymentMethod": "string",
      "status": "string",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Order not found.

## 5. Customer Management

The Customer Management feature allows customers to view their order history, manage payment settings, and handle their account information.

### 5.1 Customer Order History

Retrieve order history for a customer.

- **Endpoint**: `GET /api/v1/customers/{customerId}/orders`
- **Description**: Returns a list of orders placed by the customer.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Response**:
  - **200 OK**:
    ```json
    {
      "orders": [
        {
          "orderId": "string",
          "restaurantId": "string",
          "restaurantName": "string",
          "total": "number",
          "status": "string",
          "createdAt": "string" // ISO 8601 format
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```
  - **404 Not Found**: Customer not found.

### 5.2 Preferred Payment Settings

Retrieve a customer's preferred payment settings.

- **Endpoint**: `GET /api/v1/customers/{customerId}/payment-settings`
- **Description**: Returns the customer's saved payment methods and preferences.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Response**:
  - **200 OK**:
    ```json
    {
      "customerId": "string",
      "paymentMethods": [
        {
          "id": "string",
          "type": "string", // e.g., "credit_card", "paypal"
          "details": {
            "lastFour": "string", // Last four digits if applicable
            "expiryDate": "string", // MM/YY format if applicable
            "isDefault": "boolean"
          }
        }
      ]
    }
    ```
  - **404 Not Found**: Customer not found.

### 5.3 Create Address

Add a new address for a customer.

- **Endpoint**: `POST /api/v1/customers/{customerId}/addresses`
- **Description**: Creates a new address entry for the customer.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "label": "string", // e.g., "home", "work"
    "isDefault": "boolean"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "addressId": "string",
      "customerId": "string",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "label": "string",
      "isDefault": "boolean",
      "active": "boolean",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Customer not found.

### 5.4 View Addresses

Retrieve addresses for a customer.

- **Endpoint**: `GET /api/v1/customers/{customerId}/addresses`
- **Description**: Returns all addresses associated with the customer.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Response**:
  - **200 OK**:
    ```json
    {
      "addresses": [
        {
          "addressId": "string",
          "address": {
            "street": "string",
            "city": "string",
            "state": "string",
            "zipCode": "string",
            "country": "string"
          },
          "label": "string",
          "isDefault": "boolean",
          "active": "boolean"
        }
      ]
    }
    ```
  - **404 Not Found**: Customer not found.

### 5.5 Update Address

Update an existing address for a customer.

- **Endpoint**: `PUT /api/v1/customers/{customerId}/addresses/{addressId}`
- **Description**: Updates an existing address for the customer.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
  - `addressId`: The ID of the address to update.
- **Request Body**:
  ```json
  {
    "updatedFields": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string",
      "label": "string",
      "isDefault": "boolean"
    }
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "addressId": "string",
      "customerId": "string",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      },
      "label": "string",
      "isDefault": "boolean",
      "active": "boolean",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Customer or address not found.

### 5.6 Enable/Disable Address

Enable or disable an address for a customer.

- **Endpoint**: `PATCH /api/v1/customers/{customerId}/addresses/{addressId}/status`
- **Description**: Activates or deactivates an address.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
  - `addressId`: The ID of the address to update.
- **Request Body**:
  ```json
  {
    "active": "boolean"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "addressId": "string",
      "customerId": "string",
      "active": "boolean",
      "updatedAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Customer or address not found.

### 5.7 Deactivate Account

Deactivate a customer account.

- **Endpoint**: `PATCH /api/v1/customers/{customerId}/deactivate`
- **Description**: Deactivates a customer account.
- **Path Parameters**:
  - `customerId`: The ID of the customer.
- **Request Body**:
  ```json
  {
    "reason": "string",
    "feedback": "string" // optional
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "customerId": "string",
      "status": "string", // "inactive"
      "deactivatedAt": "string" // ISO 8601 format
    }
    ```
  - **404 Not Found**: Customer not found.

### 5.8 Rating & Comments

Submit a review for a restaurant.

- **Endpoint**: `POST /api/v1/reviews`
- **Description**: Creates a new review for a restaurant.
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "restaurantId": "string",
    "rating": "integer", // 1-5
    "comment": "string"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "reviewId": "string",
      "customerId": "string",
      "restaurantId": "string",
      "rating": "integer",
      "comment": "string",
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input.
  - **404 Not Found**: Customer or restaurant not found.

### 5.9 Track Order Status

Track the status of a specific order.

- **Endpoint**: `GET /api/v1/orders/{orderId}/status`
- **Description**: Returns the current status of an order.
- **Path Parameters**:
  - `orderId`: The ID of the order.
- **Response**:
  - **200 OK**:
    ```json
    {
      "orderId": "string",
      "status": "string", // e.g., "confirmed", "preparing", "out_for_delivery", "delivered"
      "estimatedDeliveryTime": "string", // ISO 8601 format (if applicable)
      "statusHistory": [
        {
          "status": "string",
          "timestamp": "string" // ISO 8601 format
        }
      ]
    }
    ```
  - **404 Not Found**: Order not found.

## 6. Payment Integration

The Payment Integration feature allows for processing payments through third-party payment providers and managing payment transactions.

### 6.1 Third-party Payment Integration

Initiate a payment through a third-party payment provider.

- **Endpoint**: `POST /api/v1/payments/initiate`
- **Description**: Initiates a payment transaction using a specified payment provider.
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "amount": "number",
    "provider": "string" // e.g., "stripe", "paypal"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "transactionId": "string",
      "customerId": "string",
      "amount": "number",
      "provider": "string",
      "status": "string", // e.g., "pending", "completed"
      "paymentUrl": "string", // URL to redirect for completing payment (if applicable)
      "createdAt": "string" // ISO 8601 format
    }
    ```
  - **400 Bad Request**: Invalid input or payment provider not supported.
  - **404 Not Found**: Customer not found.

### 6.2 View Payment Transactions

Retrieve payment transactions for a customer.

- **Endpoint**: `GET /api/v1/payments/transactions`
- **Description**: Returns a list of payment transactions for a customer.
- **Query Parameters**:
  - `customerId`: The ID of the customer.
  - Filters (optional): `startDate`, `endDate`, `status`, `provider`
- **Response**:
  - **200 OK**:
    ```json
    {
      "transactions": [
        {
          "transactionId": "string",
          "customerId": "string",
          "amount": "number",
          "provider": "string",
          "status": "string",
          "orderId": "string", // If associated with an order
          "createdAt": "string" // ISO 8601 format
        }
      ],
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
    ```
  - **404 Not Found**: Customer not found.

### 6.3 Generate Transaction Receipt

Generate a receipt for a payment transaction.

- **Endpoint**: `GET /api/v1/payments/transactions/{txnId}/receipt`
- **Description**: Returns a receipt for a specific payment transaction.
- **Path Parameters**:
  - `txnId`: The ID of the transaction.
- **Response**:
  - **200 OK**:
    ```json
    {
      "receipt": {
        "transactionId": "string",
        "customerId": "string",
        "customerName": "string",
        "amount": "number",
        "provider": "string",
        "orderId": "string", // If associated with an order
        "orderDetails": {
          // Order details if applicable
        },
        "transactionDate": "string", // ISO 8601 format
        "receiptNumber": "string"
      }
    }
    ```
  - **404 Not Found**: Transaction not found.

## 7. Dashboard & Reports

The Dashboard & Reports feature provides access to various metrics and reports at both system and restaurant levels.

### 7.1 System-Level Reports

#### 7.1.1 Count Restaurants

Retrieve the total number of restaurants in the system.

- **Endpoint**: `GET /api/v1/reports/system/count-restaurants`
- **Description**: Returns the total count of restaurants registered in the system.
- **Response**:
  - **200 OK**:
    ```json
    {
      "count": "integer"
    }
    ```

#### 7.1.2 Count Customers

Retrieve the total number of customers in the system.

- **Endpoint**: `GET /api/v1/reports/system/count-customers`
- **Description**: Returns the total count of customers registered in the system.
- **Response**:
  - **200 OK**:
    ```json
    {
      "count": "integer"
    }
    ```

#### 7.1.3 Count Active Customers

Retrieve the number of active customers in the system.

- **Endpoint**: `GET /api/v1/reports/system/count-active-customers`
- **Description**: Returns the count of customers who are active in the system.
- **Response**:
  - **200 OK**:
    ```json
    {
      "count": "integer"
    }
    ```

#### 7.1.4 Daily Orders Count

Retrieve the count of orders for a specific day.

- **Endpoint**: `GET /api/v1/reports/system/orders/daily-count`
- **Description**: Returns the count of orders placed on a specific day.
- **Query Parameters**:
  - `date` (optional): The date to count orders for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "date": "string", // ISO 8601 format (date only)
      "count": "integer"
    }
    ```

#### 7.1.5 Monthly Total Orders

Retrieve the total number of orders for a specific month.

- **Endpoint**: `GET /api/v1/reports/system/orders/monthly-total`
- **Description**: Returns the total count of orders placed in a specific month.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "month": "integer",
      "year": "integer",
      "count": "integer"
    }
    ```

#### 7.1.6 Daily Cancelled Orders

Retrieve the count of cancelled orders for a specific day.

- **Endpoint**: `GET /api/v1/reports/system/orders/daily-cancelled`
- **Description**: Returns the count of orders cancelled on a specific day.
- **Query Parameters**:
  - `date` (optional): The date to count cancelled orders for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "date": "string", // ISO 8601 format (date only)
      "count": "integer"
    }
    ```

#### 7.1.7 Monthly Cancelled Orders

Retrieve the count of cancelled orders for a specific month.

- **Endpoint**: `GET /api/v1/reports/system/orders/monthly-cancelled`
- **Description**: Returns the count of orders cancelled in a specific month.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "month": "integer",
      "year": "integer",
      "count": "integer"
    }
    ```

#### 7.1.8 Daily Transactions

Retrieve transaction statistics for a specific day.

- **Endpoint**: `GET /api/v1/reports/system/transactions/daily`
- **Description**: Returns the count and total amount of transactions for a specific day.
- **Query Parameters**:
  - `date` (optional): The date to get transactions for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "date": "string", // ISO 8601 format (date only)
      "count": "integer",
      "totalAmount": "number"
    }
    ```

#### 7.1.9 Monthly Transactions

Retrieve transaction statistics for a specific month.

- **Endpoint**: `GET /api/v1/reports/system/transactions/monthly`
- **Description**: Returns the count and total amount of transactions for a specific month.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "month": "integer",
      "year": "integer",
      "count": "integer",
      "totalAmount": "number"
    }
    ```

#### 7.1.10 Generate Daily Transactions Report

Generate a detailed report of transactions for a specific day.

- **Endpoint**: `GET /api/v1/reports/system/export/daily-transactions`
- **Description**: Returns a downloadable report of transactions for a specific day.
- **Query Parameters**:
  - `date`: The date to generate the report for.
- **Response**:
  - **200 OK**: Returns a downloadable file (CSV or PDF).

#### 7.1.11 Generate Monthly Transactions Report

Generate a detailed report of transactions for a specific month.

- **Endpoint**: `GET /api/v1/reports/system/export/monthly-transactions`
- **Description**: Returns a downloadable report of transactions for a specific month.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**: Returns a downloadable file (CSV or PDF).

### 7.2 Restaurant-Level Reports

#### 7.2.1 Daily Orders Count

Retrieve the count of orders for a specific restaurant on a specific day.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/orders/daily-count`
- **Description**: Returns the count of orders placed for a specific restaurant on a specific day.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `date` (optional): The date to count orders for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "date": "string", // ISO 8601 format (date only)
      "count": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.2 Daily Orders Not Delivered Count

Retrieve the count of orders not delivered for a specific restaurant on a specific day.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/orders/daily-not-delivered`
- **Description**: Returns the count of orders not delivered for a specific restaurant on a specific day.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `date` (optional): The date to count orders for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "date": "string", // ISO 8601 format (date only)
      "count": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.3 Monthly Total Orders Count

Retrieve the total number of orders for a specific restaurant in a specific month.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/orders/monthly-total`
- **Description**: Returns the total count of orders placed for a specific restaurant in a specific month.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "month": "integer",
      "year": "integer",
      "count": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.4 Daily Cancelled Orders

Retrieve the count of cancelled orders for a specific restaurant on a specific day.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/orders/daily-cancelled`
- **Description**: Returns the count of orders cancelled for a specific restaurant on a specific day.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `date` (optional): The date to count cancelled orders for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "date": "string", // ISO 8601 format (date only)
      "count": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.5 Monthly Cancelled Orders

Retrieve the count of cancelled orders for a specific restaurant in a specific month.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/orders/monthly-cancelled`
- **Description**: Returns the count of orders cancelled for a specific restaurant in a specific month.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "month": "integer",
      "year": "integer",
      "count": "integer"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.6 Daily Transactions

Retrieve transaction statistics for a specific restaurant on a specific day.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/transactions/daily`
- **Description**: Returns the count and total amount of transactions for a specific restaurant on a specific day.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `date` (optional): The date to get transactions for. Defaults to current date if not provided.
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "date": "string", // ISO 8601 format (date only)
      "count": "integer",
      "totalAmount": "number"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.7 Monthly Transactions

Retrieve transaction statistics for a specific restaurant in a specific month.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/transactions/monthly`
- **Description**: Returns the count and total amount of transactions for a specific restaurant in a specific month.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**:
    ```json
    {
      "restaurantId": "string",
      "month": "integer",
      "year": "integer",
      "count": "integer",
      "totalAmount": "number"
    }
    ```
  - **404 Not Found**: Restaurant not found.

#### 7.2.8 Generate Daily Transactions Report

Generate a detailed report of transactions for a specific restaurant on a specific day.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/export/daily-transactions`
- **Description**: Returns a downloadable report of transactions for a specific restaurant on a specific day.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `date`: The date to generate the report for.
- **Response**:
  - **200 OK**: Returns a downloadable file (CSV or PDF).
  - **404 Not Found**: Restaurant not found.

#### 7.2.9 Generate Monthly Transactions Report

Generate a detailed report of transactions for a specific restaurant in a specific month.

- **Endpoint**: `GET /api/v1/reports/restaurants/{restaurantId}/export/monthly-transactions`
- **Description**: Returns a downloadable report of transactions for a specific restaurant in a specific month.
- **Path Parameters**:
  - `restaurantId`: The ID of the restaurant.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (YYYY).
- **Response**:
  - **200 OK**: Returns a downloadable file (CSV or PDF).
  - **404 Not Found**: Restaurant not found.
