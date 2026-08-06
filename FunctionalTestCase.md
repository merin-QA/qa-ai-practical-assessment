# FunctionalTestCase — Practice Software Testing Toolshop

> **Application:** [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)  
> **Version:** Sprint 5  
> **Modules:** User Registration, User Login, Products Purchase Journey, API — User Authentication, API — Cart Creation, API — Product Selection, API — Invoice Generation, API — E2E  
> **Traceability:** `requirements_document.md`  
> **Risk reference:** `risk_analysis.md`

---

## Document Summary

| Module | Test Cases | Smoke | Regression | E2E |
|--------|:----------:|:-----:|:----------:|:---:|
| User Registration | 14 | 2 | 11 | 1 |
| User Login | 16 | 3 | 12 | 1 |
| Products Purchase Journey | 28 | 4 | 22 | 2 |
| API — User Authentication | 11 | 1 | 9 | 1 |
| API — Cart Creation | 9 | 1 | 7 | 1 |
| API — Product Selection | 6 | 2 | 4 | 0 |
| API — Invoice Generation | 8 | 2 | 6 | 0 |
| API — E2E | 3 | 0 | 0 | 3 |
| **Total** | **95** | **15** | **72** | **9** |

### Default Test Data

| Account | Email | Password | Role | Notes |
|---------|-------|----------|------|-------|
| John Doe | admin@practicesoftwaretesting.com | welcome01 | Admin | Exempt from account locking |
| Jane Doe | customer@practicesoftwaretesting.com | welcome01 | Customer | TOTP setup denied |
| Jack Howe | customer2@practicesoftwaretesting.com | welcome01 | Customer | Use for account-lock tests |
| Bob Smith | customer3@practicesoftwaretesting.com | pass123 | Customer | — |

### Valid Registration Data (template)

| Field | Sample Value |
|-------|--------------|
| First name | Test |
| Last name | User |
| Date of birth | 1990-05-15 |
| Street | 123 Main Street |
| Postal code | 12345 |
| City | New York |
| State | NY |
| Country | United States |
| Phone | 5551234567 |
| Email | `testuser_<timestamp>@example.com` (unique per run) |
| Password | `Welcome@123` |

---

## User Registration

### FunctionalTestCase-REG-001 — Registration form displays all required fields

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-001 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | User is not logged in; browser on home page |

**Test Steps:**

1. Navigate to `https://practicesoftwaretesting.com/auth/register`
2. Observe the registration form

**Expected Result:**

- The following required fields are displayed:
  - First name
  - Last name
  - Date of birth (YYYY-MM-DD format)
  - Street
  - Postal code
  - City
  - State
  - Country (dropdown)
  - Phone
  - Email
  - Password
- A submit/register button is visible

---

### FunctionalTestCase-REG-002 — Password requirements list shown on password field focus

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-002, REQ-BR-013 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Click into the Password field

**Expected Result:**

- A list of password requirements is displayed:
  - At least 8 characters long
  - Both uppercase and lowercase letters
  - At least one number
  - At least one special character

---

### FunctionalTestCase-REG-003 — Password requirements update in real time as user types

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-003 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page; password field is focused |

**Test Steps:**

1. Navigate to `/auth/register` and focus the Password field
2. Type `a` (1 character, lowercase only)
3. Observe requirement indicators
4. Continue typing to `aB1!` then `aB1!aaaa` (8+ chars with upper, lower, number, special)

**Expected Result:**

- After step 2: only applicable rules show as met/unmet; not all criteria satisfied
- As each rule is satisfied, the corresponding requirement indicator updates immediately (no page refresh)
- After step 4: all four password criteria are shown as fulfilled

---

### FunctionalTestCase-REG-004 — Password strength indicator shows Weak (20%)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-004, REQ-BR-014 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Enter password: `a` (meets 1 criterion only — lowercase letter)

**Expected Result:**

- Strength indicator displays **Weak**
- Progress bar shows approximately **20%**

---

### FunctionalTestCase-REG-005 — Password strength indicator shows Moderate (40%)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-004, REQ-BR-014 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Enter password: `aB` (meets 2 criteria — upper + lower)

**Expected Result:**

- Strength indicator displays **Moderate**
- Progress bar shows approximately **40%**

---

### FunctionalTestCase-REG-006 — Password strength indicator shows Strong (60%)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-004, REQ-BR-014 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Enter password: `aB1` (meets 3 criteria — upper, lower, number)

**Expected Result:**

- Strength indicator displays **Strong**
- Progress bar shows approximately **60%**

---

### FunctionalTestCase-REG-007 — Password strength indicator shows Very Strong (80%)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-004, REQ-BR-014 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Enter password: `aB1!` (meets 4 criteria — upper, lower, number, special; under 8 chars)

**Expected Result:**

- Strength indicator displays **Very Strong**
- Progress bar shows approximately **80%**

---

### FunctionalTestCase-REG-008 — Password strength indicator shows Excellent (100%)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-004, REQ-BR-014 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Enter password: `Welcome@123` (meets all 5 criteria including 8+ characters)

**Expected Result:**

- Strength indicator displays **Excellent**
- Progress bar shows **100%**

---

### FunctionalTestCase-REG-009 — Successful registration with valid data

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-006, REQ-BR-015 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | User is not logged in; email address is not already registered |

**Test Steps:**

1. Navigate to `/auth/register`
2. Fill all fields with valid data (use unique email, e.g. `testuser_<timestamp>@example.com`)
3. Enter password: `Welcome@123`
4. Submit the registration form

**Expected Result:**

- Account is created successfully
- User is redirected to the login page (`/auth/login`)
- Confirmation email is sent to the registered email address (verify in MailHog if testing locally, or email inbox if available)

---

### FunctionalTestCase-REG-010 — Registration blocked for duplicate email

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-005, REQ-BR-016 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate to `/auth/register`
2. Fill all fields with valid data
3. Use email: `customer@practicesoftwaretesting.com` (already registered)
4. Submit the registration form

**Expected Result:**

- Registration is not completed
- Error message displayed: **"Email is already in use."**
- User remains on the registration page

---

### FunctionalTestCase-REG-011 — Registration rejected with password not meeting requirements

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-BR-013 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Fill all fields with valid data and a unique email
3. Enter password: `password` (no uppercase, number, or special character)
4. Attempt to submit the form

**Expected Result:**

- Form submission is blocked or server returns validation error
- Password requirements remain unfulfilled in the UI
- Account is not created

---

### FunctionalTestCase-REG-012 — Registration rejected with invalid email format

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-001, REQ-BR-015 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Fill all fields with valid data except email
3. Enter email: `notanemail`
4. Attempt to submit the form

**Expected Result:**

- Client-side or server-side validation error is shown for email format
- Account is not created

---

### FunctionalTestCase-REG-013 — Registration rejected when required fields are empty

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-001 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the registration page |

**Test Steps:**

1. Navigate to `/auth/register`
2. Leave all fields empty
3. Click the submit/register button

**Expected Result:**

- Form is not submitted
- Required field validation errors are displayed for empty mandatory fields
- Account is not created

---

### FunctionalTestCase-REG-014 — E2E: Register with valid details, login, and verify profile information

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-REG-006, REQ-S5-LOGIN-002, REQ-S5-PROF-001, REQ-S5-PROF-003 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | User is not logged in; unique email available |

