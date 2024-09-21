# Shopping Cart Application - Angular Training Final Project

This project is a feature-rich Shopping Cart Application developed as the final project for the 7-Day Angular Training. The application allows users to browse and manage products, add them to their shopping cart, and complete orders with ease. Key features include:

1. **Login System**: A user authentication system with login and "forgot password" functionality. The login page validates user credentials and provides error messages for invalid attempts, while the "forgot password" page assists users in recovering their accounts.

2. **Product Management**: The dashboard displays a range of products, filterable by category and price. Users can add items to their cart, specifying quantities, and view detailed product information.

3. **Cart Operations**: A dedicated cart page lets users view, edit, or delete products from their cart.

4. **Profile Management**: Users can view and update their profile details, including personal information and interests.

5. **Order Processing**: A checkout page summarizes the cart's content, allowing users to finalize purchases, while the pending orders page tracks orders in progress.

For admin users, there are additional functionalities, including product management, viewing top-selling items, and managing customer accounts.

## Development server

- **Extract environment.zip in src** - this will load the env variables for the AWS S3 bucket
- **Run `json-server --watch database.json`** for the app to access the json database and load the data necessary.
- **Run `ng serve` for a dev server**. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


##
Below is the flowchart of the Shopping Cart project
![flowchart](img/flowchart.jpeg?raw=true)


## Web Pages

1. **Login Page**
![login](img/login.png?raw=true)

2. **Register Page**
![register](img/register.png?raw=true)

3. **Forgot Password Page**
![forgot-password](img/forgot-password1.png?raw=true)

4. **User Credentials Page**
    - Displays the credentials of the user after forgot password
![credentials](img/forgot-password2.png?raw=true)

5. **Dashboard Page** 
    - displays all the items in the grocery store and add items to cart
![dashboard](img/dashboard.png?raw=true)
<br>

6. **Cart Page**
    - Lists all the items in cart and be able to increase/decrease quantity, remove items, and proceed to checkout
![cart](img/cart.png?raw=true)
<br>

7. **Checkout Page**
    - Lists all the final items in purchase, calculates the subtotal, and total amount
    - Requires to input address before paying
![checkout](img/checkout.png?raw=true)
<br>

8. **Receipt Modal**
    - Shows the receipt of the customer's purchase
![receipt](img/receipt.png?raw=true)

9. **Profile Page**
    - Displays the personal information of the customer asked from registration
    - Able to update personal information and attach image
![profile](img/profile.png?raw=true)
<br>

9. **My Purchases / Pending Orders Page**
    - Lists all the purchases of the customer 
    - Can cancel orders that are still in pending status
![purchases](img/purchases.png?raw=true)
<br>

10. **My Purchases - Order Summary**
    - Displays order summary of the customer
![purchases-summary](img/purchases-order-summary.png?raw=true)
<br>

11. **Admin Dashboard Page**
    - Shows the recept purchases, sales analytics, etc.
![admin](img/admin-dashboard.png?raw=true)
<br>

12. **Products Page**
    - Displays all the products in inventory
    - Ability to manage all products in the inventory
![products](img/products.png?raw=true)
<br>

13. **Orders Page**
    - Displays all the orders of all customers
    - Can change status of orders
![orders](img/orders.png?raw=true)
<br>

14. **Order Summary Receipt**
    - Displays order summary of chosen order
![orders-summary](img/orders-summary.png?raw=true)

15. **User Records Page**
    - Displays the customer records
    - Ability to add new customer or deactivate customer
![user-records](img/users.png?raw=true)

<hr>
<b>Authors</b>:
<ul>
    <li>Juriel Botoy</li>
    <li>Dominique Frogoso</li>
</ul>
