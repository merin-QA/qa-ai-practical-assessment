# Application Context — Practice Software Testing

> **Application URL:** [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)  
> **Documentation:** [https://testsmith-io.github.io/practice-software-testing/#/](https://testsmith-io.github.io/practice-software-testing/#/)  
> **API (Sprint 5):** [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com)  
> **Swagger:** [https://api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)  
> **Version:** Sprint 5 (Full Platform)

---

## 1. Application Overview

**Practice Software Testing** is an open-source **e-commerce Toolshop** web application built specifically for practicing software testing skills. It simulates a realistic, evolving product with incremental sprint releases, making it suitable for manual testing, exploratory testing, API testing, UI automation, performance testing, and security testing exercises.

### Purpose
- Provide a safe, realistic environment for testers and developers to practice QA skills
- Support multiple sprint versions with progressively added features
- Offer both **web UI**, **REST API**, **GraphQL API**, and a **mobile app** (integrated with Sprint 4)
- Include intentional bug variants (`with-bugs`) and performance-degradation variants for advanced testing scenarios

### Domain
- **Industry:** E-commerce / Retail (Toolshop)
- **Product types:** Standard purchasable products and hourly **rental** products
- **Core capabilities:** Product catalog browsing, shopping cart, checkout, customer accounts, invoicing, admin management, discounts, multi-language support, and customer support (contact form + chat widget)

---

## 2. User Types & Roles

| Role | Description | Post-Login Redirect | Key Capabilities |
|------|-------------|---------------------|------------------|
| **Visitor (Guest)** | Unauthenticated user | N/A | Browse products, search/filter/sort, view product details, use contact form, add items to cart, complete guest checkout (with login step), use chat widget |
| **Customer (User)** | Registered end-user | `/account` | All guest capabilities + profile management, favorites, invoices (with PDF download), messages, change password, TOTP setup, checkout with pre-filled address |
| **Administrator (Admin)** | System administrator | `/admin/dashboard` | Full CRUD on products, categories, brands, orders, users, messages; reporting; user enable/disable; admin settings (local only) |

### Default Test Accounts

| Name | Role | Email | Password | Notes |
|------|------|-------|----------|-------|
| John Doe | admin | admin@practicesoftwaretesting.com | welcome01 | Admin accounts are **exempt from account locking** |
| Jane Doe | user | customer@practicesoftwaretesting.com | welcome01 | TOTP setup is **denied** for this account |
| Jack Howe | user | customer2@practicesoftwaretesting.com | welcome01 | — |
| Bob Smith | user | customer3@practicesoftwaretesting.com | pass123 | — |

### Role-Based Access Rules
- **Favorites:** Requires authentication; guests receive `"Unauthorized, can not add product to your favorite list."`
- **Invoices & Messages:** Only accessible to the authenticated owner; other users' invoices return "not found"
- **Admin panel:** Restricted to admin role (`/admin/*`)
- **TOTP setup:** Denied for `customer@practicesoftwaretesting.com` and `admin@practicesoftwaretesting.com` (use a self-registered account)
- **Account locking:** Applies to regular users after **3 consecutive failed login attempts** (HTTP 423); admins are never locked
- **Disabled accounts:** Admin can disable user accounts; disabled users see `"Account disabled."` on login

---

## 3. Key Features (Sprint 5)

### 3.1 Product Catalog
- Paginated product grid with image, name, and price
- **Search** (3–40 characters; resets all active filters on submit)
- **Category filter** (hierarchical — checking parent checks all children)
- **Brand filter** (combinable with category filter)
- **Sorting:** Name A-Z, Name Z-A, Price High-Low, Price Low-High
- **Price range slider:** Default $1–$100, max $200
- **Out of stock** indicator on product cards
- **Discount price display** (strikethrough original + discounted price)
- Category-specific browsing pages with same filter capabilities

### 3.2 Product Detail
- Image, name, description, price, category badge, brand badge
- Quantity selector (+/− buttons, manual entry clamped 1–999,999,999)
- **Add to Cart** with success toast
- **Add to Favorites** (authenticated users only)
- **Rental products:** Duration slider (1–10 hours), price = hourly rate × duration
- Related products section
- Product specifications and CO₂ rating (Sprint 5)
- Product comparison page (GraphQL-powered, side-by-side specs)

### 3.3 Shopping Cart & Checkout
- Server-side cart persistence (CRUD via API)
- Cart review: update quantity, delete items, discount badges
- Multi-step checkout wizard:
  1. **Cart Review** (with discounts)
  2. **Sign In** (guests only; supports TOTP)
  3. **Billing Address** (pre-filled for logged-in users)
  4. **Payment** (method-specific fields)
- **Postcode lookup** autofill on registration and checkout address forms

### 3.4 Authentication & Security
- Email/password login with JWT
- **Social login:** Google OAuth (popup 500×400px)
- **Two-Factor Authentication (TOTP):** QR code setup, 6-digit verification
- **Account locking** after 3 failed attempts (users only)
- **Password strength indicator** on registration and change password (5 levels)
- **Forgot password** flow (email-based reset)
- Route guards for protected pages

### 3.5 Customer Account
- Profile view/edit (email is read-only)
- Change password (logs out after 5 seconds on success)
- Favorites list (add/remove)
- Invoices list and detail (with PDF download)
- Contact messages (view and reply)
- TOTP setup section on profile

### 3.6 Admin Dashboard
- Sales bar chart by year
- Recent invoices list
- **CRUD:** Products, Categories (with parent), Brands
- **Order management:** Status updates (AWAITING_FULFILLMENT, ON_HOLD, AWAITING_SHIPMENT, SHIPPED, COMPLETED)
- **User management:** List, view, edit, delete, enable/disable toggle
- **Message management:** View and reply to contact messages
- **Reports:** Monthly sales, weekly sales, general statistics
- **Settings:** Postcode lookup URL override (local Docker only)

### 3.7 Discounts
| Discount Type | Rule | Details |
|---------------|------|---------|
| **Geo-location** | Based on browser geolocation | NYC 5%, Mumbai 10%, Tokyo 15%, Amsterdam 20%, London 25% |
| **Combination** | Cart has rental + non-rental items | Additional **15%** off cart subtotal |
| **Location offer** | Product flagged as location offer | Applies location discount to eligible products (including rentals) |

### 3.8 Payment Methods
| Method | Required Fields | Validation Rules |
|--------|----------------|------------------|
| **Bank Transfer** | Bank name, Account name, Account number | Bank name: letters/spaces; Account name: alphanumeric + spaces/periods/apostrophes/hyphens; Account number: digits only |
| **Credit Card** | Card number, Expiration, CVV, Card holder | Card: `XXXX-XXXX-XXXX-XXXX`; Expiry: `MM/YYYY` (future date); CVV: 3–4 digits; Name: letters/spaces |
| **Buy Now Pay Later** | Monthly installments | Options: 3, 6, 9, 12 months |
| **Gift Card** | Gift card number, Validation code | Number: exactly 16 alphanumeric; Code: exactly 4 alphanumeric |
| **Cash on Delivery** | None | No additional fields |

### 3.9 Additional Features
- **Chat widget:** Find Product, Order Product, Checkout, Support (bottom-right toggle)
- **Multi-language:** EN, DE, ES, FR, NL, TR (browser detection + localStorage persistence)
- **Privacy Policy** page (`/privacy`)
- **Contact form (advanced):** Subject dropdown, 50-char min message, optional `.txt` file (must be 0 KB)
- **PDF invoices:** Async generation with status polling (every 20 seconds)
- **Email notifications:** Registration, password reset, checkout confirmation, contact form

---

## 4. Business Rules

### 4.1 Product & Inventory
- Products with zero stock show **"Out of stock"** and disable **Add to Cart** (non-rental items)
- Rental products are always orderable regardless of stock
- Rental duration: 1–10 hours; total = hourly rate × duration
- Quantity minimum: 1; maximum: 999,999,999
- Search query length: 3–40 characters
- Applying search resets all active filters

### 4.2 Cart & Pricing
- Empty cart displays: `"Your shopping cart is empty"`
- Quantity update shows: `"Product quantity updated."`
- Add to cart shows: `"Product added to shopping cart."`
- Combination discount (15%) requires **at least one rental AND one non-rental** item
- Removing all items of one type removes the combination discount
- Location discounts apply at product card, detail, and cart line-item level

### 4.3 Authentication & Registration
- Password requirements:
  - Minimum 8 characters
  - Uppercase and lowercase letters
  - At least one number
  - At least one special character
- Password strength levels: Weak (20%), Moderate (40%), Strong (60%), Very Strong (80%), Excellent (100%)
- Registration fields: first name, last name, DOB (YYYY-MM-DD), address, phone (numeric), email (max 256, RFC-compliant), password
- Duplicate email: `"Email is already in use."`
- Invalid login: `"Invalid email or password"`
- Account locked: `"Account locked, too many failed attempts. Please contact the administrator."` (HTTP 423)
- Invalid TOTP: `"Invalid TOTP"`

### 4.4 Checkout & Orders
- Guest checkout requires login step before billing address
- Billing address fields (all required):
  - Street (max 70), City (max 40), State (max 40), Country (max 40), Postal code (max 10)
- Successful order: confirmation with invoice number, cart cleared, confirmation email sent
- Order statuses: `AWAITING_FULFILLMENT`, `ON_HOLD`, `AWAITING_SHIPMENT`, `SHIPPED`, `COMPLETED`

### 4.5 Contact Form
- Message minimum length: **50 characters**
- Subject options: Customer service, Webmaster, Return, Payments, Warranty, Status of order
- File attachment: `.txt` only, must be exactly **0 KB**
- Invalid file type: `"File should have a txt extension."`
- Invalid file size: `"File should be empty."`
- Logged-in users: name/email auto-filled and hidden; shows `"Known user, [Full Name]"`

### 4.6 Gift Card Validation
- Gift card number: exactly **16 alphanumeric** characters (`/^[A-Za-z0-9]{16}$/`)
- Validation code: exactly **4 alphanumeric** characters (`/^[A-Za-z0-9]{4}$/`)
- Validated at three layers: Angular form, `POST /payment/check`, `POST /invoices`
- Invalid format returns **422 Unprocessable Entity**; no invoice/payment created

### 4.7 Postcode Lookup
- Endpoint: `GET /postcode-lookup?country={code}&postcode={code}&house_number={num}`
- Triggers when country + postcode + house number are all filled (300ms debounce)
- Default driver: Faker (deterministic fake addresses)
- HTTP driver: calls external mock/real service
- Admin UI override: local Docker only (hidden on production)
- Failure returns **502 Bad Gateway**

### 4.8 Multi-Language
- Supported: English, German, Spanish, French, Dutch, Turkish
- First visit: auto-detect browser language; fallback to English
- Preference stored in `localStorage`; takes priority over browser detection

---

## 5. Common Workflows

### 5.1 Guest Product Browsing
```
Home → Browse product grid → Apply filters (category/brand/price) → Sort results
     → Search products → Click product card → View product detail → Add to cart
```

### 5.2 Guest Checkout (Full Flow)
```
Add product(s) to cart → Navigate to /checkout → Review cart → Proceed
→ Login step (enter credentials or register) → Enter billing address
→ Select payment method → Fill payment details → Confirm order
→ View confirmation (invoice number) → Receive confirmation email
```

### 5.3 Customer Registration & Login
```
/auth/register → Fill registration form (with password strength feedback)
→ Submit → Receive confirmation email → Redirected to login
→ /auth/login → Enter credentials → (TOTP if enabled) → Redirected to /account
```

### 5.4 Authenticated Purchase
```
Login → Browse products → Add to cart → /checkout → Cart review
→ (Skip login step) → Billing address (pre-filled) → Payment → Confirm
→ /account/invoices → View invoice detail → Download PDF
```

### 5.5 Favorites Management
```
Login → Product detail → "Add to Favorites" → /account/favorites
→ View favorites list → Delete unwanted items
```

### 5.6 Password Reset
```
Login page → "Forgot password" → Enter registered email → Submit
→ New password sent to email → Confirmation message (fades after 3 seconds)
```

### 5.7 TOTP Setup
```
Login (non-default account) → /account/profile → "Setup two factor authentication"
→ Scan QR code → Enter 6-digit code → "Verify TOTP"
→ "TOTP verified and enabled successfully."
```

### 5.8 Admin Order Management
```
Login as admin → /admin/dashboard → View sales chart
→ /admin/orders → Select order → Update status → Save
```

### 5.9 Admin User Management
```
Login as admin → /admin/users → Select user → Toggle "Enabled" off
→ User cannot login ("Account disabled.") → Re-enable → User can login again
```

### 5.10 Contact & Support
```
/contact → Fill form (subject, message, optional .txt attachment) → Submit
→ Confirmation email sent
OR
Chat widget → Support → Enter subject + message → Submit → Confirmation displayed
```

### 5.11 Rental Product Order
```
/rentals → Select rental product → Adjust duration slider (1–10 hrs)
→ Add to cart (marked "This is a rental item") → Complete checkout
```

### 5.12 Combination Discount Flow
```
Add rental product to cart → Add non-rental product to cart
→ Cart shows 15% combination discount → Complete checkout
→ Invoice reflects subtotal, 15% discount, and final total
```

### 5.13 Chat Widget Checkout
```
Open chat → Checkout → Cart summary → Guest details (if needed)
→ Address → Payment method → Order confirmation with invoice number
```

---

## 6. Application Architecture

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Angular 20, Bootstrap 5 |
| Mobile | React Native |
| Backend | Laravel 12, PHP 8.3 |
| Database | MariaDB 10.6 (MySQL compatible) |
| Cache | Redis (via Predis) |
| Mail | MailHog (local) / SMTP (production) |
| Infra | Docker, Nginx, PHP-FPM |
| Auth | JWT, Google OAuth, GitHub OAuth |
| API (REST) | OpenAPI 3.0 via L5-Swagger |
| API (GraphQL) | Lighthouse (nuwave/lighthouse) |
| Testing | Pest, Playwright, Pact |

### UI Routes (Sprint 5)
| Path | Module | Description |
|------|--------|-------------|
| `/` | ProductsModule | Product browsing (lazy-loaded) |
| `/privacy` | PrivacyModule | Privacy policy |
| `/checkout` | CheckoutModule | Checkout flow |
| `/contact` | ContactModule | Contact form |
| `/auth` | AuthModule | Login / Register |
| `/account` | AccountModule | User account panel |
| `/admin` | AdminModule | Admin dashboard |

### REST API Reference (Sprint 5)

> **Base URL:** `https://api.practicesoftwaretesting.com`  
> **OpenAPI Spec:** [https://api.practicesoftwaretesting.com/docs?api-docs.json](https://api.practicesoftwaretesting.com/docs?api-docs.json)  
> **Swagger UI:** [https://api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)  
> **Authentication:** JWT Bearer token (obtained via `POST /users/login`); pass in `Authorization: Bearer <token>` header  
> **Search/Filter:** Several endpoints support the HTTP `QUERY` method (RFC 10008) in addition to `GET`

#### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Retrieve all products |
| QUERY | `/products` | Retrieve all products (HTTP QUERY) |
| POST | `/products` | Store new product |
| GET | `/products/search` | Retrieve products matching search query |
| QUERY | `/products/search` | Retrieve products matching search query (HTTP QUERY) |
| GET | `/products/{productId}` | Retrieve specific product |
| PUT | `/products/{productId}` | Update specific product |
| PATCH | `/products/{productId}` | Partially update specific product |
| DELETE | `/products/{productId}` | Delete specific product |
| GET | `/products/{productId}/related` | Retrieve related products |

#### Product Specs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product-specs/names` | Retrieve all distinct spec names with their values |
| GET | `/products/{productId}/specs` | Retrieve specs for a product |
| POST | `/products/{productId}/specs` | Add a spec to a product |
| GET | `/products/{productId}/specs/{specId}` | Retrieve a specific spec |
| PUT | `/products/{productId}/specs/{specId}` | Update a spec |
| DELETE | `/products/{productId}/specs/{specId}` | Delete a spec |

#### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Retrieve all categories |
| POST | `/categories` | Store new category |
| GET | `/categories/search` | Retrieve categories matching search query |
| QUERY | `/categories/search` | Retrieve categories matching search query (HTTP QUERY) |
| GET | `/categories/tree` | Retrieve all categories (including subcategories) |
| QUERY | `/categories/tree` | Retrieve all categories including subcategories (HTTP QUERY) |
| GET | `/categories/tree/{categoryId}` | Retrieve specific category (including subcategories) |
| PUT | `/categories/{categoryId}` | Update specific category |
| PATCH | `/categories/{categoryId}` | Partially update specific category |
| DELETE | `/categories/{categoryId}` | Delete specific category |

#### Brands
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/brands` | Retrieve all brands |
| POST | `/brands` | Store new brand |
| GET | `/brands/search` | Retrieve brands matching search query |
| QUERY | `/brands/search` | Retrieve brands matching search query (HTTP QUERY) |
| GET | `/brands/{brandId}` | Retrieve specific brand |
| PUT | `/brands/{brandId}` | Update specific brand |
| PATCH | `/brands/{brandId}` | Partially update specific brand |
| DELETE | `/brands/{brandId}` | Delete specific brand |

#### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/images` | Retrieve all images |

#### Carts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/carts` | Create a new cart |
| GET | `/carts/{cartId}` | Retrieve specific cart |
| DELETE | `/carts/{cartId}` | Delete cart |
| POST | `/carts/{id}` | Add item to cart |
| PUT | `/carts/{cartId}/product/quantity` | Update quantity of item in cart |
| DELETE | `/carts/{cartId}/product/{productId}` | Delete product from cart |

#### Invoices & Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/invoices` | Retrieve all invoices |
| POST | `/invoices` | Store new invoice (authenticated checkout) |
| POST | `/invoices/guest` | Store new guest invoice |
| GET | `/invoices/search` | Retrieve invoices matching search query |
| QUERY | `/invoices/search` | Retrieve invoices matching search query (HTTP QUERY) |
| GET | `/invoices/{invoiceId}` | Retrieve specific invoice |
| PUT | `/invoices/{invoiceId}` | Update specific invoice |
| PATCH | `/invoices/{invoiceId}` | Partially update specific invoice |
| PUT | `/invoices/{invoiceId}/status` | Update invoice status |
| GET | `/invoices/{invoice_number}/download-pdf` | Download generated PDF of a specific invoice |
| GET | `/invoices/{invoice_number}/download-pdf-status` | Retrieve PDF generation status |

#### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment/check` | Check / pre-validate payment details |

#### Users & Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Store new user |
| POST | `/users/login` | Login customer |
| GET | `/users/logout` | Logout — invalidate the token |
| GET | `/users/me` | Retrieve current customer info |
| GET | `/users/refresh` | Retrieve a refreshed token |
| POST | `/users/change-password` | Change password |
| POST | `/users/forgot-password` | Request a new password |
| GET | `/users` | Retrieve all users |
| GET | `/users/search` | Retrieve users matching search query |
| QUERY | `/users/search` | Retrieve users matching search query (HTTP QUERY) |
| GET | `/users/{userId}` | Retrieve specific user |
| PUT | `/users/{userId}` | Update specific user |
| PATCH | `/users/{userId}` | Partially update specific user |
| DELETE | `/users/{userId}` | Delete specific user |

#### Favorites
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorites` | Retrieve all favorites |
| POST | `/favorites` | Store new favorite |
| GET | `/favorites/{favoriteId}` | Retrieve specific favorite |
| DELETE | `/favorites/{favoriteId}` | Delete specific favorite |

#### Contact Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/messages` | Retrieve messages |
| POST | `/messages` | Send new contact message |
| GET | `/messages/{messageId}` | Retrieve specific message |
| POST | `/messages/{messageId}/attach-file` | Attach file to contact message |
| POST | `/messages/{messageId}/reply` | Reply to contact message |
| PUT | `/messages/{messageId}/status` | Set a new message status |

#### TOTP (Two-Factor Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/totp/setup` | Setup TOTP for the authenticated user |
| POST | `/totp/verify` | Verify TOTP code for the authenticated user |

#### Postcode Lookup
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/postcode-lookup` | Lookup address details by postcode |

#### Reports (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reports/average-sales-per-month` | Get average sales per month |
| GET | `/reports/average-sales-per-week` | Get average sales per week |
| GET | `/reports/customers-by-country` | Get customers by country |
| GET | `/reports/top10-best-selling-categories` | Get top 10 best selling categories |
| GET | `/reports/top10-purchased-products` | Get top 10 purchased products |
| GET | `/reports/total-sales-of-years` | Get total sales of years |
| GET | `/reports/total-sales-per-country` | Get total sales per country |

---

## 7. Environments & Hosted Versions

| Sprint | Application | API | Notes |
|--------|-------------|-----|-------|
| Sprint 1 | [v1.practicesoftwaretesting.com](https://v1.practicesoftwaretesting.com) | api-v1.practicesoftwaretesting.com | Product catalog only |
| Sprint 2 | [v2.practicesoftwaretesting.com](https://v2.practicesoftwaretesting.com) | api-v2.practicesoftwaretesting.com | + Search, filter, sort, pagination |
| Sprint 3 | [v3.practicesoftwaretesting.com](https://v3.practicesoftwaretesting.com) | api-v3.practicesoftwaretesting.com | + Checkout, rentals, GraphQL |
| Sprint 4 | [v4.practicesoftwaretesting.com](https://v4.practicesoftwaretesting.com) | api-v4.practicesoftwaretesting.com | + Auth, accounts, favorites, invoices |
| **Sprint 5** | **[practicesoftwaretesting.com](https://practicesoftwaretesting.com)** | **api.practicesoftwaretesting.com** | **Full platform (current)** |
| Sprint 5 (bugs) | [with-bugs.practicesoftwaretesting.com](https://with-bugs.practicesoftwaretesting.com) | api-with-bugs.practicesoftwaretesting.com | Intentional bugs for testing |
| Sprint 5 (perf) | — | — | Performance degradation variant |

### Mobile App
- Integrated with Sprint 4 environment (shared data with web)
- [Android APK](https://testsmith.ams3.cdn.digitaloceanspaces.com/artifacts/practice-software-testing.apk)
- [iOS Simulator App](https://testsmith.ams3.cdn.digitaloceanspaces.com/artifacts/practice-software-testing.zip)

---

## 8. Feature Evolution by Sprint

| Feature | S1 | S2 | S3 | S4 | S5 |
|---------|:--:|:--:|:--:|:--:|:--:|
| Products / Categories | ✓ | ✓ | ✓ | ✓ | ✓ |
| Search / Filter / Sort | | ✓ | ✓ | ✓ | ✓ |
| Checkout | | | ✓ | ✓ | ✓ |
| Rentals | | | ✓ | ✓ | ✓ |
| User Auth (JWT) | | | | ✓ | ✓ |
| Favorites / Invoices | | | | ✓ | ✓ |
| Login / Register Pages | | | | ✓ | ✓ |
| Shopping Cart | | | | | ✓ |
| Social Login | | | | | ✓ |
| 2FA / TOTP | | | | | ✓ |
| PDF Invoices | | | | | ✓ |
| Multiple Payments | | | | | ✓ |
| Admin Dashboard | | | | | ✓ |
| Chat Widget | | | | | ✓ |
| Multi-language | | | | | ✓ |
| Price Range Filter | | | | | ✓ |
| Geo/Combination Discounts | | | | | ✓ |
| Product Comparison | | | | | ✓ |

---

## 9. Validation & Error Messages Reference

| Scenario | Expected Message / Behavior |
|----------|----------------------------|
| Invalid email format | `"Please enter a valid Email address."` |
| Incorrect password | `"The Password entered is incorrect."` |
| Inactive/non-existent account | `"Account is either inactive or does not exist."` |
| Invalid login credentials | `"Invalid email or password"` |
| Account locked | `"Account locked, too many failed attempts. Please contact the administrator."` (HTTP 423) |
| Account disabled | `"Account disabled."` |
| Duplicate email on registration | `"Email is already in use."` |
| Duplicate favorite | `"Product already in your favorites list."` |
| Unauthorized favorite | `"Unauthorized, can not add product to your favorite list."` |
| Passwords don't match | `"Passwords do not match."` |
| Wrong current password | `"Your current password does not matches with the password."` |
| Same new password | `"New Password cannot be same as your current password."` |
| Expired credit card | `"Expiration date must be in the future."` |
| Invalid gift card format | 422 with validation errors |
| Invalid TOTP | `"Invalid TOTP"` |
| TOTP denied (default accounts) | `"Access denied: If you want to configure TOTP, please create your own account."` |

---

## 10. User Stories & Acceptance Criteria (Sprints 1–5)

> Source: [Practice Software Testing — User Stories](https://testsmith-io.github.io/practice-software-testing/#/user-stories/v1.md)  
> Acceptance criteria are documented per sprint. Later sprints build on earlier ones; criteria listed under each sprint reflect what is introduced or applicable in that release.

### Sprint 1

Sprint 1 delivers the foundation: a basic product catalog with browsing, category pages, and a simple contact form.

---

#### Product Overview

### User Story
As a visitor,
I want to see an overview of all available products,
so that I can browse the catalog and find items of interest.

### Acceptance Criteria

#### AC1 – Product overview is displayed
Given I navigate to the home page  
Then a grid of product cards is displayed showing all products.  

---

#### AC2 – Product card information
Given the product overview is displayed  
Then each product card shows:  
- a product image
- the product name
- the product price

---

#### AC3 – Navigating to product detail
Given the product overview is displayed  
When I click on a product card  
Then I am navigated to the product detail page for that product.  

---

#### Product Detail

### User Story
As a visitor,
I want to view the full details of a product,
so that I can learn more about it before deciding to purchase.

### Acceptance Criteria

#### AC1 – Product detail page is displayed
Given I click on a product from the overview or category page  
Then the product detail page is displayed.  

---

#### AC2 – Product information shown
Given the product detail page is displayed  
Then the following information is shown:  
- product image
- product name
- product description
- product price
- category badge
- brand badge

---

#### AC3 – Related products
Given the product detail page is displayed  
Then a section with related products is shown below the main product information  
And each related product is clickable and navigates to its detail page.  

---

#### Browse Products by Category

### User Story
As a visitor,
I want to browse products within a specific category,
so that I can find products of a particular type.

### Acceptance Criteria

#### AC1 – Category page is displayed
Given I click on a category name  
Then a page with products belonging to that category is displayed.  

---

#### AC2 – Category title
Given the category page is displayed  
Then the category name is shown as the page title.  

---

#### AC3 – Products from selected category
Given the category page is displayed  
Then only products belonging to the selected category are shown.  

---

#### Contact Form

### User Story
As a visitor,
I want to send a message through a contact form,
so that I can reach out for support or other inquiries.

### Acceptance Criteria

#### AC1 – Contact form is accessible
Given I navigate to the contact page  
Then a contact form is displayed.  

---

#### AC2 – Required fields
Given the contact form is displayed  
Then the following fields are shown:  
- First name (required)
- Last name (required)
- Email (required, must be valid format)
- Subject (required, dropdown)
- Message (required, minimum 50 characters)

---

#### AC3 – Subject options
Given the subject dropdown is displayed  
Then it includes the following options:  
- Customer service
- Webmaster
- Return
- Payments
- Warranty
- Status of order

---

#### AC4 – Message minimum length
Given I enter a message with fewer than 50 characters  
Then a validation error is shown indicating the message must be at least 50 characters.  

---

#### AC5 – Successful submission
Given all required fields are filled in with valid data  
When I submit the contact form  
Then a confirmation message is displayed  
And the form is hidden.

---

### Sprint 2

Sprint 2 adds pagination, search, filtering, and sorting to the product overview and category pages. The contact form remains unchanged.

---

#### Product Overview

### User Story
As a visitor,
I want to browse a paginated overview of all products with the ability to search, filter, and sort,
so that I can efficiently find products of interest.

### Acceptance Criteria

#### AC1 – Product grid is displayed
Given I navigate to the home page  
Then a grid of product cards is displayed  
And each card shows a product image, name, and price.  

---

#### AC2 – Navigating to product detail
Given the product overview is displayed  
When I click on a product card  
Then I am navigated to the product detail page.  

---

### Pagination

#### AC3 – Pagination controls displayed
Given there are more products than fit on one page  
Then pagination controls are displayed below the product grid.  

---

#### AC4 – Page navigation
Given pagination controls are displayed  
When I click a page number  
Then the product grid updates to show products for that page  
And the current page number is visually highlighted.  

---

### Search

#### AC5 – Search input is displayed
Given I am on the product overview page  
Then a search input field is displayed.  

---

#### AC6 – Minimum search length
Given I enter fewer than 3 characters in the search field  
When I submit the search  
Then the search is not executed and a validation error is shown.  

---

#### AC7 – Maximum search length
Given I am entering a search query  
Then the search input accepts a maximum of 40 characters.  

---

#### AC8 – Search results displayed
Given I enter a valid search query (3–40 characters)  
When I submit the search  
Then the product grid updates to show only matching products.  

---

#### AC9 – Search resets filters
Given I have active filters (category, brand, sorting)  
When I submit a search query  
Then all active filters are reset to their defaults.  

---

### Filtering by Category

#### AC10 – Category filter is displayed
Given I am on the product overview page  
Then a list of category checkboxes is displayed in the sidebar.  

---

#### AC11 – Hierarchical categories
Given the category filter is displayed  
Then categories are shown in a tree structure with parent and child categories.  

---

#### AC12 – Selecting a parent category
Given a parent category has child categories  
When I check the parent category checkbox  
Then all child category checkboxes are also checked  
And the product grid updates to show products from all those categories.  

---

#### AC13 – Deselecting child categories
Given all child categories of a parent are checked  
When I uncheck all child category checkboxes  
Then the parent category checkbox is also unchecked.  

---

### Filtering by Brand

#### AC14 – Brand filter is displayed
Given I am on the product overview page  
Then a list of brand checkboxes is displayed in the sidebar.  

---

#### AC15 – Selecting a brand
Given the brand filter is displayed  
When I check one or more brand checkboxes  
Then the product grid updates to show only products from the selected brands.  

---

#### AC16 – Combining filters
Given I have selected one or more categories  
When I also select one or more brands  
Then the product grid shows only products matching both the selected categories and brands.  

---

### Sorting

#### AC17 – Sort dropdown is displayed
Given I am on the product overview page  
Then a sorting dropdown is displayed.  

---

#### AC18 – Sort options
Given the sort dropdown is displayed  
Then it includes the following options:  
- Name (A - Z)
- Name (Z - A)
- Price (High - Low)
- Price (Low - High)

---

#### AC19 – Applying a sort
Given I select a sort option  
Then the product grid reloads with products ordered according to the selected sort.  

---

#### Product Detail

### User Story
As a visitor,
I want to view the full details of a product,
so that I can learn more about it.

### Acceptance Criteria

#### AC1 – Product information shown
Given I am on the product detail page  
Then the following information is shown:  
- product image
- product name
- product description
- product price
- category badge
- brand badge

---

#### AC2 – Related products
Given the product detail page is displayed  
Then a section with related products is shown below the main product information  
And each related product is clickable and navigates to its detail page.  

---

#### Browse Products by Category

### User Story
As a visitor,
I want to browse products within a specific category with filtering, sorting, and pagination,
so that I can find specific products within a category.

### Acceptance Criteria

#### AC1 – Category page is displayed
Given I click on a category name  
Then a page with products belonging to that category is displayed  
And the category name is shown as the page title.  

---

#### AC2 – Filters available
Given the category page is displayed  
Then the same filters as the product overview are available:  
- category checkboxes (subcategory tree)
- brand checkboxes
- sorting dropdown
- pagination controls

---

#### Contact Form

### User Story
As a visitor,
I want to send a message through a contact form,
so that I can reach out for support or other inquiries.

### Acceptance Criteria

#### AC1 – Contact form is accessible
Given I navigate to the contact page  
Then a contact form is displayed.  

---

#### AC2 – Required fields
Given the contact form is displayed  
Then the following fields are shown:  
- First name (required)
- Last name (required)
- Email (required, must be valid format)
- Subject (required, dropdown)
- Message (required, minimum 50 characters)

---

#### AC3 – Subject options
Given the subject dropdown is displayed  
Then it includes the following options:  
- Customer service
- Webmaster
- Return
- Payments
- Warranty
- Status of order

---

#### AC4 – Message minimum length
Given I enter a message with fewer than 50 characters  
Then a validation error is shown indicating the message must be at least 50 characters.  

---

#### AC5 – Successful submission
Given all required fields are filled in with valid data  
When I submit the contact form  
Then a confirmation message is displayed  
And the form is hidden.

---

### Sprint 3

Sprint 3 adds a checkout flow (cart review, billing address, basic payment), a rentals page, and product-to-cart functionality on the detail page. All Sprint 2 features carry forward.

---

#### Product Overview

### User Story
As a visitor,
I want to browse a paginated overview of all products with search, filtering, and sorting,
so that I can efficiently find products of interest.

### Acceptance Criteria

#### AC1 – Product grid is displayed
Given I navigate to the home page  
Then a grid of product cards is displayed  
And each card shows a product image, name, and price.  

---

#### AC2 – Navigating to product detail
Given the product overview is displayed  
When I click on a product card  
Then I am navigated to the product detail page.  

---

#### AC3 – Pagination
Given there are more products than fit on one page  
Then pagination controls are displayed below the product grid  
And clicking a page number updates the grid.  

---

#### AC4 – Search
Given I enter a valid search query (3–40 characters) and submit  
Then the product grid updates to show only matching products  
And all active filters are reset.  

---

#### AC5 – Category filter
Given I check one or more category checkboxes in the sidebar  
Then the product grid updates to show only products from those categories.  

---

#### AC6 – Brand filter
Given I check one or more brand checkboxes in the sidebar  
Then the product grid updates to show only products from those brands.  

---

#### AC7 – Sorting
Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High)  
Then the product grid reloads with products ordered accordingly.  

---

#### Product Detail

### User Story
As a visitor,
I want to view a product's details and add it to my shopping cart,
so that I can purchase the product.

### Acceptance Criteria

#### AC1 – Product information shown
Given I am on the product detail page  
Then the product image, name, description, price, category badge, and brand badge are shown.  

---

#### AC2 – Quantity selector
Given the product is in stock  
Then a quantity input field is displayed with plus (+) and minus (-) buttons  
And the default quantity is 1.  

---

#### AC3 – Increase quantity
Given the quantity input is displayed  
When I click the plus button  
Then the quantity increases by 1.  

---

#### AC4 – Decrease quantity
Given the quantity is greater than 1  
When I click the minus button  
Then the quantity decreases by 1.  

---

#### AC5 – Minimum quantity
Given the quantity is 1  
When I click the minus button  
Then the quantity remains at 1.  

---

#### AC6 – Manual quantity entry
Given the quantity input is displayed  
When I type a number directly into the input field  
Then the quantity is updated to the entered value  
And the value is clamped between 1 and 999,999,999.  

---

#### AC7 – Add to cart
Given a valid quantity is selected  
When I click the "Add to Cart" button  
Then the product is added to the cart with the selected quantity  
And a success message "Product added to shopping cart." is displayed.  

---

#### AC8 – Out of stock
Given the product is not in stock and is not a rental item  
Then the "Add to Cart" button is disabled  
And "Out of stock" is shown in red.  

---

#### AC9 – Related products
Given the product detail page is displayed  
Then related products are shown below the main information.  

---

#### Rental Products

### User Story
As a visitor,
I want to browse products available for rent,
so that I can find tools I can rent by the hour.

### Acceptance Criteria

#### AC1 – Rentals page is accessible
Given I navigate to the rentals page  
Then a list of all rental products is displayed.  

---

#### AC2 – Rental product display
Given the rentals page is displayed  
Then each rental product shows a product image, name, and description.  

---

#### AC3 – Rental detail page
Given I click on a rental product  
Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons  
And the total price is calculated as the hourly rate multiplied by the selected duration.  

---

#### AC4 – Rental label in checkout
Given a rental item is in my cart  
Then the item is marked with "This is a rental item" in the checkout cart.  

---

#### Checkout – Cart Review

### User Story
As a customer,
I want to review the items in my shopping cart,
so that I can verify my order is correct before proceeding.

### Acceptance Criteria

#### AC1 – Cart contents displayed
Given I have items in my cart  
When I navigate to the checkout page  
Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions.  

---

#### AC2 – Update quantity
Given I change the quantity of a cart item  
Then the item total and cart total are recalculated  
And a confirmation message is displayed.  

---

#### AC3 – Delete item
Given I click the delete button on a cart item  
Then the item is removed from the cart  
And the cart total is recalculated.  

---

#### AC4 – Empty cart
Given I have no items in my cart  
Then the message "Your shopping cart is empty" is displayed.  

---

#### AC5 – Proceed
Given the cart contains at least one item  
When I click "Proceed"  
Then I advance to the next checkout step.  

---

#### Checkout – Billing Address

### User Story
As a customer,
I want to enter my billing address,
so that my invoice contains the correct address.

### Acceptance Criteria

#### AC1 – Address form fields
Given I am on the billing address step  
Then the following required fields are displayed:  
- Street (max 70 characters)
- City (max 40 characters)
- State (max 40 characters)
- Country (max 40 characters)
- Postal code (max 10 characters)

---

#### AC2 – Validation
Given I leave a required field empty  
Then the field is highlighted as invalid  
And the "Proceed" button is disabled.  

---

#### AC3 – Proceed to payment
Given all address fields are filled in  
When I click "Proceed"  
Then I advance to the payment step.  

---

#### Checkout – Payment (Basic)

### User Story
As a customer,
I want to select a payment method and provide basic payment details,
so that I can complete my purchase.

### Acceptance Criteria

#### AC1 – Payment method selection
Given I am on the payment step  
Then a dropdown is displayed with options:  
- Bank Transfer
- Cash on Delivery
- Credit Card
- Buy Now Pay Later
- Gift Card

---

#### AC2 – Payment fields
Given I select a payment method  
Then account name and account number fields are displayed.  

---

#### AC3 – Successful order
Given I have selected a payment method and filled in the fields  
When I click the confirm button  
Then the order is placed  
And a confirmation message with the invoice number is displayed  
And the cart is cleared.  

---

#### Browse Products by Category

### User Story
As a visitor,
I want to browse products within a specific category with filtering, sorting, and pagination,
so that I can find specific products within a category.

### Acceptance Criteria

#### AC1 – Category page is displayed
Given I click on a category name  
Then a page with products belonging to that category is displayed  
And the category name is shown as the page title.  

---

#### AC2 – Filters available
Given the category page is displayed  
Then the same filters as the product overview are available:  
- category checkboxes (subcategory tree)
- brand checkboxes
- sorting dropdown
- pagination controls

---

#### Contact Form

### User Story
As a visitor,
I want to send a message through a contact form,
so that I can reach out for support or other inquiries.

### Acceptance Criteria

#### AC1 – Contact form is accessible
Given I navigate to the contact page  
Then a contact form is displayed.  

---

#### AC2 – Required fields
Given the contact form is displayed  
Then the following fields are shown:  
- First name (required)
- Last name (required)
- Email (required, must be valid format)
- Subject (required, dropdown)
- Message (required, minimum 50 characters)

---

#### AC3 – Subject options
Given the subject dropdown is displayed  
Then it includes the following options:  
- Customer service
- Webmaster
- Return
- Payments
- Warranty
- Status of order

---

#### AC4 – Message minimum length
Given I enter a message with fewer than 50 characters  
Then a validation error is shown indicating the message must be at least 50 characters.  

---

#### AC5 – Successful submission
Given all required fields are filled in with valid data  
When I submit the contact form  
Then a confirmation message is displayed  
And the form is hidden.

---

### Sprint 4

Sprint 4 adds user authentication (login, register, forgot password), a protected customer account area (profile, favorites, invoices, messages), and sorting. All Sprint 3 features carry forward.

---

#### Product Overview

### User Story
As a visitor,
I want to browse a paginated overview of all products with search, filtering, and sorting,
so that I can efficiently find products of interest.

### Acceptance Criteria

#### AC1 – Product grid is displayed
Given I navigate to the home page  
Then a grid of product cards is displayed  
And each card shows a product image, name, and price.  

---

#### AC2 – Navigating to product detail
Given the product overview is displayed  
When I click on a product card  
Then I am navigated to the product detail page.  

---

#### AC3 – Pagination
Given there are more products than fit on one page  
Then pagination controls are displayed below the product grid  
And clicking a page number updates the grid.  

---

#### AC4 – Search
Given I enter a valid search query (3–40 characters) and submit  
Then the product grid updates to show only matching products  
And all active filters are reset.  

---

#### AC5 – Category filter
Given I check one or more category checkboxes in the sidebar  
Then the product grid updates to show only products from those categories.  

---

#### AC6 – Brand filter
Given I check one or more brand checkboxes in the sidebar  
Then the product grid updates to show only products from those brands.  

---

#### AC7 – Sorting
Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High)  
Then the product grid reloads with products ordered accordingly.  

---

#### Product Detail

### User Story
As a visitor,
I want to view a product's details, add it to my cart, or save it to my favorites,
so that I can purchase it or come back to it later.

### Acceptance Criteria

#### AC1 – Product information shown
Given I am on the product detail page  
Then the product image, name, description, price, category badge, and brand badge are shown.  

---

#### AC2 – Quantity selector
Given the product is in stock  
Then a quantity input field is displayed with plus (+) and minus (-) buttons  
And the default quantity is 1.  

---

#### AC3 – Increase quantity
Given the quantity input is displayed  
When I click the plus button  
Then the quantity increases by 1.  

---

#### AC4 – Decrease quantity
Given the quantity is greater than 1  
When I click the minus button  
Then the quantity decreases by 1.  

---

#### AC5 – Minimum quantity
Given the quantity is 1  
When I click the minus button  
Then the quantity remains at 1.  

---

#### AC6 – Manual quantity entry
Given the quantity input is displayed  
When I type a number directly into the input field  
Then the quantity is updated to the entered value  
And the value is clamped between 1 and 999,999,999.  

---

#### AC7 – Add to cart
Given a valid quantity is selected  
When I click the "Add to Cart" button  
Then the product is added to the cart with the selected quantity  
And a success message "Product added to shopping cart." is displayed.  

---

#### AC8 – Out of stock
Given the product is not in stock and is not a rental item  
Then the "Add to Cart" button is disabled  
And "Out of stock" is shown in red.  

---

#### AC9 – Related products
Given the product detail page is displayed  
Then related products are shown below the main information.  

---

#### AC10 – Add to Favorites button
Given I am on the product detail page  
Then an "Add to Favorites" button is displayed.  

---

#### AC11 – Adding a favorite
Given I am logged in  
When I click "Add to Favorites"  
Then a success message "Product added to your favorites list." is displayed.  

---

#### AC12 – Duplicate favorite
Given the product is already in my favorites  
When I click "Add to Favorites"  
Then the message "Product already in your favorites list." is displayed.  

---

#### AC13 – Not logged in
Given I am not logged in  
When I click "Add to Favorites"  
Then the message "Unauthorized, can not add product to your favorite list." is displayed.  

---

#### Rental Products

### User Story
As a visitor,
I want to browse products available for rent,
so that I can find tools I can rent by the hour.

### Acceptance Criteria

#### AC1 – Rentals page is accessible
Given I navigate to the rentals page  
Then a list of all rental products is displayed.  

---

#### AC2 – Rental product display
Given the rentals page is displayed  
Then each rental product shows a product image, name, and description.  

---

#### AC3 – Rental detail page
Given I click on a rental product  
Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons  
And the total price is calculated as the hourly rate multiplied by the selected duration.  

---

#### AC4 – Rental label in checkout
Given a rental item is in my cart  
Then the item is marked with "This is a rental item" in the checkout cart.  

---

#### Checkout – Cart Review

### User Story
As a customer,
I want to review the items in my shopping cart,
so that I can verify my order is correct before proceeding.

### Acceptance Criteria

#### AC1 – Cart contents displayed
Given I have items in my cart  
When I navigate to the checkout page  
Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions.  

---

#### AC2 – Update quantity
Given I change the quantity of a cart item  
Then the item total and cart total are recalculated  
And a confirmation message is displayed.  

---

#### AC3 – Delete item
Given I click the delete button on a cart item  
Then the item is removed from the cart  
And the cart total is recalculated.  

---

#### AC4 – Empty cart
Given I have no items in my cart  
Then the message "Your shopping cart is empty" is displayed.  

---

#### AC5 – Proceed
Given the cart contains at least one item  
When I click "Proceed"  
Then I advance to the next checkout step.  

---

#### Checkout – Sign In

### User Story
As a user who is not logged in,
I want the possibility to log in during the checkout workflow,
so that I can complete my purchase without leaving the checkout.

### Acceptance Criteria

#### AC1 – Login step displayed for guests
Given I am not logged in  
And I am on the checkout page  
When I click "Proceed to Checkout" from the cart step  
Then a login form is displayed as the next step in the checkout wizard.  

---

#### AC2 – Login form fields
Given the checkout login step is displayed  
Then email and password fields are shown  
And a submit button is available.  

---

#### AC3 – Successful login during checkout
Given I enter valid credentials on the checkout login step  
When I submit the form  
Then I am authenticated  
And I can proceed to the billing address step.  

---

#### AC4 – Already logged in
Given I am already logged in  
When I reach the checkout login step  
Then a message "You are already signed in as [First Name] [Last Name]" is displayed  
And I can proceed directly to the billing address step.  

---

#### Checkout – Billing Address

### User Story
As a customer,
I want to enter my billing address,
so that my invoice contains the correct address.

### Acceptance Criteria

#### AC1 – Address form fields
Given I am on the billing address step  
Then the following required fields are displayed:  
- Street (max 70 characters)
- City (max 40 characters)
- State (max 40 characters)
- Country (max 40 characters)
- Postal code (max 10 characters)

---

#### AC2 – Validation
Given I leave a required field empty  
Then the field is highlighted as invalid  
And the "Proceed" button is disabled.  

---

#### AC3 – Proceed to payment
Given all address fields are filled in  
When I click "Proceed"  
Then I advance to the payment step.  

---

#### Checkout – Payment (Basic)

### User Story
As a customer,
I want to select a payment method and provide basic payment details,
so that I can complete my purchase.

### Acceptance Criteria

#### AC1 – Payment method selection
Given I am on the payment step  
Then a dropdown is displayed with options:  
- Bank Transfer
- Cash on Delivery
- Credit Card
- Buy Now Pay Later
- Gift Card

---

#### AC2 – Payment fields
Given I select a payment method  
Then account name and account number fields are displayed.  

---

#### AC3 – Successful order
Given I have selected a payment method and filled in the fields  
When I click the confirm button  
Then the order is placed  
And a confirmation message with the invoice number is displayed  
And the cart is cleared.  

---

#### User Registration

### User Story
As a new visitor,
I want to create an account by providing my personal details,
so that I can log in and access features like checkout, favorites, and my account.

### Acceptance Criteria

#### AC1 – Registration page is accessible
Given I am not logged in  
When I navigate to the registration page  
Then a registration form is displayed.  

---

#### AC2 – Required fields
Given the registration form is displayed  
Then the following required fields are shown:  
- First name
- Last name
- Date of birth
- Address
- Postcode (exactly 5 digits)
- City
- State
- Country
- Phone
- Email
- Password

---

#### AC3 – Email validation
Given I enter an email address  
Then it must match a valid format (letters, numbers, dots, underscores, percent, plus, hyphen before @).  

---

#### AC4 – Password requirements
Given I enter a password  
Then it must be at least 6 characters long  
And no more than 40 characters.  

---

#### AC5 – Duplicate email
Given I submit the form with an email that is already registered  
Then the error message "Email is already in use." is displayed.  

---

#### AC6 – Successful registration
Given all fields are filled in with valid data  
When I submit the form  
Then the account is created  
And I am redirected to the login page.  

---

#### User Login

### User Story
As a registered user,
I want to log in with my email and password,
so that I can access my account, favorites, invoices, and other authenticated features.

### Acceptance Criteria

#### AC1 – Login form
Given I navigate to the login page  
Then a form with email and password fields is displayed.  

---

#### AC2 – Email validation
Given I am on the login page  
Then the email field is required and must contain a valid email format.  

---

#### AC3 – Password validation
Given I am on the login page  
Then the password field is required.  

---

#### AC4 – Successful login
Given I enter valid credentials  
When I submit the login form  
Then I am authenticated and redirected to my account dashboard.  

---

#### AC5 – Invalid credentials
Given I enter an incorrect email or password  
When I submit the form  
Then the error message "Invalid email or password" is displayed.  

---

#### Forgot Password

### User Story
As a registered user who has forgotten their password,
I want to request a password reset by providing my email,
so that I can regain access to my account.

### Acceptance Criteria

#### AC1 – Forgot password form
Given I click "Forgot password" on the login page  
Then a form with an email input is displayed.  

---

#### AC2 – Email validation
Given I enter an email address  
Then it must be in a valid format.  

---

#### AC3 – Successful reset
Given I enter a registered email  
When I submit the form  
Then a confirmation message is displayed and fades out after 3 seconds.  

---

#### AC4 – Non-existent email
Given I enter an unregistered email  
When I submit the form  
Then an error message is displayed.  

---

#### Customer Profile

### User Story
As an authenticated user,
I want to view and update my personal information,
so that my account details are accurate.

### Acceptance Criteria

#### AC1 – Profile page is accessible
Given I am logged in  
When I navigate to my profile page  
Then my current profile information is displayed.  

---

#### AC2 – Editable fields
Given the profile page is displayed  
Then I can edit: first name, last name, phone, and address fields.  

---

#### AC3 – Read-only email
Given the profile page is displayed  
Then the email field is not editable.  

---

#### AC4 – Successful update
Given I modify profile fields with valid data  
When I save  
Then a success message is displayed.  

---

#### Change Password

### User Story
As an authenticated user,
I want to change my password,
so that I can keep my account secure.

### Acceptance Criteria

#### AC1 – Change password form
Given I am on my profile page  
Then a change password section is displayed with:  
- Current password (required)
- New password (required)
- Confirm new password (required)

---

#### AC2 – Current password verification
Given I enter an incorrect current password  
When I submit the form  
Then the error "Your current password does not matches with the password." is displayed.  

---

#### AC3 – New password must differ
Given I enter a new password identical to the current one  
When I submit the form  
Then the error "New Password cannot be same as your current password." is displayed.  

---

#### AC4 – Passwords must match
Given the new password and confirmation do not match  
Then the error "Passwords do not match." is displayed.  

---

#### AC5 – Successful change
Given I provide a valid current password and a new password that matches the confirmation  
When I submit the form  
Then a success message is displayed  
And I am logged out after 5 seconds.  

---

#### Favorites

### User Story
As an authenticated user,
I want to view and manage my list of favorite products,
so that I can quickly access products I'm interested in.

### Acceptance Criteria

#### AC1 – Favorites page
Given I am logged in  
When I navigate to my favorites page  
Then a list of my favorite products is displayed showing image, name, and description (truncated to 250 characters).  

---

#### AC2 – Empty favorites
Given I have no favorites  
Then a message indicating no favorites is displayed.  

---

#### AC3 – Remove a favorite
Given the favorites list is displayed  
When I click the delete button on a favorite  
Then the product is removed and the list refreshes.  

---

#### Invoices

### User Story
As an authenticated user,
I want to view my past orders,
so that I can track my purchases.

### Acceptance Criteria

#### AC1 – Invoice list
Given I am logged in  
When I navigate to my invoices page  
Then a paginated table is displayed with columns: invoice number, billing street, invoice date, total, and a details link.  

---

#### AC2 – Invoice detail
Given I click on an invoice  
Then the detail page shows:  
- invoice number, date, and total
- billing address (street, postal code, city, state, country)
- payment method and details
- product line items (quantity, name, price, line total)

---

#### AC3 – Non-existent invoice
Given the invoice does not exist or does not belong to me  
Then a "not found" message is displayed.  

---

#### Messages

### User Story
As an authenticated user,
I want to view my contact messages and reply to them,
so that I can follow up on my inquiries.

### Acceptance Criteria

#### AC1 – Messages list
Given I am logged in  
When I navigate to my messages page  
Then a paginated table is displayed with columns: subject, message (truncated to 50 chars), status badge (NEW / IN_PROGRESS / RESOLVED), date, and a details link.  

---

#### AC2 – Message detail
Given I click on a message  
Then the original message is displayed (sender, subject, status, full text, timestamp)  
And any replies are listed chronologically below.  

---

#### AC3 – Reply to message
Given I am on the message detail page  
When I enter a reply and submit  
Then the reply is added and the replies list is updated.  

---

#### Browse Products by Category

### User Story
As a visitor,
I want to browse products within a specific category with filtering, sorting, and pagination,
so that I can find specific products within a category.

### Acceptance Criteria

#### AC1 – Category page is displayed
Given I click on a category name  
Then a page with products belonging to that category is displayed  
And the category name is shown as the page title.  

---

#### AC2 – Filters available
Given the category page is displayed  
Then the same filters as the product overview are available:  
- category checkboxes (subcategory tree)
- brand checkboxes
- sorting dropdown
- pagination controls

---

#### Contact Form

### User Story
As a visitor,
I want to send a message through a contact form,
so that I can reach out for support or other inquiries.

### Acceptance Criteria

#### AC1 – Contact form is accessible
Given I navigate to the contact page  
Then a contact form is displayed.  

---

#### AC2 – Required fields
Given the contact form is displayed  
Then the following fields are shown:  
- First name (required)
- Last name (required)
- Email (required, must be valid format)
- Subject (required, dropdown)
- Message (required, minimum 50 characters)

---

#### AC3 – Subject options
Given the subject dropdown is displayed  
Then it includes the following options:  
- Customer service
- Webmaster
- Return
- Payments
- Warranty
- Status of order

---

#### AC4 – Message minimum length
Given I enter a message with fewer than 50 characters  
Then a validation error is shown indicating the message must be at least 50 characters.  

---

#### AC5 – Successful submission
Given all required fields are filled in with valid data  
When I submit the contact form  
Then a confirmation message is displayed  
And the form is hidden.

---

### Sprint 5

Sprint 5 is the full production version. It adds a shopping cart with server-side persistence, advanced payment methods, a password strength indicator, account locking, two-factor authentication, social login, PDF invoices, an admin dashboard, a chat widget, discounts, multi-language support, a price range filter, and a privacy policy page. All Sprint 4 features carry forward with enhancements.

---

#### Product Overview

### User Story
As a visitor,
I want to browse a paginated overview of all products with search, filtering, sorting, and a price range slider,
so that I can efficiently find products within my preferences and budget.

### Acceptance Criteria

#### AC1 – Product grid is displayed
Given I navigate to the home page  
Then a grid of product cards is displayed  
And each card shows a product image, name, and price.  

---

#### AC2 – Navigating to product detail
Given the product overview is displayed  
When I click on a product card  
Then I am navigated to the product detail page.  

---

#### AC3 – Pagination
Given there are more products than fit on one page  
Then pagination controls are displayed below the product grid  
And clicking a page number updates the grid.  

---

#### AC4 – Search
Given I enter a valid search query (3–40 characters) and submit  
Then the product grid updates to show only matching products  
And all active filters are reset.  

---

#### AC5 – Category filter
Given I check one or more category checkboxes in the sidebar  
Then the product grid updates to show only products from those categories.  

---

#### AC6 – Hierarchical category selection
Given a parent category has child categories  
When I check the parent category checkbox  
Then all child category checkboxes are also checked  
And unchecking all children unchecks the parent.  

---

#### AC7 – Brand filter
Given I check one or more brand checkboxes in the sidebar  
Then the product grid updates to show only products from those brands.  

---

#### AC8 – Combining filters
Given I have selected categories and brands  
Then the product grid shows only products matching both filters.  

---

#### AC9 – Sorting
Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High)  
Then the product grid reloads with products ordered accordingly.  

---

#### AC10 – Price range slider
Given I am on the product overview page  
Then a price range slider is displayed in the sidebar with a default range of $1 to $100 and a maximum of $200.  

---

#### AC11 – Adjusting the price range
Given I drag the slider handles to a new minimum and maximum  
Then the product grid updates to show only products within the selected price range.  

---

#### AC12 – Discount price display
Given a product has a discount (location-based or otherwise)  
Then the product card shows the original price with a strikethrough and the discounted price below.  

---

#### AC13 – Out of stock indicator
Given a product has no stock available  
Then "Out of stock" is displayed on the product card.  

---

#### Product Detail

### User Story
As a visitor,
I want to view a product's details, add it to my cart, or save it to my favorites,
so that I can purchase it or come back to it later.

### Acceptance Criteria

#### AC1 – Product information shown
Given I am on the product detail page  
Then the product image, name, description, price, category badge, and brand badge are shown.  

---

#### AC2 – Discount price display
Given the product has a discount  
Then the original price is shown with a strikethrough  
And the discounted price and discount percentage badge are displayed.  

---

#### AC3 – Quantity selector
Given the product is in stock  
Then a quantity input field is displayed with plus (+) and minus (-) buttons  
And the default quantity is 1.  

---

#### AC4 – Increase quantity
Given the quantity input is displayed  
When I click the plus button  
Then the quantity increases by 1.  

---

#### AC5 – Decrease quantity
Given the quantity is greater than 1  
When I click the minus button  
Then the quantity decreases by 1.  

---

#### AC6 – Minimum quantity
Given the quantity is 1  
When I click the minus button  
Then the quantity remains at 1.  

---

#### AC7 – Manual quantity entry
Given the quantity input is displayed  
When I type a number directly into the input field  
Then the quantity is updated to the entered value  
And the value is clamped between 1 and 999,999,999.  

---

#### AC8 – Add to cart
Given a valid quantity is selected  
When I click the "Add to Cart" button  
Then the product is added to the cart with the selected quantity  
And a success message "Product added to shopping cart." is displayed.  

---

#### AC9 – Out of stock
Given the product is not in stock and is not a rental item  
Then the "Add to Cart" button is disabled  
And "Out of stock" is shown in red.  

---

#### AC10 – Rental duration slider
Given the product is a rental item  
Then a duration slider (1–10 hours) is shown instead of plus/minus buttons  
And the total price is calculated as hourly rate multiplied by duration.  

---

#### AC11 – Add to Favorites
Given I am logged in  
When I click "Add to Favorites"  
Then a success message "Product added to your favorites list." is displayed.  

---

#### AC12 – Duplicate favorite
Given the product is already in my favorites  
When I click "Add to Favorites"  
Then the message "Product already in your favorites list." is displayed.  

---

#### AC13 – Not logged in
Given I am not logged in  
When I click "Add to Favorites"  
Then the message "Unauthorized, can not add product to your favorite list." is displayed.  

---

#### AC14 – Related products
Given the product detail page is displayed  
Then related products are shown below the main information.  

---

#### Rental Products

### User Story
As a visitor,
I want to browse products available for rent,
so that I can find tools I can rent by the hour.

### Acceptance Criteria

#### AC1 – Rentals page is accessible
Given I navigate to the rentals page  
Then a list of all rental products is displayed.  

---

#### AC2 – Rental product display
Given the rentals page is displayed  
Then each rental product shows a product image, name, and description.  

---

#### AC3 – Rental detail page
Given I click on a rental product  
Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons  
And the total price is calculated as the hourly rate multiplied by the selected duration.  

---

#### AC4 – Rental label in checkout
Given a rental item is in my cart  
Then the item is marked with "This is a rental item" in the checkout cart.  

---

#### AC5 – Location-based discount on rentals
Given a rental product is marked as a location offer  
And my location matches a supported city  
Then the location discount is applied to the rental price.  

---

#### Checkout – Cart Review

### User Story
As a customer,
I want to review the items in my cart, including any applied discounts,
so that I can verify my order is correct.

### Acceptance Criteria

#### AC1 – Cart contents displayed
Given I have items in my cart  
When I navigate to the checkout page  
Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions.  

---

#### AC2 – Update quantity
Given I change the quantity of a cart item  
Then the item total and cart total are recalculated  
And a confirmation message "Product quantity updated." is displayed.  

---

#### AC3 – Delete item
Given I click the delete button on a cart item  
Then the item is removed from the cart  
And the cart total is recalculated.  

---

#### AC4 – Empty cart
Given I have no items in my cart  
Then the message "Your shopping cart is empty" is displayed.  

---

#### AC5 – Proceed
Given the cart contains at least one item  
When I click "Proceed"  
Then I advance to the next checkout step.  

---

#### AC6 – Discount badge on items
Given a cart item has a discount  
Then a discount badge is shown next to the product name  
And both the original and discounted price are displayed.  

---

#### AC7 – Combined product discount
Given the cart contains both rental and non-rental items  
Then a 15% additional discount is applied to the cart subtotal  
And the cart shows the subtotal, discount amount, and final total.  

---

#### AC8 – Combined discount removed
Given I remove all rental or all non-rental items  
Then the 15% combined discount is removed  
And the total reverts to the regular subtotal.  

---

#### Checkout – Sign In

### User Story
As a user who is not logged in,
I want the possibility to log in during the checkout workflow,
so that I can complete my purchase without leaving the checkout.

### Acceptance Criteria

#### AC1 – Login step displayed for guests
Given I am not logged in  
And I am on the checkout page  
When I click "Proceed to Checkout" from the cart step  
Then a login form is displayed as the next step in the checkout wizard.  

---

#### AC2 – Login form fields
Given the checkout login step is displayed  
Then email and password fields are shown  
And a submit button is available.  

---

#### AC3 – TOTP support during checkout login
Given I have TOTP enabled on my account  
When I submit valid email and password on the checkout login step  
Then a 6-digit TOTP input field is displayed  
And I must enter a valid TOTP code to proceed.  

---

#### AC4 – Successful login during checkout
Given I enter valid credentials on the checkout login step  
When I submit the form  
Then I am authenticated  
And I can proceed to the billing address step.  

---

#### AC5 – Already logged in
Given I am already logged in  
When I reach the checkout login step  
Then a message "You are already signed in as [First Name] [Last Name]" is displayed  
And I can proceed directly to the billing address step.  

---

#### Checkout – Billing Address

### User Story
As a customer,
I want to enter my billing address, pre-filled from my account if logged in,
so that my invoice is accurate.

### Acceptance Criteria

#### AC1 – Address form fields
Given I am on the billing address step  
Then the following required fields are displayed:  
- Street (max 70 characters)
- City (max 40 characters)
- State (max 40 characters)
- Country (max 40 characters)
- Postal code (max 10 characters)

---

#### AC2 – Validation
Given I leave a required field empty  
Then the field is highlighted as invalid  
And the "Proceed" button is disabled.  

---

#### AC3 – Proceed to payment
Given all address fields are filled in  
When I click "Proceed"  
Then I advance to the payment step.  

---

#### AC4 – Pre-fill for logged-in users
Given I am logged in  
Then the address fields are pre-filled with my account address details.  

---

#### Checkout – Payment (Advanced)

### User Story
As a customer,
I want to provide payment details specific to my chosen payment method,
so that my payment is processed correctly.

### Acceptance Criteria

#### AC1 – Payment method selection
Given I am on the payment step  
Then a dropdown is displayed with options:  
- Bank Transfer
- Cash on Delivery
- Credit Card
- Buy Now Pay Later
- Gift Card

---

#### AC2 – Bank Transfer fields
Given I select "Bank Transfer"  
Then these fields are displayed:  
- Bank name (required, letters and spaces only)
- Account name (required, alphanumeric with spaces, periods, apostrophes, hyphens)
- Account number (required, digits only)

---

#### AC3 – Credit Card fields
Given I select "Credit Card"  
Then these fields are displayed:  
- Card number (format: XXXX-XXXX-XXXX-XXXX)
- Expiration date (format: MM/YYYY, must be a future date)
- CVV (3 or 4 digits)
- Card holder name (letters and spaces only)

---

#### AC4 – Credit Card expiration validation
Given I enter an expiration date in the past  
Then the error "Expiration date must be in the future." is displayed.  

---

#### AC5 – Buy Now Pay Later
Given I select "Buy Now Pay Later"  
Then a "Monthly installments" dropdown is displayed with options: 3, 6, 9, 12.  

---

#### AC6 – Gift Card fields
Given I select "Gift Card"  
Then these fields are displayed:  
- Gift card number (required, alphanumeric)
- Validation code (required, alphanumeric)

---

#### AC7 – Cash on Delivery
Given I select "Cash on Delivery"  
Then no additional fields are required.  

---

#### AC8 – Payment method change resets form
Given I switch to a different payment method  
Then the form resets and shows the new method's fields.  

---

#### AC9 – Successful order
Given valid payment details are provided  
When I click confirm  
Then the payment is validated, the order is placed, a confirmation with the invoice number is shown, and the cart is cleared  
And a checkout confirmation email is sent to the customer.  

---

#### User Registration

### User Story
As a new visitor,
I want to create an account with strong password validation and real-time feedback,
so that I can securely access the application.

### Acceptance Criteria

#### AC1 – Registration form fields
Given the registration form is displayed  
Then the following required fields are shown:  
- First name
- Last name
- Date of birth (ISO format YYYY-MM-DD)
- Street
- Postal code (numeric)
- City
- State
- Country (dropdown)
- Phone (numeric only)
- Email (max 256 characters, RFC-compliant format)
- Password

---

#### AC2 – Password requirements displayed
Given the password input is focused  
Then a list of requirements is displayed:  
- at least 8 characters long
- both uppercase and lowercase letters
- at least one number
- at least one special character

---

#### AC3 – Real-time password validation
Given I type in the password field  
Then the requirements update immediately to reflect which rules are fulfilled.  

---

#### AC4 – Password strength indicator
Given I am entering a password  
Then a strength indicator is displayed with levels:  
- Weak (1 criterion met, 20% bar)
- Moderate (2 criteria met, 40% bar)
- Strong (3 criteria met, 60% bar)
- Very Strong (4 criteria met, 80% bar)
- Excellent (all criteria met, 100% bar)

---

#### AC5 – Duplicate email
Given the email is already registered  
Then the error "Email is already in use." is displayed.  

---

#### AC6 – Successful registration
Given all fields are valid  
When I submit the form  
Then the account is created  
And a confirmation email is sent to the registered email address  
And I am redirected to the login page.  

---

#### User Login

### User Story
As a registered user,
I want to log in with my credentials or via social login, with support for two-factor authentication,
so that I can securely access my account.

### Acceptance Criteria

#### AC1 – Login form
Given I navigate to the login page  
Then email and password fields are displayed  
And a "Sign in with Google" button is shown.  

---

#### AC2 – Successful login
Given I enter valid credentials  
When I submit the form  
Then I am redirected based on my role: `/account` for users, `/admin/dashboard` for admins.  

---

#### AC3 – Invalid credentials
Given I enter incorrect credentials  
Then the error "Invalid email or password" is displayed.  

---

#### AC4 – Account locking
Given I have entered incorrect credentials 3 times consecutively  
When I try to log in again  
Then the error "Account locked, too many failed attempts. Please contact the administrator." is displayed  
And the API returns HTTP 423.  

---

#### AC5 – Admin accounts are exempt from locking
Given I am logging in as an admin  
Then the account is never locked regardless of failed attempts.  

---

#### AC6 – Disabled account
Given my account has been disabled by an administrator  
When I try to log in with valid credentials  
Then the error "Account disabled." is displayed  
And I am not authenticated.  

---

#### AC7 – TOTP prompt
Given I have TOTP enabled on my account  
When I submit valid email and password  
Then a 6-digit TOTP input field is displayed.  

---

#### AC8 – Valid TOTP code
Given I enter a valid TOTP code  
Then I am fully authenticated and redirected.  

---

#### AC9 – Invalid TOTP code
Given I enter an incorrect TOTP code  
Then the error "Invalid TOTP" is displayed.  

---

#### AC10 – Google social login
Given I click "Sign in with Google"  
Then a popup (500x400px) opens for Google authentication  
And on success, I am logged in and redirected to my account.  

---

#### Forgot Password

### User Story
As a registered user who has forgotten their password,
I want to request a password reset by providing my email,
so that I can regain access to my account.

### Acceptance Criteria

#### AC1 – Forgot password form
Given I click "Forgot password" on the login page  
Then a form with an email input is displayed.  

---

#### AC2 – Email validation
Given I enter an email address  
Then it must match a valid RFC-compliant format.  

---

#### AC3 – Successful reset
Given I enter a registered email  
When I submit the form  
Then a new password is generated and sent to my email address  
And a confirmation message is displayed and fades out after 3 seconds.  

---

#### AC4 – Non-existent email
Given I enter an unregistered email  
When I submit the form  
Then an error message is displayed.  

---

#### Two-Factor Authentication Setup

### User Story
As an authenticated user,
I want to set up TOTP two-factor authentication,
so that my account is protected with an additional security layer.

### Acceptance Criteria

#### AC1 – TOTP setup section
Given I am on my profile page  
Then a "Setup two factor authentication" section is displayed.  

---

#### AC2 – QR code displayed
Given the TOTP setup section is shown  
Then a QR code is displayed that I can scan with my authenticator app.  

---

#### AC3 – Manual secret entry
Given the TOTP setup section is shown  
Then the secret key is also displayed as text for manual entry.  

---

#### AC4 – Verification
Given I enter a valid 6-digit code from my authenticator app  
When I click "Verify TOTP"  
Then the message "TOTP verified and enabled successfully." is displayed.  

---

#### AC5 – Invalid code
Given I enter an incorrect code  
Then an error message is displayed.  

---

#### AC6 – Restricted for test accounts
Given I am logged in as customer@practicesoftwaretesting.com or admin@practicesoftwaretesting.com  
Then TOTP setup is denied with "Access denied: If you want to configure TOTP, please create your own account."  

---

#### Customer Profile

### User Story
As an authenticated user,
I want to view and update my personal information,
so that my account details are accurate.

### Acceptance Criteria

#### AC1 – Profile page is accessible
Given I am logged in  
When I navigate to my profile page  
Then my current profile information is displayed.  

---

#### AC2 – Editable fields
Given the profile page is displayed  
Then I can edit:  
- First name (required)
- Last name (required)
- Phone (required)
- Street (required)
- Postal code (required)
- City (required)
- State (required)
- Country (required)

---

#### AC3 – Read-only email
Given the profile page is displayed  
Then the email field is not editable.  

---

#### AC4 – Successful update
Given I modify profile fields with valid data  
When I save  
Then a success message is displayed and fades out after 5 seconds.  

---

#### Change Password

### User Story
As an authenticated user,
I want to change my password with real-time strength feedback,
so that I can maintain strong account security.

### Acceptance Criteria

#### AC1 – Change password form
Given I am on my profile page  
Then a change password section is displayed with:  
- Current password (required)
- New password (required)
- Confirm new password (required)

---

#### AC2 – Password strength indicator
Given I enter a new password  
Then the same password strength indicator as registration is displayed  
With the same 5 strength levels and visual progress bar.

---

#### AC3 – Passwords must match
Given the new password and confirmation do not match  
Then the error "Passwords do not match." is displayed.  

---

#### AC4 – Current password verification
Given I enter an incorrect current password  
When I submit the form  
Then the error "Your current password does not matches with the password." is displayed.  

---

#### AC5 – New password must differ
Given I enter a new password identical to the current one  
When I submit the form  
Then the error "New Password cannot be same as your current password." is displayed.  

---

#### AC6 – Successful change
Given I provide a valid current password and a new password that matches the confirmation  
When I submit the form  
Then a success message is displayed  
And I am logged out after 5 seconds.  

---

#### Favorites

### User Story
As an authenticated user,
I want to view and manage my list of favorite products,
so that I can quickly access products I'm interested in.

### Acceptance Criteria

#### AC1 – Favorites page
Given I am logged in  
When I navigate to my favorites page  
Then a list of my favorite products is displayed showing image, name, and description (truncated to 250 characters).  

---

#### AC2 – Empty favorites
Given I have no favorites  
Then a message indicating no favorites is displayed.  

---

#### AC3 – Remove a favorite
Given the favorites list is displayed  
When I click the delete button on a favorite  
Then the product is removed and the list refreshes.  

---

#### Invoices

### User Story
As an authenticated user,
I want to view my invoices with discount details and download them as PDF,
so that I can keep records of my purchases.

### Acceptance Criteria

#### AC1 – Invoice list
Given I am logged in  
When I navigate to my invoices page  
Then a paginated table is displayed with columns: invoice number, billing street, invoice date, total, and a details link.  

---

#### AC2 – Invoice detail
Given I click on an invoice  
Then the detail page shows:  
- invoice number, date, and total
- billing address (street, postal code, city, state, country)
- payment method and details
- product line items (quantity, name, price, line total)

---

#### AC3 – Non-existent invoice
Given the invoice does not exist or does not belong to me  
Then a "not found" message is displayed.  

---

#### AC4 – Discount on invoice
Given the invoice has a discount  
Then the detail page shows the subtotal, discount percentage and amount, and final total.  

---

#### AC5 – Discounted line items
Given a line item has a discount  
Then the original price is shown with a strikethrough and the discounted price below.  

---

#### AC6 – PDF download button
Given I am on the invoice detail page  
Then a "Download PDF" button is displayed.  

---

#### AC7 – PDF generation status
Given the PDF is still being generated  
Then the download button is disabled  
And the system checks the status every 20 seconds.  

---

#### AC8 – Successful PDF download
Given the PDF generation is complete  
When I click "Download PDF"  
Then the PDF file is downloaded.  

---

#### Messages

### User Story
As an authenticated user,
I want to view my contact messages and reply to them,
so that I can follow up on my inquiries.

### Acceptance Criteria

#### AC1 – Messages list
Given I am logged in  
When I navigate to my messages page  
Then a paginated table is displayed with columns: subject, message (truncated to 50 chars), status badge (NEW / IN_PROGRESS / RESOLVED), date, and a details link.  

---

#### AC2 – Message detail
Given I click on a message  
Then the original message is displayed (sender, subject, status, full text, timestamp)  
And any replies are listed chronologically below.  

---

#### AC3 – Reply to message
Given I am on the message detail page  
When I enter a reply and submit  
Then the reply is added and the replies list is updated.  

---

#### Contact Form (Advanced)

### User Story
As a visitor or logged-in user,
I want to send a message through a contact form with optional file attachment,
so that I can provide additional context with my inquiry.

### Acceptance Criteria

#### AC1 – Auto-fill for logged-in users
Given I am logged in  
Then my first name, last name, and email are auto-filled  
And the message "Known user, [Full Name]" is displayed  
And the name and email fields are hidden.  

---

#### AC2 – Guest user fields
Given I am not logged in  
Then first name, last name, and email fields are displayed and required.  

---

#### AC3 – Subject and message
Given the form is displayed  
Then a subject dropdown is shown with options:  
- Customer service
- Webmaster
- Return
- Payments
- Warranty
- Status of order
And a message field is shown (required, minimum 50 characters).  

---

#### AC4 – File attachment
Given the form is displayed  
Then an optional file attachment field is available  
And only `.txt` files are accepted  
And the file must be exactly 0 KB in size.  

---

#### AC5 – Invalid file type
Given I select a non-`.txt` file  
Then the error "File should have a txt extension." is displayed.  

---

#### AC6 – Invalid file size
Given I select a file that is not 0 KB  
Then the error "File should be empty." is displayed.  

---

#### AC7 – Successful submission
Given all fields are valid  
When I submit the form  
Then a confirmation email is sent to the provided email address  
And a confirmation message is displayed.  

---

#### Admin Dashboard

### User Story
As an administrator,
I want to access a dashboard and manage all entities,
so that I can oversee and administer the application.

### Acceptance Criteria

#### AC1 – Dashboard
Given I am logged in as an admin  
When I navigate to `/admin/dashboard`  
Then a bar chart of total sales by year and a paginated list of recent invoices are displayed.  

---

#### AC2 – Product management
Given I navigate to the products management page  
Then I can list, create, edit, and delete products.  

---

#### AC3 – Category management
Given I navigate to the categories management page  
Then I can list, create, edit, and delete categories (with optional parent category).  

---

#### AC4 – Brand management
Given I navigate to the brands management page  
Then I can list, create, edit, and delete brands.  

---

#### AC5 – Order management
Given I navigate to the orders management page
Then I can list all orders, view details, and update order status  
And the available status values are: AWAITING_FULFILLMENT, ON_HOLD, AWAITING_SHIPMENT, SHIPPED, COMPLETED.  

---

#### AC6 – User management
Given I navigate to the users management page  
Then I can list, view, edit, and delete user accounts.  

---

#### AC7 – Disable and enable user accounts
Given I am editing a user account in the admin panel  
Then an "Enabled" toggle is available  
And disabling the account immediately prevents the user from logging in  
And re-enabling the account restores the user's access.  

---

#### AC8 – Message management
Given I navigate to the messages management page  
Then I can view all contact messages, view details, and reply.  

---

#### AC9 – Reports
Given I navigate to the reports section  
Then I can view monthly sales, weekly sales, and general statistics.  

---

#### Chat Widget

### User Story
As a visitor or logged-in user,
I want to use a chat widget to search products, place orders, go through checkout, or submit support tickets,
so that I can interact with the application without navigating away from the current page.

### Acceptance Criteria

#### AC1 – Chat toggle
Given I am on any page  
Then a chat toggle button is displayed in the bottom-right corner  
And clicking it opens the chat window with a menu: Find Product, Order Product, Checkout, Support.  

---

#### AC2 – Find Product
Given I select "Find Product"  
Then I can enter a search query and up to 5 matching products are shown as cards  
And I can click "View Product" to navigate to the detail page.  

---

#### AC3 – Order Product
Given I select "Order Product"  
Then I can search for a product, select a quantity (1, 2, 3, 5, 10, or custom 1–999), confirm the order, and the product is added to my cart.  

---

#### AC4 – Checkout
Given I select "Checkout" and my cart has items  
Then the chat walks me through the full checkout flow:  
- cart summary
- guest details (if not logged in): email, first name, last name
- address: street, city, state, country, postal code
- payment method selection and details
- order confirmation with invoice number

---

#### AC5 – Empty cart
Given I select "Checkout" and my cart is empty  
Then the message "Your cart is empty" is displayed.  

---

#### AC6 – Support
Given I select "Support"  
Then the chat prompts me for subject, message (min 50 chars), and optional file attachment (.txt)  
And if not logged in, also asks for first name, last name, and email  
And on submission, a confirmation is displayed.  

---

#### Geo-Location Discount

### User Story
As a visitor browsing from a supported city,
I want to automatically receive a location-based discount on eligible products,
so that I benefit from regional promotions.

### Acceptance Criteria

#### AC1 – Discount applied based on location
Given my browser geo-location matches a supported city and a product is a location offer  
Then the following discount is applied:  
- New York: 5%
- Mumbai: 10%
- Tokyo: 15%
- Amsterdam: 20%
- London: 25%

---

#### AC2 – Discount display
Given a location discount is applied  
Then the original price is shown with a strikethrough and the discounted price is shown below.  

---

#### AC3 – No match
Given my location does not match any supported city  
Then no location discount is applied.  

---

#### AC4 – Discount in cart
Given I add a location-discounted product to the cart  
Then the discounted price is used for the cart line item.  

---

#### Combination Discount

### User Story
As a customer with both rental and non-rental items in my cart,
I want to receive an additional discount on my order,
so that I am rewarded for combining product types.

### Acceptance Criteria

#### AC1 – Combination discount applied
Given my cart contains at least one rental item and at least one non-rental item  
Then an additional 15% discount is applied to the cart subtotal.  

---

#### AC2 – Discount display in cart
Given the combination discount is applied  
Then the cart shows the subtotal, discount percentage (15%), discount amount, and final total.  

---

#### AC3 – Discount removed when condition no longer met
Given I remove all rental items or all non-rental items from my cart  
Then the 15% combination discount is removed  
And the total reverts to the regular subtotal.  

---

#### AC4 – Discount on invoice
Given I complete checkout with the combination discount applied  
Then the invoice shows the subtotal, the 15% discount amount, and the final total.  

---

#### Multi-Language Support

### User Story
As a visitor,
I want to switch the application language,
so that I can use it in my preferred language.

### Acceptance Criteria

#### AC1 – Automatic browser language detection
Given I visit the application for the first time  
And my browser language is set to a supported language (English, German, Spanish, French, Dutch, or Turkish)  
Then the application automatically displays in my browser's language.  

---

#### AC2 – Unsupported browser language fallback
Given I visit the application for the first time  
And my browser language is not one of the supported languages  
Then the application defaults to English.  

---

#### AC3 – Language selector
Given I am on any page  
Then a language selector is available in the navigation bar with: DE, EN, ES, FR, NL, TR.  

---

#### AC4 – Language switch
Given I select a language from the selector  
Then all labels, messages, and UI elements update to the selected language.  

---

#### AC5 – Persistence across sessions
Given I have selected a language  
Then my preference is stored in the browser (localStorage)  
And on subsequent visits my stored preference takes priority over browser language detection.  

---

#### Privacy Policy

### User Story
As a visitor,
I want to read the privacy policy,
so that I understand how my data is handled.

### Acceptance Criteria

#### AC1 – Privacy page accessible
Given I navigate to `/privacy`  
Then the privacy policy is displayed covering: Google Sign-In integration, data collection, automatic data removal (hourly), third-party services, data security, and contact information.  

---

#### Browse Products by Category

### User Story
As a visitor,
I want to browse products within a specific category with filtering, sorting, pagination, and price range,
so that I can find specific products within a category.

### Acceptance Criteria

#### AC1 – Category page is displayed
Given I click on a category name  
Then a page with products belonging to that category is displayed  
And the category name is shown as the page title.  

---

#### AC2 – Filters available
Given the category page is displayed  
Then the same filters as the product overview are available:  
- category checkboxes (subcategory tree)
- brand checkboxes
- sorting dropdown
- pagination controls
- price range slider

---

## 11. Testing Considerations

### Positive Test Areas
- End-to-end purchase flows (guest and authenticated)
- Filter/search/sort combinations on product overview
- All payment method validations
- Discount calculations (geo-location, combination)
- Admin CRUD operations
- Multi-language switching and persistence
- PDF invoice generation and download
- TOTP setup and login flow
- Social login (Google)
- Chat widget flows

### Negative Test Areas
- Account locking after 3 failed logins
- Disabled account login rejection
- Invalid payment details per method
- Gift card format validation (client + server)
- Out-of-stock product purchase prevention
- Unauthorized access to favorites/invoices/admin
- Invalid file upload on contact form
- Expired credit card rejection

### API Testing
- REST API documented via Swagger at `/api/documentation`
- GraphQL playground at `/graphiql`
- JWT authentication for protected endpoints
- HTTP QUERY method (RFC 10008) for search/filter endpoints
- Payment pre-check (`POST /payment/check`) vs. order creation (`POST /invoices`)

### Special Variants
- **with-bugs:** Intentional defects for bug-hunting exercises
- **performance:** API middleware and frontend render delays for performance testing
- **Local Docker:** Full stack with MailHog, PHPMyAdmin, postcode lookup settings

---

*Document generated from official documentation at [testsmith-io.github.io/practice-software-testing](https://testsmith-io.github.io/practice-software-testing/#/), including user stories and acceptance criteria for Sprints 1–5.*