**Test Data:**

| Field | Value |
|-------|-------|
| First name | Test |
| Last name | User |
| Date of birth | 1990-05-15 |
| Street | 123 Main Street |
| Postal code | 12345 |
| City | New York |
| State | NY |
| Country | United States |
| Phone | 5551234567 |
| Email | `testuser_<timestamp>@example.com` |
| Password | `Welcome@123` |

**Test Steps:**

1. Navigate to `/auth/register`
2. Fill all registration fields with the test data above (use a unique email)
3. Submit the registration form
4. Verify redirect to `/auth/login`
5. Enter the newly registered email and password
6. Submit the login form
7. Navigate to `/account/profile`
8. Verify displayed profile information matches the registration data

**Expected Result:**

- Registration succeeds and user is redirected to `/auth/login`
- Login with the newly registered credentials succeeds
- User is redirected to `/account`
- Profile page (`/account/profile`) displays the registered details:
  - First name, last name, phone, street, postal code, city, state, country match registration input
  - Email is displayed and is **read-only** (not editable)
- Profile information is successfully verified against registration data

---

## User Login

### FunctionalTestCase-LOGIN-001 — Login form displays email, password, and Google sign-in

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-001 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate to `https://practicesoftwaretesting.com/auth/login`
2. Observe the login form

**Expected Result:**

- Email input field is displayed
- Password input field is displayed
- **"Sign in with Google"** button is displayed
- Login/submit button is available

---

### FunctionalTestCase-LOGIN-002 — Successful login as customer redirects to account page

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-002, REQ-BR-017 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | User is not logged in; customer account is active |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `customer@practicesoftwaretesting.com`
3. Enter password: `welcome01`
4. Submit the login form

**Expected Result:**

- Login succeeds
- User is redirected to `/account`
- Account page/profile content is displayed
- User session is active (e.g. account menu visible)

---

### FunctionalTestCase-LOGIN-003 — Successful login as admin redirects to admin dashboard

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-002 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | User is not logged in; admin account is active |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `admin@practicesoftwaretesting.com`
3. Enter password: `welcome01`
4. Submit the login form

**Expected Result:**

- Login succeeds
- User is redirected to `/admin/dashboard`
- Admin dashboard (sales chart, recent invoices) is displayed

---

### FunctionalTestCase-LOGIN-004 — Invalid credentials show error message

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-003, REQ-BR-017 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `customer@practicesoftwaretesting.com`
3. Enter password: `wrongpassword`
4. Submit the login form

**Expected Result:**

- Login fails
- Error message displayed: **"Invalid email or password"**
- User is not redirected; remains on login page
- User is not authenticated

---

### FunctionalTestCase-LOGIN-005 — Account locked after 3 consecutive failed login attempts

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-004, REQ-BR-018 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in; use `customer2@practicesoftwaretesting.com` (not the primary test account) |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `customer2@practicesoftwaretesting.com`
3. Enter incorrect password and submit — repeat **3 times** consecutively
4. On the 4th attempt, enter the **correct** password: `welcome01`
5. Submit the login form
6. (Optional API check) Inspect network response for HTTP **423**

**Expected Result:**

- After 3 failed attempts, account is locked
- Error message: **"Account locked, too many failed attempts. Please contact the administrator."**
- Even correct password on 4th attempt does not log the user in
- API returns HTTP **423** (if verified via browser dev tools)

> **Note:** Use a disposable customer account for this test. Account may need admin re-enablement after testing.

---

### FunctionalTestCase-LOGIN-006 — Admin account is never locked after repeated failed attempts

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-005 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `admin@practicesoftwaretesting.com`
3. Enter incorrect password and submit — repeat **4 or more times**
4. Enter correct password: `welcome01`
5. Submit the login form

**Expected Result:**

- Admin account is **not** locked after multiple failed attempts
- No "Account locked" message is displayed for admin
- Login with correct password on step 5 succeeds
- User is redirected to `/admin/dashboard`

---

### FunctionalTestCase-LOGIN-007 — Disabled account cannot log in

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Admin has disabled a test user account (create or use a test user, disable via `/admin/users`) |

**Test Steps:**

1. As admin, navigate to `/admin/users` and disable a test customer account
2. Log out
3. Navigate to `/auth/login`
4. Enter the disabled user's valid email and password
5. Submit the login form

**Expected Result:**

- Login fails
- Error message: **"Account disabled."**
- User is not authenticated
- No redirect to `/account`

> **Cleanup:** Re-enable the test account via admin panel after test execution.

---

### FunctionalTestCase-LOGIN-008 — TOTP input displayed after valid credentials when 2FA is enabled

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-007 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | A self-registered account exists with TOTP enabled (not `customer@` or `admin@` accounts) |

**Test Steps:**

1. Register a new account and enable TOTP via `/account/profile` → Setup two factor authentication
2. Log out
3. Navigate to `/auth/login`
4. Enter valid email and password for the TOTP-enabled account
5. Submit the login form

**Expected Result:**

- After valid email/password submission, a **6-digit TOTP input field** is displayed
- User is not yet fully authenticated (no redirect to `/account`)

---

### FunctionalTestCase-LOGIN-009 — Successful login with valid TOTP code

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-008 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | TOTP-enabled account; authenticator app configured with QR code secret |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter valid email and password for TOTP-enabled account
3. Submit the form
4. Enter the current 6-digit TOTP code from authenticator app
5. Submit/verify TOTP

**Expected Result:**

- TOTP verification succeeds
- User is fully authenticated
- User is redirected to `/account` (customer) or `/admin/dashboard` (admin)

---

### FunctionalTestCase-LOGIN-010 — Invalid TOTP code shows error

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-009, REQ-BR-019 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | TOTP-enabled account; user has passed email/password step |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter valid email and password for TOTP-enabled account
3. Submit the form
4. Enter an incorrect 6-digit TOTP code (e.g. `000000`)
5. Submit/verify TOTP

**Expected Result:**

- Error message: **"Invalid TOTP"**
- User is not authenticated
- User remains on login/TOTP verification step

---

### FunctionalTestCase-LOGIN-011 — Google social login opens OAuth popup

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-010 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in; Google account available for OAuth |

**Test Steps:**

1. Navigate to `/auth/login`
2. Click **"Sign in with Google"**
3. Observe the popup window

**Expected Result:**

- A popup window opens for Google authentication
- Popup dimensions are approximately **500×400px**
- Google OAuth consent/login screen is displayed

---

### FunctionalTestCase-LOGIN-012 — Google social login succeeds and redirects to account

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-010 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid Google account; user is not logged in |

**Test Steps:**

1. Navigate to `/auth/login`
2. Click **"Sign in with Google"**
3. Complete Google authentication in the popup with valid credentials
4. Allow access if prompted

**Expected Result:**

- OAuth popup closes after successful authentication
- User is logged in to the application
- User is redirected to `/account`
- Session is active

---

### FunctionalTestCase-LOGIN-013 — Login with empty email field shows validation error

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-001 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the login page |

**Test Steps:**

1. Navigate to `/auth/login`
2. Leave email field empty
3. Enter password: `welcome01`
4. Submit the login form

**Expected Result:**

- Form validation prevents submission or shows email required error
- User is not authenticated

---

### FunctionalTestCase-LOGIN-014 — Login with empty password field shows validation error

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-001 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is on the login page |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `customer@practicesoftwaretesting.com`
3. Leave password field empty
4. Submit the login form

**Expected Result:**

- Form validation prevents submission or shows password required error
- User is not authenticated

---

### FunctionalTestCase-LOGIN-015 — Login with non-existent email shows invalid credentials error

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-003, REQ-BR-017 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate to `/auth/login`
2. Enter email: `nonexistent_user@example.com`
3. Enter password: `anypassword`
4. Submit the login form

**Expected Result:**

- Error message: **"Invalid email or password"**
- User is not authenticated

---

### FunctionalTestCase-LOGIN-016 — E2E: Login and verify protected account page access

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-LOGIN-002, REQ-RBAC-001 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | User is not logged in |

**Test Steps:**

1. Navigate directly to `/account` (without logging in)
2. Observe redirect behavior
3. Navigate to `/auth/login`
4. Log in as `customer@practicesoftwaretesting.com` / `welcome01`
5. Navigate to `/account/profile`, `/account/favorites`, `/account/invoices`

**Expected Result:**

- Step 1–2: Unauthenticated access to `/account` is blocked (redirect to login)
- Step 4: Login succeeds; redirected to `/account`
- Step 5: Profile, favorites, and invoices pages load for authenticated user

---

## Products Purchase Journey

### Default Test Data

| Field | Sample Value |
|-------|--------------|
| Customer account | customer@practicesoftwaretesting.com / welcome01 |
| Billing street | 123 Test Street |
| Billing city | New York |
| Billing state | NY |
| Billing country | United States |
| Billing postal code | 10001 |
| Credit card number | 4111-1111-1111-1111 |
| Credit card expiry | 12/2030 (future date) |
| CVV | 123 |
| Card holder | John Doe |
| Bank name | Test Bank |
| Account name | John Doe |
| Account number | 1234567890 |

---

### FunctionalTestCase-PUR-001 — Product grid is displayed on home page

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-001 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | User on home page |

**Test Steps:**

1. Navigate to `https://practicesoftwaretesting.com/`
2. Observe the product grid

**Expected Result:**

- A grid of product cards is displayed
- Each card shows product image, name, and price

---

### FunctionalTestCase-PUR-002 — Clicking product card navigates to product detail

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-002 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | Product overview is displayed |

**Test Steps:**

1. Navigate to `/`
2. Click any in-stock product card

**Expected Result:**

- User is navigated to the product detail page for the selected product

---

### FunctionalTestCase-PUR-003 — Product detail page displays product information

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PD-001 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User on product detail page |

**Test Steps:**

1. Navigate to `/` and open any product detail page
2. Observe product information

**Expected Result:**

- Product image, name, description, price, category badge, and brand badge are displayed

---

### FunctionalTestCase-PUR-004 — Add product to cart with success message

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PD-008, REQ-BR-009 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | Product is in stock; user on product detail page |

**Test Steps:**

1. Open an in-stock non-rental product detail page
2. Keep default quantity as 1
3. Click **Add to Cart**

**Expected Result:**

- Success message: **"Product added to shopping cart."**
- Product is added to cart with selected quantity

---

### FunctionalTestCase-PUR-005 — Out-of-stock product cannot be added to cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PD-009, REQ-BR-001 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | An out-of-stock non-rental product is available |

**Test Steps:**

1. Find a product showing **"Out of stock"** on home page or detail page
2. Open the product detail page
3. Attempt to click **Add to Cart**

**Expected Result:**

- **"Out of stock"** is shown in red
- **Add to Cart** button is disabled
- Product cannot be added to cart

---

### FunctionalTestCase-PUR-006 — Search products with valid query

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-004, REQ-BR-005 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User on product overview page |

**Test Steps:**

1. Navigate to `/`
2. Enter search query: `hammer` (3–40 characters)
3. Submit search

**Expected Result:**

- Product grid updates to show only matching products
- Active filters are reset

---

### FunctionalTestCase-PUR-007 — Filter products by category

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-005 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User on product overview page |

**Test Steps:**

1. Navigate to `/`
2. Select one or more category checkboxes in the sidebar
3. Observe the product grid

**Expected Result:**

- Product grid shows only products from selected categories

---

### FunctionalTestCase-PUR-008 — Sort products by price low to high

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-009 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | User on product overview page |

**Test Steps:**

1. Navigate to `/`
2. Select sort option: **Price (Low - High)**

**Expected Result:**

- Products reload ordered by ascending price

---

### FunctionalTestCase-PUR-009 — Empty cart displays message

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-CART-004, REQ-BR-007 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Cart has no items |

**Test Steps:**

1. Ensure cart is empty (clear items if needed)
2. Navigate to `/checkout`

**Expected Result:**

- Message displayed: **"Your shopping cart is empty"**

---

### FunctionalTestCase-PUR-010 — Cart review displays item details

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-CART-001 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | At least one item in cart |

**Test Steps:**

1. Add a product to cart
2. Navigate to `/checkout`

**Expected Result:**

- Cart table displayed with columns: Item, Quantity, Price, Total, Actions
- Added product appears with correct name, quantity, and price

---

### FunctionalTestCase-PUR-011 — Update product quantity in cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-CART-002, REQ-BR-008 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Item exists in cart |

**Test Steps:**

1. Add a product to cart and go to `/checkout`
2. Change the quantity of the cart item (e.g. from 1 to 2)
3. Save/update quantity

**Expected Result:**

- Message: **"Product quantity updated."**
- Item total and cart total are recalculated correctly

---

### FunctionalTestCase-PUR-012 — Remove product from cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-CART-003 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Item exists in cart |

**Test Steps:**

1. Add a product to cart and go to `/checkout`
2. Click delete/remove on the cart item

**Expected Result:**

- Item is removed from cart
- Cart total is recalculated
- Empty cart message shown if no items remain

---

### FunctionalTestCase-PUR-013 — Rental item labeled in checkout cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-RENT-004 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Rental product added to cart |

**Test Steps:**

1. Navigate to `/rentals`
2. Open a rental product, set duration, add to cart
3. Navigate to `/checkout`

**Expected Result:**

- Rental item is marked with **"This is a rental item"** in the cart

---

### FunctionalTestCase-PUR-014 — Guest checkout displays login step

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-SIGNIN-001, REQ-BR-020 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Guest user; cart has at least one item |

**Test Steps:**

1. As guest, add product to cart
2. Navigate to `/checkout`
3. Click **Proceed** from cart review step

**Expected Result:**

- Login form is displayed as the next checkout step
- Email and password fields are shown

---

### FunctionalTestCase-PUR-015 — Guest logs in during checkout

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-SIGNIN-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Guest user with items in cart |

**Test Steps:**

1. Add product to cart as guest
2. Proceed to checkout login step
3. Enter `customer@practicesoftwaretesting.com` / `welcome01`
4. Submit login

**Expected Result:**

- User is authenticated during checkout
- User can proceed to billing address step

---

### FunctionalTestCase-PUR-016 — Logged-in user billing address is pre-filled

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-SIGNIN-005, REQ-S5-CC-ADDR-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User logged in as customer with profile address |

**Test Steps:**

1. Log in as `customer@practicesoftwaretesting.com`
2. Add product to cart
3. Navigate to `/checkout` and proceed through cart and sign-in steps
4. Observe billing address fields

**Expected Result:**

- Message: **"You are already signed in as [First Name] [Last Name]"**
- Address fields are pre-filled from account profile

---

### FunctionalTestCase-PUR-017 — Billing address validation blocks empty fields

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-ADDR-002 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User on billing address checkout step |

**Test Steps:**

1. Reach billing address step in checkout
2. Leave one or more required fields empty
3. Attempt to click **Proceed**

**Expected Result:**

- Empty fields are highlighted as invalid
- **Proceed** button is disabled or submission blocked

---

### FunctionalTestCase-PUR-018 — Proceed to payment with valid billing address

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-ADDR-003 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User on billing address step |

**Test Steps:**

1. Fill all billing address fields with valid data
2. Click **Proceed**

**Expected Result:**

- User advances to the payment step

---

### FunctionalTestCase-PUR-019 — Payment step displays all payment methods

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-PAY-001 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User on payment checkout step |

**Test Steps:**

1. Complete cart review, sign-in, and billing address steps
2. Observe payment method dropdown

**Expected Result:**

- Payment methods available: Bank Transfer, Cash on Delivery, Credit Card, Buy Now Pay Later, Gift Card

---

### FunctionalTestCase-PUR-020 — Successful order with Cash on Delivery

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-PAY-007, REQ-S5-CC-PAY-009 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | User has items in cart; reached payment step |

**Test Steps:**

1. Complete checkout steps up to payment
2. Select **Cash on Delivery**
3. Confirm order

**Expected Result:**

- No additional payment fields required
- Order confirmation displayed with invoice number
- Cart is cleared
- Checkout confirmation email sent (if verifiable)

---

### FunctionalTestCase-PUR-021 — Successful order with Credit Card

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-PAY-003, REQ-S5-CC-PAY-009 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User has items in cart; reached payment step |

**Test Steps:**

1. Complete checkout steps up to payment
2. Select **Credit Card**
3. Enter card: `4111-1111-1111-1111`, expiry `12/2030`, CVV `123`, holder `John Doe`
4. Confirm order

**Expected Result:**

- Payment fields accept valid data
- Order placed successfully with invoice number
- Cart cleared

---

### FunctionalTestCase-PUR-022 — Credit card with expired date is rejected

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-PAY-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | User on payment step; Credit Card selected |

**Test Steps:**

1. Select **Credit Card**
2. Enter card number `4111-1111-1111-1111`
3. Enter expiry date in the past (e.g. `01/2020`)
4. Enter CVV and card holder name
5. Attempt to confirm

**Expected Result:**

- Error: **"Expiration date must be in the future."**
- Order is not placed

---

### FunctionalTestCase-PUR-023 — Bank Transfer payment fields validation

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-CC-PAY-002 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User on payment step |

**Test Steps:**

1. Select **Bank Transfer**
2. Observe required fields
3. Enter valid data: Bank name `Test Bank`, Account name `John Doe`, Account number `1234567890`
4. Confirm order

**Expected Result:**

- Bank name, account name, and account number fields are displayed
- Valid data allows order completion

---

### FunctionalTestCase-PUR-024 — Purchase rental product with duration slider

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-RENT-003, REQ-S5-PD-010, REQ-BR-003 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | User on rentals page |

**Test Steps:**

1. Navigate to `/rentals`
2. Open a rental product detail page
3. Set duration slider to 3 hours
4. Observe total price
5. Add to cart and proceed to checkout cart review

**Expected Result:**

- Duration slider shown (1–10 hours) instead of quantity buttons
- Total price = hourly rate × 3
- Rental item appears in cart with rental label

---

### FunctionalTestCase-PUR-025 — Combination discount applied for rental + non-rental items

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-COMBO-001, REQ-S5-CC-CART-007, REQ-BR-010 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Cart is empty |

**Test Steps:**

1. Add one rental product to cart
2. Add one non-rental product to cart
3. Navigate to `/checkout` cart review

**Expected Result:**

- **15%** combination discount applied to cart subtotal
- Cart shows subtotal, discount amount (15%), and final total

---

### FunctionalTestCase-PUR-026 — Combination discount removed when condition not met

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-COMBO-003, REQ-S5-CC-CART-008, REQ-BR-011 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Cart has rental and non-rental items with combination discount |

**Test Steps:**

1. Add rental and non-rental items to cart (combination discount applied)
2. Remove all rental OR all non-rental items from cart
3. Observe cart totals

**Expected Result:**

- 15% combination discount is removed
- Total reverts to regular subtotal

---

### FunctionalTestCase-PUR-027 — E2E: Guest product purchase journey (browse to order confirmation)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-002, REQ-S5-PD-008, REQ-S5-CC-CART-005, REQ-S5-CC-SIGNIN-004, REQ-S5-CC-ADDR-003, REQ-S5-CC-PAY-009 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Guest user; cart empty |

**Test Steps:**

1. Navigate to `/` and open an in-stock product
2. Add product to cart
3. Go to `/checkout` → review cart → click **Proceed**
4. Log in as `customer@practicesoftwaretesting.com` / `welcome01`
5. Enter billing address and proceed
6. Select **Cash on Delivery** and confirm order

**Expected Result:**

- Full guest-to-authenticated checkout completes successfully
- Order confirmation with invoice number is displayed
- Cart is cleared after order

---

### FunctionalTestCase-PUR-028 — E2E: Browse products, add multiple items, update quantity, Cash on Delivery, verify invoice

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-S5-PO-001, REQ-S5-PO-002, REQ-S5-PD-008, REQ-S5-CC-CART-001, REQ-S5-CC-CART-002, REQ-S5-CC-CART-005, REQ-S5-CC-PAY-007, REQ-S5-CC-PAY-009, REQ-S5-INV-001, REQ-S5-INV-002 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | User logged in as customer; cart empty |

**Test Steps:**

1. Log in as `customer@practicesoftwaretesting.com` / `welcome01`
2. Navigate to `/` and browse the product grid
3. Open first in-stock product → add to cart
4. Return to `/`, open a **second** different in-stock product → add to cart
5. Navigate to `/checkout` and verify both items are in the cart
6. Update quantity of one cart item (e.g. from 1 to 2) and confirm update
7. Click **Proceed** through checkout steps (sign-in, billing address if required)
8. Select **Cash on Delivery** and confirm order
9. Note the invoice number from the order confirmation
10. Navigate to **My Invoices** (`/account/invoices`)
11. Open the newly generated invoice detail page

**Expected Result:**

- Product grid is browsable; multiple products can be added to cart
- Cart shows both items with correct names, quantities, and prices
- Message: **"Product quantity updated."**; cart totals recalculate after quantity change
- Checkout completes successfully with **Cash on Delivery**
- Order confirmation displays invoice number; cart is cleared
- Invoice appears in **My Invoices** list
- Invoice detail shows all ordered line items (including updated quantities), payment method (Cash on Delivery), billing address, and correct order total

---

## API — User Authentication

### API Test Data

| Field | Value |
|-------|-------|
| **Base URL** | `https://api.practicesoftwaretesting.com` |
| **Customer email** | `customer@practicesoftwaretesting.com` |
| **Customer password** | `welcome01` |
| **Admin email** | `admin@practicesoftwaretesting.com` |
| **Admin password** | `welcome01` |
| **Headers** | `Content-Type: application/json`, `Accept: application/json` |
| **Auth header** | `Authorization: Bearer <access_token>` |

### Registration request body (template)

```json
{
  "first_name": "Test",
  "last_name": "User",
  "dob": "1990-05-15",
  "street": "123 Main Street",
  "postal_code": "12345",
  "city": "New York",
  "state": "NY",
  "country": "United States",
  "phone": "5551234567",
  "email": "apitest_<timestamp>@example.com",
  "password": "QaTest@<timestamp>!"
}
```

---

### FunctionalTestCase-API-AUTH-001 — POST /users/login returns JWT for valid credentials

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-004 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | Valid customer account exists |

**Test Steps:**

1. Send `POST https://api.practicesoftwaretesting.com/users/login`
2. Request body: `{"email":"customer@practicesoftwaretesting.com","password":"welcome01"}`
3. Headers: `Content-Type: application/json`, `Accept: application/json`

**Expected Result:**

- HTTP **200 OK**
- Response contains `access_token`, `token_type` (`bearer`), and `expires_in`

---

### FunctionalTestCase-API-AUTH-002 — POST /users/login returns 401 for invalid credentials

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | None |

**Test Steps:**

1. Send `POST /users/login` with valid email and wrong password

**Expected Result:**

- HTTP **401 Unauthorized**
- Response contains error message (e.g. `"Unauthorized"`)

---

### FunctionalTestCase-API-AUTH-003 — POST /users/login returns error for invalid request body

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | None |

**Test Steps:**

1. Send `POST /users/login` with malformed body (e.g. `{"email":"invalid"}` missing password)

**Expected Result:**

- HTTP **401** or **422** per OpenAPI contract
- No `access_token` returned

---

### FunctionalTestCase-API-AUTH-004 — POST /users/register creates new user

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-008 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Unique email available |

**Test Steps:**

1. Send `POST /users/register` with valid registration JSON (unique email and strong unique password)
2. Verify response

**Expected Result:**

- HTTP **201 Created**
- Response contains `id`, `email`, `first_name`, `last_name`, and `address` object

---

### FunctionalTestCase-API-AUTH-005 — POST /users/register returns 422 for duplicate email

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-008 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Email already registered |

**Test Steps:**

1. Send `POST /users/register` using `customer@practicesoftwaretesting.com`

**Expected Result:**

- HTTP **422 Unprocessable Entity**
- Validation error for duplicate email

---

### FunctionalTestCase-API-AUTH-006 — GET /users/me returns profile with valid JWT

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid JWT obtained from login |

**Test Steps:**

1. Login via `POST /users/login` and capture `access_token`
2. Send `GET /users/me` with `Authorization: Bearer <token>`

**Expected Result:**

- HTTP **200 OK**
- Response contains `id`, `email`, `first_name`, `last_name`, `address`

---

### FunctionalTestCase-API-AUTH-007 — GET /users/me returns 401 without token

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | No Authorization header |

**Test Steps:**

1. Send `GET /users/me` without `Authorization` header

**Expected Result:**

- HTTP **401 Unauthorized**
- Response message: `"Unauthorized"`

---

### FunctionalTestCase-API-AUTH-008 — GET /users/refresh returns new token

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-007 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Valid JWT from login |

**Test Steps:**

1. Login and obtain `access_token`
2. Send `GET /users/refresh` with `Authorization: Bearer <token>`

**Expected Result:**

- HTTP **200 OK**
- Response contains refreshed `access_token`

---

### FunctionalTestCase-API-AUTH-009 — GET /users/logout invalidates session

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-005 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Valid JWT from login |

**Test Steps:**

1. Login and obtain `access_token`
2. Send `GET /users/logout` with `Authorization: Bearer <token>`

**Expected Result:**

- HTTP **200 OK**
- Response message: `"Successfully logged out"`

---

### FunctionalTestCase-API-AUTH-010 — GET /users/logout returns 401 without token

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-005 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | No Authorization header |

**Test Steps:**

1. Send `GET /users/logout` without token

**Expected Result:**

- HTTP **401 Unauthorized**

---

### FunctionalTestCase-API-AUTH-011 — E2E: Login, get profile, logout

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-004, REQ-API-USR-006, REQ-API-USR-005 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Valid customer account |

**Test Steps:**

1. `POST /users/login` → capture token
2. `GET /users/me` with token → verify email matches login
3. `GET /users/logout` with token

**Expected Result:**

- Login returns JWT
- `/users/me` returns matching customer profile
- Logout succeeds with confirmation message

---

## API — Cart Creation

### Cart API Test Data

| Field | Value |
|-------|-------|
| **Product ID** | Obtain from `GET /products` (e.g. first in-stock product `id`) |
| **Add item body** | `{"product_id":"<id>","quantity":1}` |
| **Update quantity body** | `{"product_id":"<id>","quantity":2}` |

---

### FunctionalTestCase-API-CART-001 — POST /carts creates a new cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-001 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | None |

**Test Steps:**

1. Send `POST https://api.practicesoftwaretesting.com/carts`
2. Body: `{}` (empty JSON object)
3. Headers: `Content-Type: application/json`, `Accept: application/json`

**Expected Result:**

- HTTP **201 Created**
- Response contains cart `id` (ULID format)

---

### FunctionalTestCase-API-CART-002 — GET /carts/{cartId} retrieves cart details

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-003 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart ID from `POST /carts` |

**Test Steps:**

1. Create cart via `POST /carts`
2. Send `GET /carts/{cartId}`

**Expected Result:**

- HTTP **200 OK**
- Response contains `id` and `cart_items` array

---

### FunctionalTestCase-API-CART-003 — POST /carts/{id} adds product to cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart ID; valid product ID from `GET /products` |

**Test Steps:**

1. Create cart via `POST /carts`
2. Get product ID from `GET /products`
3. Send `POST /carts/{cartId}` with body `{"product_id":"<id>","quantity":1}`

**Expected Result:**

- HTTP **200 OK**
- Response: `{"result":"item added or updated"}`

---

### FunctionalTestCase-API-CART-004 — PUT /carts/{cartId}/product/quantity updates item quantity

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-004 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Cart with at least one item |

**Test Steps:**

1. Create cart and add a product (quantity 1)
2. Send `PUT /carts/{cartId}/product/quantity` with `{"product_id":"<id>","quantity":3}`
3. `GET /carts/{cartId}` to verify

**Expected Result:**

- HTTP **200 OK**
- Cart item quantity updated to 3

---

### FunctionalTestCase-API-CART-005 — DELETE /carts/{cartId}/product/{productId} removes item

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-005 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Cart with at least one item |

**Test Steps:**

1. Create cart and add a product
2. Send `DELETE /carts/{cartId}/product/{productId}`
3. `GET /carts/{cartId}` to verify

**Expected Result:**

- HTTP **200 OK**
- Product removed from `cart_items`

---

### FunctionalTestCase-API-CART-006 — DELETE /carts/{cartId} deletes cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-002 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart ID |

**Test Steps:**

1. Create cart via `POST /carts`
2. Send `DELETE /carts/{cartId}`
3. Attempt `GET /carts/{cartId}`

**Expected Result:**

- DELETE returns HTTP **200 OK**
- Subsequent GET returns **404 Not Found**

---

### FunctionalTestCase-API-CART-007 — GET /carts/{cartId} returns 404 for non-existent cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-003 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | None |

**Test Steps:**

1. Send `GET /carts/nonexistent-cart-id-00000`

**Expected Result:**

- HTTP **404 Not Found**

---

### FunctionalTestCase-API-CART-008 — POST /carts/{id} returns 422 for invalid product_id

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart ID |

**Test Steps:**

1. Create cart via `POST /carts`
2. Send `POST /carts/{cartId}` with invalid `product_id` or missing `quantity`

**Expected Result:**

- HTTP **422 Unprocessable Entity** with validation errors

---

### FunctionalTestCase-API-CART-009 — E2E: Create cart, add item, verify cart contents

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-CART-001, REQ-API-CART-003, REQ-API-CART-006 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Valid product available via `GET /products` |

**Test Steps:**

1. `POST /carts` → save `cartId`
2. `GET /products` → save `productId`
3. `POST /carts/{cartId}` with `{"product_id":"<productId>","quantity":2}`
4. `GET /carts/{cartId}`

**Expected Result:**

- Cart created with valid ID
- Item added successfully
- GET response shows `cart_items` with correct `product_id`, `quantity: 2`, and nested `product` details (name, price)

---

---

## API — Product Selection

### Product API Test Data

| Field | Value |
|-------|-------|
| **Search query** | `hammer` (3+ characters) |
| **Invalid product ID** | `nonexistent-product-id-00000` |

---

### FunctionalTestCase-API-PRD-001 — GET /products returns paginated product list

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-001 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | None |

**Test Steps:**

1. Send `GET https://api.practicesoftwaretesting.com/products`
2. Headers: `Accept: application/json`

**Expected Result:**

- HTTP **200 OK**
- Response contains paginated structure with `data` array
- Each product includes `id`, `name`, `price`, `in_stock`

---

### FunctionalTestCase-API-PRD-002 — GET /products/{productId} returns product details

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-007 |
| **Priority** | P2 |
| **Suite Type** | Smoke |
| **Preconditions** | Valid `productId` from `GET /products` |

**Test Steps:**

1. `GET /products` → save first product `id`
2. Send `GET /products/{productId}`

**Expected Result:**

- HTTP **200 OK**
- Response contains `id`, `name`, `description`, `price`, category, and brand details

---

### FunctionalTestCase-API-PRD-003 — GET /products/search returns matching products

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-004 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | None |

**Test Steps:**

1. Send `GET /products/search?q=hammer`

**Expected Result:**

- HTTP **200 OK**
- Response `data` array contains products matching search term (e.g. hammer products)

---

### FunctionalTestCase-API-PRD-004 — GET /products/{productId}/related returns related products

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-010 |
| **Priority** | P3 |
| **Suite Type** | Regression |
| **Preconditions** | Valid `productId` |

**Test Steps:**

1. `GET /products` → save `productId`
2. Send `GET /products/{productId}/related`

**Expected Result:**

- HTTP **200 OK**
- Response returns a list of related products

---

### FunctionalTestCase-API-PRD-005 — GET /products/{productId} returns 404 for invalid ID

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-007 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | None |

**Test Steps:**

1. Send `GET /products/nonexistent-product-id-00000`

**Expected Result:**

- HTTP **404 Not Found**

---

### FunctionalTestCase-API-PRD-006 — Product selection data used for cart add item

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-001, REQ-API-PRD-007, REQ-API-CART-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart ID |

**Test Steps:**

1. `GET /products` → select product with `in_stock: true`; save `productId` and `price`
2. `POST /carts/{cartId}` with `{"product_id":"<productId>","quantity":1}`
3. `GET /carts/{cartId}`

**Expected Result:**

- Selected product `id` and `name` match in cart line item
- Cart item `product.price` matches product catalog price

---

## API — Invoice Generation

### Invoice API Test Data

| Field | Value |
|-------|-------|
| **Payment method (invoice)** | `cash-on-delivery` |
| **Payment method (check)** | `Cash on Delivery` |
| **Billing street** | `123 Test Street` |
| **Billing city** | `New York` |
| **Billing state** | `NY` |
| **Billing country** | `US` |
| **Billing postcode** | `10001` |

### Invoice request body (template)

```json
{
  "cart_id": "<cartId>",
  "payment_method": "cash-on-delivery",
  "payment_details": {},
  "billing_street": "123 Test Street",
  "billing_city": "New York",
  "billing_state": "NY",
  "billing_country": "US",
  "billing_postcode": "10001"
}
```

---

### FunctionalTestCase-API-INV-001 — GET /invoices returns invoice list for authenticated user

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-001 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | Valid JWT from customer login |

**Test Steps:**

1. Login via `POST /users/login` → obtain `access_token`
2. Send `GET /invoices` with `Authorization: Bearer <token>`

**Expected Result:**

- HTTP **200 OK**
- Paginated response with `data` array containing invoices (`invoice_number`, `total`, `invoice_date`, `status`)

---

### FunctionalTestCase-API-INV-002 — GET /invoices returns 401 without token

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-001 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | No Authorization header |

**Test Steps:**

1. Send `GET /invoices` without token

**Expected Result:**

- HTTP **401 Unauthorized**

---

### FunctionalTestCase-API-INV-003 — POST /payment/check validates Cash on Delivery

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PAY-001 |
| **Priority** | P1 |
| **Suite Type** | Smoke |
| **Preconditions** | None |

**Test Steps:**

1. Send `POST /payment/check` with body `{"payment_method":"Cash on Delivery"}`

**Expected Result:**

- HTTP **200 OK**
- Response: `{"message":"Payment was successful"}`

---

### FunctionalTestCase-API-INV-004 — POST /invoices creates invoice for authenticated user

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-002 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Logged-in customer; cart with at least one item |

**Test Steps:**

1. Login → obtain JWT
2. Create cart → add product from `GET /products`
3. Send `POST /invoices` with invoice body template and `Authorization: Bearer <token>`

**Expected Result:**

- HTTP **201 Created**
- Response contains `id`, `invoice_number`, `invoice_date`, `subtotal`, `total`, billing fields

---

### FunctionalTestCase-API-INV-005 — POST /invoices returns 401 without token

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-002 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid cart with items; no Authorization header |

**Test Steps:**

1. Send `POST /invoices` with valid body but no JWT

**Expected Result:**

- HTTP **401 Unauthorized**

---

### FunctionalTestCase-API-INV-006 — POST /invoices returns 422 for invalid payment method

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-002, REQ-API-PAY-001 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Valid JWT; cart with items |

**Test Steps:**

1. Send `POST /invoices` with `payment_method: "Cash on Delivery"` (UI label, not API value)

**Expected Result:**

- HTTP **422 Unprocessable Entity**
- Validation error on `payment_method`

---

### FunctionalTestCase-API-INV-007 — GET /invoices/{invoiceId} returns invoice detail

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-006 |
| **Priority** | P1 |
| **Suite Type** | Regression |
| **Preconditions** | Existing invoice ID from `POST /invoices` or `GET /invoices` |

**Test Steps:**

1. Login → obtain JWT
2. Send `GET /invoices/{invoiceId}` with Bearer token

**Expected Result:**

- HTTP **200 OK**
- Invoice detail includes `invoice_number`, `total`, billing address, and line items

---

### FunctionalTestCase-API-INV-008 — GET /invoices/{invoice_number}/download-pdf-status returns PDF status

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-INV-011 |
| **Priority** | P2 |
| **Suite Type** | Regression |
| **Preconditions** | Valid invoice number from completed order |

**Test Steps:**

1. Login → obtain JWT
2. Send `GET /invoices/{invoice_number}/download-pdf-status` with Bearer token

**Expected Result:**

- HTTP **200 OK**
- Response indicates PDF generation status (e.g. pending or complete)

---

## API — E2E

### FunctionalTestCase-API-E2E-001 — E2E: Register via API, login, obtain bearer token, create cart

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-USR-008, REQ-API-USR-004, REQ-API-USR-006, REQ-API-CART-001 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Unique email available; API base URL reachable |

**Test Data:**

| Field | Value |
|-------|-------|
| Email | `apitest_<timestamp>@example.com` |
| Password | `QaTest@<timestamp>!` (unique, meets password policy) |
| Registration body | See API — User Authentication registration template |

**Test Steps:**

1. **Register** — Send `POST /users/register` with valid unique registration JSON
2. Verify HTTP **201 Created**; save registered `email` and `password`
3. **Login** — Send `POST /users/login` with the registered `email` and `password`
4. Verify HTTP **200 OK**; save `access_token` from response
5. **Verify token** — Send `GET /users/me` with header `Authorization: Bearer <access_token>`
6. Verify profile `email` matches the registered email
7. **Create cart** — Send `POST /carts` with header `Authorization: Bearer <access_token>` and body `{}`
8. Verify HTTP **201 Created**; response contains cart `id`

**Expected Result:**

- User registered successfully via API
- Login with registered credentials returns valid JWT (`access_token`, `token_type: bearer`)
- Bearer token works for authenticated endpoint (`GET /users/me` returns matching profile)
- New cart created successfully with valid cart `id`
- Full flow completes: **register → login → bearer token → create cart**

---

### FunctionalTestCase-API-E2E-002 — E2E: Product selection to invoice generation (authenticated)

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-001, REQ-API-PRD-007, REQ-API-CART-001, REQ-API-CART-006, REQ-API-PAY-001, REQ-API-INV-002, REQ-API-INV-006 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Customer account available |

**Test Steps:**

1. `POST /users/login` → save `access_token`
2. `GET /products` → select in-stock product; save `productId`
3. `GET /products/{productId}` → verify product details
4. `POST /carts` → save `cartId`
5. `POST /carts/{cartId}` → add selected product (quantity 1)
6. `POST /payment/check` → `{"payment_method":"Cash on Delivery"}`
7. `POST /invoices` with Bearer token and invoice body (`payment_method: cash-on-delivery`)
8. `GET /invoices` → verify new invoice in list
9. `GET /invoices/{invoiceId}` → verify line items and total

**Expected Result:**

- Product selected from catalog and added to cart
- Payment pre-check succeeds
- Invoice created with `invoice_number`, matching `subtotal`/`total`
- Invoice appears in list and detail endpoints with correct product line item

---

### FunctionalTestCase-API-E2E-003 — E2E: Multi-product selection to invoice with line items

| Field | Value |
|-------|-------|
| **Requirement ID** | REQ-API-PRD-001, REQ-API-CART-006, REQ-API-CART-004, REQ-API-INV-002, REQ-API-INV-006 |
| **Priority** | P1 |
| **Suite Type** | E2E |
| **Preconditions** | Customer logged in; at least 2 in-stock products |

**Test Steps:**

1. Login → obtain JWT
2. `GET /products` → select **two** different in-stock products
3. `POST /carts` → save `cartId`
4. `POST /carts/{cartId}` → add product A (qty 1)
5. `POST /carts/{cartId}` → add product B (qty 1)
6. `PUT /carts/{cartId}/product/quantity` → update product A to qty 2
7. `POST /payment/check` then `POST /invoices` with valid billing and `cash-on-delivery`
8. `GET /invoices/{invoiceId}` → verify both products in line items with correct quantities

**Expected Result:**

- Cart contains 2 products with updated quantity on product A
- Invoice generated with both line items
- Invoice `total` reflects combined product prices and quantities
- Full flow: **select products → cart → invoice generation → verify invoice detail**

---

## Requirement Coverage Matrix

| Requirement ID | Test Case(s) |
|----------------|--------------|
| REQ-S5-REG-001 | FunctionalTestCase-REG-001, FunctionalTestCase-REG-012, FunctionalTestCase-REG-013 |
| REQ-S5-REG-002 | FunctionalTestCase-REG-002 |
| REQ-S5-REG-003 | FunctionalTestCase-REG-003 |
| REQ-S5-REG-004 | FunctionalTestCase-REG-004 – FunctionalTestCase-REG-008 |
| REQ-S5-REG-005 | FunctionalTestCase-REG-010 |
| REQ-S5-REG-006 | FunctionalTestCase-REG-009, FunctionalTestCase-REG-014 |
| REQ-S5-PROF-001 | FunctionalTestCase-REG-014 |
| REQ-S5-PROF-003 | FunctionalTestCase-REG-014 |
| REQ-S5-LOGIN-001 | FunctionalTestCase-LOGIN-001, FunctionalTestCase-LOGIN-013, FunctionalTestCase-LOGIN-014 |
| REQ-S5-LOGIN-002 | FunctionalTestCase-LOGIN-002, FunctionalTestCase-LOGIN-003, FunctionalTestCase-LOGIN-016, FunctionalTestCase-REG-014 |
| REQ-S5-LOGIN-003 | FunctionalTestCase-LOGIN-004, FunctionalTestCase-LOGIN-015 |
| REQ-S5-LOGIN-004 | FunctionalTestCase-LOGIN-005 |
| REQ-S5-LOGIN-005 | FunctionalTestCase-LOGIN-006 |
| REQ-S5-LOGIN-006 | FunctionalTestCase-LOGIN-007 |
| REQ-S5-LOGIN-007 | FunctionalTestCase-LOGIN-008 |
| REQ-S5-LOGIN-008 | FunctionalTestCase-LOGIN-009 |
| REQ-S5-LOGIN-009 | FunctionalTestCase-LOGIN-010 |
| REQ-S5-LOGIN-010 | FunctionalTestCase-LOGIN-011, FunctionalTestCase-LOGIN-012 |
| REQ-BR-013 | FunctionalTestCase-REG-002, FunctionalTestCase-REG-011 |
| REQ-BR-014 | FunctionalTestCase-REG-004 – FunctionalTestCase-REG-008 |
| REQ-BR-015 | FunctionalTestCase-REG-009, FunctionalTestCase-REG-012 |
| REQ-BR-016 | FunctionalTestCase-REG-010 |
| REQ-BR-017 | FunctionalTestCase-LOGIN-002, FunctionalTestCase-LOGIN-004, FunctionalTestCase-LOGIN-015 |
| REQ-BR-018 | FunctionalTestCase-LOGIN-005 |
| REQ-BR-019 | FunctionalTestCase-LOGIN-010 |
| REQ-S5-PO-001 | FunctionalTestCase-PUR-001, FunctionalTestCase-PUR-028 |
| REQ-S5-PO-002 | FunctionalTestCase-PUR-002, FunctionalTestCase-PUR-027, FunctionalTestCase-PUR-028 |
| REQ-S5-PO-004 | FunctionalTestCase-PUR-006 |
| REQ-S5-PO-005 | FunctionalTestCase-PUR-007 |
| REQ-S5-PO-009 | FunctionalTestCase-PUR-008 |
| REQ-S5-PD-001 | FunctionalTestCase-PUR-003 |
| REQ-S5-PD-008 | FunctionalTestCase-PUR-004, FunctionalTestCase-PUR-027, FunctionalTestCase-PUR-028 |
| REQ-S5-PD-009 | FunctionalTestCase-PUR-005 |
| REQ-S5-PD-010 | FunctionalTestCase-PUR-024 |
| REQ-S5-CC-CART-001 | FunctionalTestCase-PUR-010, FunctionalTestCase-PUR-028 |
| REQ-S5-CC-CART-002 | FunctionalTestCase-PUR-011, FunctionalTestCase-PUR-028 |
| REQ-S5-CC-CART-003 | FunctionalTestCase-PUR-012 |
| REQ-S5-CC-CART-004 | FunctionalTestCase-PUR-009 |
| REQ-S5-CC-CART-005 | FunctionalTestCase-PUR-027, FunctionalTestCase-PUR-028 |
| REQ-S5-CC-CART-007 | FunctionalTestCase-PUR-025 |
| REQ-S5-CC-CART-008 | FunctionalTestCase-PUR-026 |
| REQ-S5-CC-SIGNIN-001 | FunctionalTestCase-PUR-014 |
| REQ-S5-CC-SIGNIN-004 | FunctionalTestCase-PUR-015, FunctionalTestCase-PUR-027 |
| REQ-S5-CC-SIGNIN-005 | FunctionalTestCase-PUR-016 |
| REQ-S5-CC-ADDR-002 | FunctionalTestCase-PUR-017 |
| REQ-S5-CC-ADDR-003 | FunctionalTestCase-PUR-018, FunctionalTestCase-PUR-027 |
| REQ-S5-CC-ADDR-004 | FunctionalTestCase-PUR-016 |
| REQ-S5-CC-PAY-001 | FunctionalTestCase-PUR-019 |
| REQ-S5-CC-PAY-002 | FunctionalTestCase-PUR-023 |
| REQ-S5-CC-PAY-003 | FunctionalTestCase-PUR-021 |
| REQ-S5-CC-PAY-004 | FunctionalTestCase-PUR-022 |
| REQ-S5-CC-PAY-007 | FunctionalTestCase-PUR-020, FunctionalTestCase-PUR-027, FunctionalTestCase-PUR-028 |
| REQ-S5-CC-PAY-009 | FunctionalTestCase-PUR-020, FunctionalTestCase-PUR-021, FunctionalTestCase-PUR-027, FunctionalTestCase-PUR-028 |
| REQ-S5-RENT-003 | FunctionalTestCase-PUR-024 |
| REQ-S5-RENT-004 | FunctionalTestCase-PUR-013, FunctionalTestCase-PUR-024 |
| REQ-S5-COMBO-001 | FunctionalTestCase-PUR-025 |
| REQ-S5-COMBO-003 | FunctionalTestCase-PUR-026 |
| REQ-S5-INV-001 | FunctionalTestCase-PUR-028 |
| REQ-S5-INV-002 | FunctionalTestCase-PUR-028 |
| REQ-BR-001 | FunctionalTestCase-PUR-005 |
| REQ-BR-003 | FunctionalTestCase-PUR-024 |
| REQ-BR-005 | FunctionalTestCase-PUR-006 |
| REQ-BR-007 | FunctionalTestCase-PUR-009 |
| REQ-BR-008 | FunctionalTestCase-PUR-011 |
| REQ-BR-009 | FunctionalTestCase-PUR-004 |
| REQ-BR-010 | FunctionalTestCase-PUR-025 |
| REQ-BR-011 | FunctionalTestCase-PUR-026 |
| REQ-BR-020 | FunctionalTestCase-PUR-014 |
| REQ-API-USR-004 | FunctionalTestCase-API-AUTH-001, FunctionalTestCase-API-AUTH-002, FunctionalTestCase-API-AUTH-003, FunctionalTestCase-API-AUTH-011, FunctionalTestCase-API-E2E-001 |
| REQ-API-USR-005 | FunctionalTestCase-API-AUTH-009, FunctionalTestCase-API-AUTH-010, FunctionalTestCase-API-AUTH-011 |
| REQ-API-USR-006 | FunctionalTestCase-API-AUTH-006, FunctionalTestCase-API-AUTH-007, FunctionalTestCase-API-AUTH-011, FunctionalTestCase-API-E2E-001 |
| REQ-API-USR-007 | FunctionalTestCase-API-AUTH-008 |
| REQ-API-USR-008 | FunctionalTestCase-API-AUTH-004, FunctionalTestCase-API-AUTH-005, FunctionalTestCase-API-E2E-001 |
| REQ-API-CART-001 | FunctionalTestCase-API-CART-001, FunctionalTestCase-API-CART-009, FunctionalTestCase-API-E2E-001, FunctionalTestCase-API-E2E-002, FunctionalTestCase-API-E2E-003 |
| REQ-API-CART-002 | FunctionalTestCase-API-CART-006 |
| REQ-API-CART-003 | FunctionalTestCase-API-CART-002, FunctionalTestCase-API-CART-007, FunctionalTestCase-API-CART-009 |
| REQ-API-CART-004 | FunctionalTestCase-API-CART-004, FunctionalTestCase-API-E2E-003 |
| REQ-API-CART-005 | FunctionalTestCase-API-CART-005 |
| REQ-API-CART-006 | FunctionalTestCase-API-CART-003, FunctionalTestCase-API-CART-008, FunctionalTestCase-API-CART-009, FunctionalTestCase-API-PRD-006, FunctionalTestCase-API-E2E-002, FunctionalTestCase-API-E2E-003 |
| REQ-API-PRD-001 | FunctionalTestCase-API-PRD-001, FunctionalTestCase-API-PRD-006, FunctionalTestCase-API-E2E-002, FunctionalTestCase-API-E2E-003 |
| REQ-API-PRD-004 | FunctionalTestCase-API-PRD-003 |
| REQ-API-PRD-007 | FunctionalTestCase-API-PRD-002, FunctionalTestCase-API-PRD-005, FunctionalTestCase-API-PRD-006, FunctionalTestCase-API-E2E-002 |
| REQ-API-PRD-010 | FunctionalTestCase-API-PRD-004 |
| REQ-API-INV-001 | FunctionalTestCase-API-INV-001, FunctionalTestCase-API-INV-002 |
| REQ-API-INV-002 | FunctionalTestCase-API-INV-004, FunctionalTestCase-API-INV-005, FunctionalTestCase-API-INV-006, FunctionalTestCase-API-E2E-002, FunctionalTestCase-API-E2E-003 |
| REQ-API-INV-006 | FunctionalTestCase-API-INV-007, FunctionalTestCase-API-E2E-002, FunctionalTestCase-API-E2E-003 |
| REQ-API-INV-011 | FunctionalTestCase-API-INV-008 |
| REQ-API-PAY-001 | FunctionalTestCase-API-INV-003, FunctionalTestCase-API-INV-006, FunctionalTestCase-API-E2E-002 |

---

*Generated from `Application_Context.md`, `requirements_document.md`, and `risk_analysis.md` per `test-case-standards.mdc`.*
