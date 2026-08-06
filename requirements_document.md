# Requirements Document — Practice Software Testing

> **Application:** [practicesoftwaretesting.com](https://practicesoftwaretesting.com)  
> **Derived from:** [`Application_Context.md`](Application_Context.md)  
> **Official source:** [Practice Software Testing Documentation](https://testsmith-io.github.io/practice-software-testing/#/)  
> **Version:** Sprint 5 (Full Platform)  
> **Total requirements:** 440

---

## 1. Document Purpose

This requirements document extracts testable requirements from `Application_Context.md`, including:

- **305 functional acceptance criteria** from Sprint 1–5 user stories (§10)
- **87 REST API endpoint coverage requirements** from the Sprint 5 OpenAPI spec (§6)
- **42 business rules** from application business logic (§4)
- **6 role-based access control rules** (§2)

Each requirement has a unique **Requirement ID** and an **Acceptance Source** traceable to the original documentation.

---

## 2. Requirement ID Convention

| Prefix | Format | Example | Description |
|--------|--------|---------|-------------|
| `REQ-S{n}-` | `REQ-S{sprint}-{module}-{ac}` | `REQ-S5-PO-010` | Functional acceptance criterion from Sprint user stories |
| `REQ-BR-` | `REQ-BR-{nnn}` | `REQ-BR-012` | Business rule from Application Context §4 |
| `REQ-RBAC-` | `REQ-RBAC-{nnn}` | `REQ-RBAC-003` | Role-based access rule from Application Context §2 |
| `REQ-API-` | `REQ-API-{module}-{nnn}` | `REQ-API-PRD-001` | REST API endpoint coverage from Application Context §6 |

### Module Codes (Functional Requirements)

| Code | Module |
|------|--------|
| `ADMIN` | Admin Dashboard |
| `CAT` | Browse Products by Category |
| `CC-ADDR` | Checkout – Billing Address |
| `CC-CART` | Checkout – Cart Review |
| `CC-PAY` | Checkout – Payment (Basic) |
| `CC-PAY` | Checkout – Payment (Advanced) |
| `CC-SIGNIN` | Checkout – Sign In |
| `CF` | Contact Form |
| `CFA` | Contact Form (Advanced) |
| `CHAT` | Chat Widget |
| `COMBO` | Combination Discount |
| `CPWD` | Change Password |
| `FAV` | Favorites |
| `FBRD` | Filtering by Brand |
| `FCAT` | Filtering by Category |
| `FP` | Forgot Password |
| `GEO` | Geo-Location Discount |
| `I18N` | Multi-Language Support |
| `INV` | Invoices |
| `LOGIN` | User Login |
| `MSG` | Messages |
| `PAG` | Pagination |
| `PD` | Product Detail |
| `PO` | Product Overview |
| `PRIV` | Privacy Policy |
| `PROF` | Customer Profile |
| `REG` | User Registration |
| `RENT` | Rental Products |
| `SORT` | Sorting |
| `SRCH` | Search |
| `TOTP` | Two-Factor Authentication Setup |

### Module Codes (API Requirements)

| Code | Module |
|------|--------|
| `PRD` | API — Products |
| `PSPEC` | API — Product Specs |
| `CAT` | API — Categories |
| `BRD` | API — Brands |
| `IMG` | API — Images |
| `CART` | API — Carts |
| `INV` | API — Invoices & Orders |
| `PAY` | API — Payment |
| `USR` | API — Users & Authentication |
| `FAV` | API — Favorites |
| `MSG` | API — Contact Messages |
| `TOTP` | API — TOTP |
| `PCL` | API — Postcode Lookup |
| `RPT` | API — Reports (Admin) |

### API Coverage Tiers

| Tier | Description | Count |
|------|-------------|-------|
| **Smoke** | Critical-path endpoints validated on every build (auth, catalog, cart, invoices, payment) | 8 |
| **Regression** | Full contract validation — public endpoints, search/filter, guest flows | 28 |
| **Regression (Auth)** | Authenticated customer endpoints — 401 without token, owner-only access | 24 |
| **Regression (Admin)** | Admin-only CRUD and reports — 403 for customer tokens | 27 |

---

## 3. Requirements Summary by Sprint

| Sprint | Functional ACs | Modules |
|--------|----------------|---------|
| Sprint 1 | 14 | Browse Products by Category, Contact Form, Product Detail, Product Overview |
| Sprint 2 | 28 | Browse Products by Category, Contact Form, Product Detail, Product Overview |
| Sprint 3 | 38 | Browse Products by Category, Checkout – Billing Address, Checkout – Cart Review, Checkout – Payment (Basic), Contact Form, Product Detail, Product Overview, Rental Products |
| Sprint 4 | 79 | Browse Products by Category, Change Password, Checkout – Billing Address, Checkout – Cart Review, Checkout – Payment (Basic), Checkout – Sign In, Contact Form, Customer Profile, Favorites, Forgot Password, Invoices, Messages, Product Detail, Product Overview, Rental Products, User Login, User Registration |
| Sprint 5 | 146 | Admin Dashboard, Browse Products by Category, Change Password, Chat Widget, Checkout – Billing Address, Checkout – Cart Review, Checkout – Payment (Advanced), Checkout – Sign In, Combination Discount, Contact Form (Advanced), Customer Profile, Favorites, Forgot Password, Geo-Location Discount, Invoices, Messages, Multi-Language Support, Privacy Policy, Product Detail, Product Overview, Rental Products, Two-Factor Authentication Setup, User Login, User Registration |

| Type | Count | Acceptance Source |
|------|-------|-------------------|
| REST API Coverage | 87 | Application_Context.md §6 · [OpenAPI Spec](https://api.practicesoftwaretesting.com/docs?api-docs.json) |
| Business Rules | 42 | Application_Context.md §4 |
| Role-Based Access | 6 | Application_Context.md §2 |

### API Coverage Summary by Module

| Module | Endpoints | Smoke | Regression | Auth | Admin |
|--------|:---------:|:-----:|:----------:|:----:|:-----:|
| Products | 10 | 2 | 4 | — | 4 |
| Product Specs | 6 | — | 2 | — | 4 |
| Categories | 10 | 1 | 4 | — | 5 |
| Brands | 8 | 1 | 3 | — | 4 |
| Images | 1 | — | 1 | — | — |
| Carts | 6 | 1 | 5 | — | — |
| Invoices & Orders | 11 | 1 | 2 | 7 | 1 |
| Payment | 1 | 1 | — | — | — |
| Users & Authentication | 14 | 1 | 3 | 4 | 6 |
| Favorites | 4 | — | — | 4 | — |
| Contact Messages | 6 | — | — | 5 | 1 |
| TOTP | 2 | — | — | 2 | — |
| Postcode Lookup | 1 | — | 1 | — | — |
| Reports (Admin) | 7 | — | — | — | 7 |
| **Total** | **87** | **8** | **28** | **24** | **27** |

---

## 4. Detailed Requirements

> Full machine-readable export: [`requirements_document.csv`](requirements_document.csv)

### Sprint 1

#### Browse Products by Category

**User Story:** As a visitor, I want to browse products within a specific category, so that I can find products of a particular type.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S1-CAT-001 | AC1 – Category page is displayed | Given I click on a category name Then a page with products belonging to that category is displayed. | Sprint 1 User Stories — Browse Products by Category — AC1 – Category page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CAT-002 | AC2 – Category title | Given the category page is displayed Then the category name is shown as the page title. | Sprint 1 User Stories — Browse Products by Category — AC2 – Category title \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CAT-003 | AC3 – Products from selected category | Given the category page is displayed Then only products belonging to the selected category are shown. | Sprint 1 User Stories — Browse Products by Category — AC3 – Products from selected category \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |

#### Contact Form

**User Story:** As a visitor, I want to send a message through a contact form, so that I can reach out for support or other inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S1-CF-001 | AC1 – Contact form is accessible | Given I navigate to the contact page Then a contact form is displayed. | Sprint 1 User Stories — Contact Form — AC1 – Contact form is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CF-002 | AC2 – Required fields | Given the contact form is displayed Then the following fields are shown: - First name (required) - Last name (required) - Email (required, must be valid format) - Subject (required, dropdown) - Message (required, minimum 50 characters) | Sprint 1 User Stories — Contact Form — AC2 – Required fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CF-003 | AC3 – Subject options | Given the subject dropdown is displayed Then it includes the following options: - Customer service - Webmaster - Return - Payments - Warranty - Status of order | Sprint 1 User Stories — Contact Form — AC3 – Subject options \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CF-004 | AC4 – Message minimum length | Given I enter a message with fewer than 50 characters Then a validation error is shown indicating the message must be at least 50 characters. | Sprint 1 User Stories — Contact Form — AC4 – Message minimum length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-CF-005 | AC5 – Successful submission | Given all required fields are filled in with valid data When I submit the contact form Then a confirmation message is displayed And the form is hidden. | Sprint 1 User Stories — Contact Form — AC5 – Successful submission \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |

#### Product Detail

**User Story:** As a visitor, I want to view the full details of a product, so that I can learn more about it before deciding to purchase.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S1-PD-001 | AC1 – Product detail page is displayed | Given I click on a product from the overview or category page Then the product detail page is displayed. | Sprint 1 User Stories — Product Detail — AC1 – Product detail page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-PD-002 | AC2 – Product information shown | Given the product detail page is displayed Then the following information is shown: - product image - product name - product description - product price - category badge - brand badge | Sprint 1 User Stories — Product Detail — AC2 – Product information shown \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-PD-003 | AC3 – Related products | Given the product detail page is displayed Then a section with related products is shown below the main product information And each related product is clickable and navigates to its detail page. | Sprint 1 User Stories — Product Detail — AC3 – Related products \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |

#### Product Overview

**User Story:** As a visitor, I want to see an overview of all available products, so that I can browse the catalog and find items of interest.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S1-PO-001 | AC1 – Product overview is displayed | Given I navigate to the home page Then a grid of product cards is displayed showing all products. | Sprint 1 User Stories — Product Overview — AC1 – Product overview is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-PO-002 | AC2 – Product card information | Given the product overview is displayed Then each product card shows: - a product image - the product name - the product price | Sprint 1 User Stories — Product Overview — AC2 – Product card information \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |
| REQ-S1-PO-003 | AC3 – Navigating to product detail | Given the product overview is displayed When I click on a product card Then I am navigated to the product detail page for that product. | Sprint 1 User Stories — Product Overview — AC3 – Navigating to product detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v1.md \| Application_Context.md §10 |

### Sprint 2

#### Browse Products by Category

**User Story:** As a visitor, I want to browse products within a specific category with filtering, sorting, and pagination, so that I can find specific products within a category.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S2-CAT-001 | AC1 – Category page is displayed | Given I click on a category name Then a page with products belonging to that category is displayed And the category name is shown as the page title. | Sprint 2 User Stories — Browse Products by Category — AC1 – Category page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-CAT-002 | AC2 – Filters available | Given the category page is displayed Then the same filters as the product overview are available: - category checkboxes (subcategory tree) - brand checkboxes - sorting dropdown - pagination controls | Sprint 2 User Stories — Browse Products by Category — AC2 – Filters available \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |

#### Contact Form

**User Story:** As a visitor, I want to send a message through a contact form, so that I can reach out for support or other inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S2-CF-001 | AC1 – Contact form is accessible | Given I navigate to the contact page Then a contact form is displayed. | Sprint 2 User Stories — Contact Form — AC1 – Contact form is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-CF-002 | AC2 – Required fields | Given the contact form is displayed Then the following fields are shown: - First name (required) - Last name (required) - Email (required, must be valid format) - Subject (required, dropdown) - Message (required, minimum 50 characters) | Sprint 2 User Stories — Contact Form — AC2 – Required fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-CF-003 | AC3 – Subject options | Given the subject dropdown is displayed Then it includes the following options: - Customer service - Webmaster - Return - Payments - Warranty - Status of order | Sprint 2 User Stories — Contact Form — AC3 – Subject options \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-CF-004 | AC4 – Message minimum length | Given I enter a message with fewer than 50 characters Then a validation error is shown indicating the message must be at least 50 characters. | Sprint 2 User Stories — Contact Form — AC4 – Message minimum length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-CF-005 | AC5 – Successful submission | Given all required fields are filled in with valid data When I submit the contact form Then a confirmation message is displayed And the form is hidden. | Sprint 2 User Stories — Contact Form — AC5 – Successful submission \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |

#### Product Detail

**User Story:** As a visitor, I want to view the full details of a product, so that I can learn more about it.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S2-PD-001 | AC1 – Product information shown | Given I am on the product detail page Then the following information is shown: - product image - product name - product description - product price - category badge - brand badge | Sprint 2 User Stories — Product Detail — AC1 – Product information shown \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PD-002 | AC2 – Related products | Given the product detail page is displayed Then a section with related products is shown below the main product information And each related product is clickable and navigates to its detail page. | Sprint 2 User Stories — Product Detail — AC2 – Related products \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |

#### Product Overview

**User Story:** As a visitor, I want to browse a paginated overview of all products with the ability to search, filter, and sort, so that I can efficiently find products of interest.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S2-PO-001 | AC1 – Product grid is displayed | Given I navigate to the home page Then a grid of product cards is displayed And each card shows a product image, name, and price. | Sprint 2 User Stories — Product Overview — AC1 – Product grid is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-002 | AC2 – Navigating to product detail | Given the product overview is displayed When I click on a product card Then I am navigated to the product detail page. | Sprint 2 User Stories — Product Overview — AC2 – Navigating to product detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-003 | AC3 – Pagination controls displayed | Given there are more products than fit on one page Then pagination controls are displayed below the product grid. | Sprint 2 User Stories — Product Overview — AC3 – Pagination controls displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-004 | AC4 – Page navigation | Given pagination controls are displayed When I click a page number Then the product grid updates to show products for that page And the current page number is visually highlighted. | Sprint 2 User Stories — Product Overview — AC4 – Page navigation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-005 | AC5 – Search input is displayed | Given I am on the product overview page Then a search input field is displayed. | Sprint 2 User Stories — Product Overview — AC5 – Search input is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-006 | AC6 – Minimum search length | Given I enter fewer than 3 characters in the search field When I submit the search Then the search is not executed and a validation error is shown. | Sprint 2 User Stories — Product Overview — AC6 – Minimum search length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-007 | AC7 – Maximum search length | Given I am entering a search query Then the search input accepts a maximum of 40 characters. | Sprint 2 User Stories — Product Overview — AC7 – Maximum search length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-008 | AC8 – Search results displayed | Given I enter a valid search query (3–40 characters) When I submit the search Then the product grid updates to show only matching products. | Sprint 2 User Stories — Product Overview — AC8 – Search results displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-009 | AC9 – Search resets filters | Given I have active filters (category, brand, sorting) When I submit a search query Then all active filters are reset to their defaults. | Sprint 2 User Stories — Product Overview — AC9 – Search resets filters \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-010 | AC10 – Category filter is displayed | Given I am on the product overview page Then a list of category checkboxes is displayed in the sidebar. | Sprint 2 User Stories — Product Overview — AC10 – Category filter is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-011 | AC11 – Hierarchical categories | Given the category filter is displayed Then categories are shown in a tree structure with parent and child categories. | Sprint 2 User Stories — Product Overview — AC11 – Hierarchical categories \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-012 | AC12 – Selecting a parent category | Given a parent category has child categories When I check the parent category checkbox Then all child category checkboxes are also checked And the product grid updates to show products from all those categories. | Sprint 2 User Stories — Product Overview — AC12 – Selecting a parent category \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-013 | AC13 – Deselecting child categories | Given all child categories of a parent are checked When I uncheck all child category checkboxes Then the parent category checkbox is also unchecked. | Sprint 2 User Stories — Product Overview — AC13 – Deselecting child categories \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-014 | AC14 – Brand filter is displayed | Given I am on the product overview page Then a list of brand checkboxes is displayed in the sidebar. | Sprint 2 User Stories — Product Overview — AC14 – Brand filter is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-015 | AC15 – Selecting a brand | Given the brand filter is displayed When I check one or more brand checkboxes Then the product grid updates to show only products from the selected brands. | Sprint 2 User Stories — Product Overview — AC15 – Selecting a brand \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-016 | AC16 – Combining filters | Given I have selected one or more categories When I also select one or more brands Then the product grid shows only products matching both the selected categories and brands. | Sprint 2 User Stories — Product Overview — AC16 – Combining filters \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-017 | AC17 – Sort dropdown is displayed | Given I am on the product overview page Then a sorting dropdown is displayed. | Sprint 2 User Stories — Product Overview — AC17 – Sort dropdown is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-018 | AC18 – Sort options | Given the sort dropdown is displayed Then it includes the following options: - Name (A - Z) - Name (Z - A) - Price (High - Low) - Price (Low - High) | Sprint 2 User Stories — Product Overview — AC18 – Sort options \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |
| REQ-S2-PO-019 | AC19 – Applying a sort | Given I select a sort option Then the product grid reloads with products ordered according to the selected sort. | Sprint 2 User Stories — Product Overview — AC19 – Applying a sort \| https://testsmith-io.github.io/practice-software-testing/user-stories/v2.md \| Application_Context.md §10 |

### Sprint 3

#### Browse Products by Category

**User Story:** As a visitor, I want to browse products within a specific category with filtering, sorting, and pagination, so that I can find specific products within a category.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-CAT-001 | AC1 – Category page is displayed | Given I click on a category name Then a page with products belonging to that category is displayed And the category name is shown as the page title. | Sprint 3 User Stories — Browse Products by Category — AC1 – Category page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CAT-002 | AC2 – Filters available | Given the category page is displayed Then the same filters as the product overview are available: - category checkboxes (subcategory tree) - brand checkboxes - sorting dropdown - pagination controls | Sprint 3 User Stories — Browse Products by Category — AC2 – Filters available \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Checkout – Billing Address

**User Story:** As a customer, I want to enter my billing address, so that my invoice contains the correct address.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-CC-ADDR-001 | AC1 – Address form fields | Given I am on the billing address step Then the following required fields are displayed: - Street (max 70 characters) - City (max 40 characters) - State (max 40 characters) - Country (max 40 characters) - Postal code (max 10 characters) | Sprint 3 User Stories — Checkout – Billing Address — AC1 – Address form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-ADDR-002 | AC2 – Validation | Given I leave a required field empty Then the field is highlighted as invalid And the "Proceed" button is disabled. | Sprint 3 User Stories — Checkout – Billing Address — AC2 – Validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-ADDR-003 | AC3 – Proceed to payment | Given all address fields are filled in When I click "Proceed" Then I advance to the payment step. | Sprint 3 User Stories — Checkout – Billing Address — AC3 – Proceed to payment \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Checkout – Cart Review

**User Story:** As a customer, I want to review the items in my shopping cart, so that I can verify my order is correct before proceeding.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-CC-CART-001 | AC1 – Cart contents displayed | Given I have items in my cart When I navigate to the checkout page Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions. | Sprint 3 User Stories — Checkout – Cart Review — AC1 – Cart contents displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-CART-002 | AC2 – Update quantity | Given I change the quantity of a cart item Then the item total and cart total are recalculated And a confirmation message is displayed. | Sprint 3 User Stories — Checkout – Cart Review — AC2 – Update quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-CART-003 | AC3 – Delete item | Given I click the delete button on a cart item Then the item is removed from the cart And the cart total is recalculated. | Sprint 3 User Stories — Checkout – Cart Review — AC3 – Delete item \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-CART-004 | AC4 – Empty cart | Given I have no items in my cart Then the message "Your shopping cart is empty" is displayed. | Sprint 3 User Stories — Checkout – Cart Review — AC4 – Empty cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-CART-005 | AC5 – Proceed | Given the cart contains at least one item When I click "Proceed" Then I advance to the next checkout step. | Sprint 3 User Stories — Checkout – Cart Review — AC5 – Proceed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Checkout – Payment (Basic)

**User Story:** As a customer, I want to select a payment method and provide basic payment details, so that I can complete my purchase.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-CC-PAY-001 | AC1 – Payment method selection | Given I am on the payment step Then a dropdown is displayed with options: - Bank Transfer - Cash on Delivery - Credit Card - Buy Now Pay Later - Gift Card | Sprint 3 User Stories — Checkout – Payment (Basic) — AC1 – Payment method selection \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-PAY-002 | AC2 – Payment fields | Given I select a payment method Then account name and account number fields are displayed. | Sprint 3 User Stories — Checkout – Payment (Basic) — AC2 – Payment fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CC-PAY-003 | AC3 – Successful order | Given I have selected a payment method and filled in the fields When I click the confirm button Then the order is placed And a confirmation message with the invoice number is displayed And the cart is cleared. | Sprint 3 User Stories — Checkout – Payment (Basic) — AC3 – Successful order \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Contact Form

**User Story:** As a visitor, I want to send a message through a contact form, so that I can reach out for support or other inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-CF-001 | AC1 – Contact form is accessible | Given I navigate to the contact page Then a contact form is displayed. | Sprint 3 User Stories — Contact Form — AC1 – Contact form is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CF-002 | AC2 – Required fields | Given the contact form is displayed Then the following fields are shown: - First name (required) - Last name (required) - Email (required, must be valid format) - Subject (required, dropdown) - Message (required, minimum 50 characters) | Sprint 3 User Stories — Contact Form — AC2 – Required fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CF-003 | AC3 – Subject options | Given the subject dropdown is displayed Then it includes the following options: - Customer service - Webmaster - Return - Payments - Warranty - Status of order | Sprint 3 User Stories — Contact Form — AC3 – Subject options \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CF-004 | AC4 – Message minimum length | Given I enter a message with fewer than 50 characters Then a validation error is shown indicating the message must be at least 50 characters. | Sprint 3 User Stories — Contact Form — AC4 – Message minimum length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-CF-005 | AC5 – Successful submission | Given all required fields are filled in with valid data When I submit the contact form Then a confirmation message is displayed And the form is hidden. | Sprint 3 User Stories — Contact Form — AC5 – Successful submission \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Product Detail

**User Story:** As a visitor, I want to view a product's details and add it to my shopping cart, so that I can purchase the product.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-PD-001 | AC1 – Product information shown | Given I am on the product detail page Then the product image, name, description, price, category badge, and brand badge are shown. | Sprint 3 User Stories — Product Detail — AC1 – Product information shown \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-002 | AC2 – Quantity selector | Given the product is in stock Then a quantity input field is displayed with plus (+) and minus (-) buttons And the default quantity is 1. | Sprint 3 User Stories — Product Detail — AC2 – Quantity selector \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-003 | AC3 – Increase quantity | Given the quantity input is displayed When I click the plus button Then the quantity increases by 1. | Sprint 3 User Stories — Product Detail — AC3 – Increase quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-004 | AC4 – Decrease quantity | Given the quantity is greater than 1 When I click the minus button Then the quantity decreases by 1. | Sprint 3 User Stories — Product Detail — AC4 – Decrease quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-005 | AC5 – Minimum quantity | Given the quantity is 1 When I click the minus button Then the quantity remains at 1. | Sprint 3 User Stories — Product Detail — AC5 – Minimum quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-006 | AC6 – Manual quantity entry | Given the quantity input is displayed When I type a number directly into the input field Then the quantity is updated to the entered value And the value is clamped between 1 and 999,999,999. | Sprint 3 User Stories — Product Detail — AC6 – Manual quantity entry \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-007 | AC7 – Add to cart | Given a valid quantity is selected When I click the "Add to Cart" button Then the product is added to the cart with the selected quantity And a success message "Product added to shopping cart." is displayed. | Sprint 3 User Stories — Product Detail — AC7 – Add to cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-008 | AC8 – Out of stock | Given the product is not in stock and is not a rental item Then the "Add to Cart" button is disabled And "Out of stock" is shown in red. | Sprint 3 User Stories — Product Detail — AC8 – Out of stock \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PD-009 | AC9 – Related products | Given the product detail page is displayed Then related products are shown below the main information. | Sprint 3 User Stories — Product Detail — AC9 – Related products \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Product Overview

**User Story:** As a visitor, I want to browse a paginated overview of all products with search, filtering, and sorting, so that I can efficiently find products of interest.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-PO-001 | AC1 – Product grid is displayed | Given I navigate to the home page Then a grid of product cards is displayed And each card shows a product image, name, and price. | Sprint 3 User Stories — Product Overview — AC1 – Product grid is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-002 | AC2 – Navigating to product detail | Given the product overview is displayed When I click on a product card Then I am navigated to the product detail page. | Sprint 3 User Stories — Product Overview — AC2 – Navigating to product detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-003 | AC3 – Pagination | Given there are more products than fit on one page Then pagination controls are displayed below the product grid And clicking a page number updates the grid. | Sprint 3 User Stories — Product Overview — AC3 – Pagination \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-004 | AC4 – Search | Given I enter a valid search query (3–40 characters) and submit Then the product grid updates to show only matching products And all active filters are reset. | Sprint 3 User Stories — Product Overview — AC4 – Search \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-005 | AC5 – Category filter | Given I check one or more category checkboxes in the sidebar Then the product grid updates to show only products from those categories. | Sprint 3 User Stories — Product Overview — AC5 – Category filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-006 | AC6 – Brand filter | Given I check one or more brand checkboxes in the sidebar Then the product grid updates to show only products from those brands. | Sprint 3 User Stories — Product Overview — AC6 – Brand filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-PO-007 | AC7 – Sorting | Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High) Then the product grid reloads with products ordered accordingly. | Sprint 3 User Stories — Product Overview — AC7 – Sorting \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

#### Rental Products

**User Story:** As a visitor, I want to browse products available for rent, so that I can find tools I can rent by the hour.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S3-RENT-001 | AC1 – Rentals page is accessible | Given I navigate to the rentals page Then a list of all rental products is displayed. | Sprint 3 User Stories — Rental Products — AC1 – Rentals page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-RENT-002 | AC2 – Rental product display | Given the rentals page is displayed Then each rental product shows a product image, name, and description. | Sprint 3 User Stories — Rental Products — AC2 – Rental product display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-RENT-003 | AC3 – Rental detail page | Given I click on a rental product Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons And the total price is calculated as the hourly rate multiplied by the selected duration. | Sprint 3 User Stories — Rental Products — AC3 – Rental detail page \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |
| REQ-S3-RENT-004 | AC4 – Rental label in checkout | Given a rental item is in my cart Then the item is marked with "This is a rental item" in the checkout cart. | Sprint 3 User Stories — Rental Products — AC4 – Rental label in checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v3.md \| Application_Context.md §10 |

### Sprint 4

#### Browse Products by Category

**User Story:** As a visitor, I want to browse products within a specific category with filtering, sorting, and pagination, so that I can find specific products within a category.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CAT-001 | AC1 – Category page is displayed | Given I click on a category name Then a page with products belonging to that category is displayed And the category name is shown as the page title. | Sprint 4 User Stories — Browse Products by Category — AC1 – Category page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CAT-002 | AC2 – Filters available | Given the category page is displayed Then the same filters as the product overview are available: - category checkboxes (subcategory tree) - brand checkboxes - sorting dropdown - pagination controls | Sprint 4 User Stories — Browse Products by Category — AC2 – Filters available \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Change Password

**User Story:** As an authenticated user, I want to change my password, so that I can keep my account secure.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CPWD-001 | AC1 – Change password form | Given I am on my profile page Then a change password section is displayed with: - Current password (required) - New password (required) - Confirm new password (required) | Sprint 4 User Stories — Change Password — AC1 – Change password form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CPWD-002 | AC2 – Current password verification | Given I enter an incorrect current password When I submit the form Then the error "Your current password does not matches with the password." is displayed. | Sprint 4 User Stories — Change Password — AC2 – Current password verification \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CPWD-003 | AC3 – New password must differ | Given I enter a new password identical to the current one When I submit the form Then the error "New Password cannot be same as your current password." is displayed. | Sprint 4 User Stories — Change Password — AC3 – New password must differ \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CPWD-004 | AC4 – Passwords must match | Given the new password and confirmation do not match Then the error "Passwords do not match." is displayed. | Sprint 4 User Stories — Change Password — AC4 – Passwords must match \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CPWD-005 | AC5 – Successful change | Given I provide a valid current password and a new password that matches the confirmation When I submit the form Then a success message is displayed And I am logged out after 5 seconds. | Sprint 4 User Stories — Change Password — AC5 – Successful change \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Checkout – Billing Address

**User Story:** As a customer, I want to enter my billing address, so that my invoice contains the correct address.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CC-ADDR-001 | AC1 – Address form fields | Given I am on the billing address step Then the following required fields are displayed: - Street (max 70 characters) - City (max 40 characters) - State (max 40 characters) - Country (max 40 characters) - Postal code (max 10 characters) | Sprint 4 User Stories — Checkout – Billing Address — AC1 – Address form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-ADDR-002 | AC2 – Validation | Given I leave a required field empty Then the field is highlighted as invalid And the "Proceed" button is disabled. | Sprint 4 User Stories — Checkout – Billing Address — AC2 – Validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-ADDR-003 | AC3 – Proceed to payment | Given all address fields are filled in When I click "Proceed" Then I advance to the payment step. | Sprint 4 User Stories — Checkout – Billing Address — AC3 – Proceed to payment \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Checkout – Cart Review

**User Story:** As a customer, I want to review the items in my shopping cart, so that I can verify my order is correct before proceeding.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CC-CART-001 | AC1 – Cart contents displayed | Given I have items in my cart When I navigate to the checkout page Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions. | Sprint 4 User Stories — Checkout – Cart Review — AC1 – Cart contents displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-CART-002 | AC2 – Update quantity | Given I change the quantity of a cart item Then the item total and cart total are recalculated And a confirmation message is displayed. | Sprint 4 User Stories — Checkout – Cart Review — AC2 – Update quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-CART-003 | AC3 – Delete item | Given I click the delete button on a cart item Then the item is removed from the cart And the cart total is recalculated. | Sprint 4 User Stories — Checkout – Cart Review — AC3 – Delete item \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-CART-004 | AC4 – Empty cart | Given I have no items in my cart Then the message "Your shopping cart is empty" is displayed. | Sprint 4 User Stories — Checkout – Cart Review — AC4 – Empty cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-CART-005 | AC5 – Proceed | Given the cart contains at least one item When I click "Proceed" Then I advance to the next checkout step. | Sprint 4 User Stories — Checkout – Cart Review — AC5 – Proceed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Checkout – Payment (Basic)

**User Story:** As a customer, I want to select a payment method and provide basic payment details, so that I can complete my purchase.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CC-PAY-001 | AC1 – Payment method selection | Given I am on the payment step Then a dropdown is displayed with options: - Bank Transfer - Cash on Delivery - Credit Card - Buy Now Pay Later - Gift Card | Sprint 4 User Stories — Checkout – Payment (Basic) — AC1 – Payment method selection \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-PAY-002 | AC2 – Payment fields | Given I select a payment method Then account name and account number fields are displayed. | Sprint 4 User Stories — Checkout – Payment (Basic) — AC2 – Payment fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-PAY-003 | AC3 – Successful order | Given I have selected a payment method and filled in the fields When I click the confirm button Then the order is placed And a confirmation message with the invoice number is displayed And the cart is cleared. | Sprint 4 User Stories — Checkout – Payment (Basic) — AC3 – Successful order \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Checkout – Sign In

**User Story:** As a user who is not logged in, I want the possibility to log in during the checkout workflow, so that I can complete my purchase without leaving the checkout.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CC-SIGNIN-001 | AC1 – Login step displayed for guests | Given I am not logged in And I am on the checkout page When I click "Proceed to Checkout" from the cart step Then a login form is displayed as the next step in the checkout wizard. | Sprint 4 User Stories — Checkout – Sign In — AC1 – Login step displayed for guests \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-SIGNIN-002 | AC2 – Login form fields | Given the checkout login step is displayed Then email and password fields are shown And a submit button is available. | Sprint 4 User Stories — Checkout – Sign In — AC2 – Login form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-SIGNIN-003 | AC3 – Successful login during checkout | Given I enter valid credentials on the checkout login step When I submit the form Then I am authenticated And I can proceed to the billing address step. | Sprint 4 User Stories — Checkout – Sign In — AC3 – Successful login during checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CC-SIGNIN-004 | AC4 – Already logged in | Given I am already logged in When I reach the checkout login step Then a message "You are already signed in as [First Name] [Last Name]" is displayed And I can proceed directly to the billing address step. | Sprint 4 User Stories — Checkout – Sign In — AC4 – Already logged in \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Contact Form

**User Story:** As a visitor, I want to send a message through a contact form, so that I can reach out for support or other inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-CF-001 | AC1 – Contact form is accessible | Given I navigate to the contact page Then a contact form is displayed. | Sprint 4 User Stories — Contact Form — AC1 – Contact form is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CF-002 | AC2 – Required fields | Given the contact form is displayed Then the following fields are shown: - First name (required) - Last name (required) - Email (required, must be valid format) - Subject (required, dropdown) - Message (required, minimum 50 characters) | Sprint 4 User Stories — Contact Form — AC2 – Required fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CF-003 | AC3 – Subject options | Given the subject dropdown is displayed Then it includes the following options: - Customer service - Webmaster - Return - Payments - Warranty - Status of order | Sprint 4 User Stories — Contact Form — AC3 – Subject options \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CF-004 | AC4 – Message minimum length | Given I enter a message with fewer than 50 characters Then a validation error is shown indicating the message must be at least 50 characters. | Sprint 4 User Stories — Contact Form — AC4 – Message minimum length \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-CF-005 | AC5 – Successful submission | Given all required fields are filled in with valid data When I submit the contact form Then a confirmation message is displayed And the form is hidden. | Sprint 4 User Stories — Contact Form — AC5 – Successful submission \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Customer Profile

**User Story:** As an authenticated user, I want to view and update my personal information, so that my account details are accurate.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-PROF-001 | AC1 – Profile page is accessible | Given I am logged in When I navigate to my profile page Then my current profile information is displayed. | Sprint 4 User Stories — Customer Profile — AC1 – Profile page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PROF-002 | AC2 – Editable fields | Given the profile page is displayed Then I can edit: first name, last name, phone, and address fields. | Sprint 4 User Stories — Customer Profile — AC2 – Editable fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PROF-003 | AC3 – Read-only email | Given the profile page is displayed Then the email field is not editable. | Sprint 4 User Stories — Customer Profile — AC3 – Read-only email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PROF-004 | AC4 – Successful update | Given I modify profile fields with valid data When I save Then a success message is displayed. | Sprint 4 User Stories — Customer Profile — AC4 – Successful update \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Favorites

**User Story:** As an authenticated user, I want to view and manage my list of favorite products, so that I can quickly access products I'm interested in.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-FAV-001 | AC1 – Favorites page | Given I am logged in When I navigate to my favorites page Then a list of my favorite products is displayed showing image, name, and description (truncated to 250 characters). | Sprint 4 User Stories — Favorites — AC1 – Favorites page \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-FAV-002 | AC2 – Empty favorites | Given I have no favorites Then a message indicating no favorites is displayed. | Sprint 4 User Stories — Favorites — AC2 – Empty favorites \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-FAV-003 | AC3 – Remove a favorite | Given the favorites list is displayed When I click the delete button on a favorite Then the product is removed and the list refreshes. | Sprint 4 User Stories — Favorites — AC3 – Remove a favorite \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Forgot Password

**User Story:** As a registered user who has forgotten their password, I want to request a password reset by providing my email, so that I can regain access to my account.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-FP-001 | AC1 – Forgot password form | Given I click "Forgot password" on the login page Then a form with an email input is displayed. | Sprint 4 User Stories — Forgot Password — AC1 – Forgot password form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-FP-002 | AC2 – Email validation | Given I enter an email address Then it must be in a valid format. | Sprint 4 User Stories — Forgot Password — AC2 – Email validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-FP-003 | AC3 – Successful reset | Given I enter a registered email When I submit the form Then a confirmation message is displayed and fades out after 3 seconds. | Sprint 4 User Stories — Forgot Password — AC3 – Successful reset \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-FP-004 | AC4 – Non-existent email | Given I enter an unregistered email When I submit the form Then an error message is displayed. | Sprint 4 User Stories — Forgot Password — AC4 – Non-existent email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Invoices

**User Story:** As an authenticated user, I want to view my past orders, so that I can track my purchases.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-INV-001 | AC1 – Invoice list | Given I am logged in When I navigate to my invoices page Then a paginated table is displayed with columns: invoice number, billing street, invoice date, total, and a details link. | Sprint 4 User Stories — Invoices — AC1 – Invoice list \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-INV-002 | AC2 – Invoice detail | Given I click on an invoice Then the detail page shows: - invoice number, date, and total - billing address (street, postal code, city, state, country) - payment method and details - product line items (quantity, name, price, line total) | Sprint 4 User Stories — Invoices — AC2 – Invoice detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-INV-003 | AC3 – Non-existent invoice | Given the invoice does not exist or does not belong to me Then a "not found" message is displayed. | Sprint 4 User Stories — Invoices — AC3 – Non-existent invoice \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Messages

**User Story:** As an authenticated user, I want to view my contact messages and reply to them, so that I can follow up on my inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-MSG-001 | AC1 – Messages list | Given I am logged in When I navigate to my messages page Then a paginated table is displayed with columns: subject, message (truncated to 50 chars), status badge (NEW / IN_PROGRESS / RESOLVED), date, and a details link. | Sprint 4 User Stories — Messages — AC1 – Messages list \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-MSG-002 | AC2 – Message detail | Given I click on a message Then the original message is displayed (sender, subject, status, full text, timestamp) And any replies are listed chronologically below. | Sprint 4 User Stories — Messages — AC2 – Message detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-MSG-003 | AC3 – Reply to message | Given I am on the message detail page When I enter a reply and submit Then the reply is added and the replies list is updated. | Sprint 4 User Stories — Messages — AC3 – Reply to message \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Product Detail

**User Story:** As a visitor, I want to view a product's details, add it to my cart, or save it to my favorites, so that I can purchase it or come back to it later.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-PD-001 | AC1 – Product information shown | Given I am on the product detail page Then the product image, name, description, price, category badge, and brand badge are shown. | Sprint 4 User Stories — Product Detail — AC1 – Product information shown \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-002 | AC2 – Quantity selector | Given the product is in stock Then a quantity input field is displayed with plus (+) and minus (-) buttons And the default quantity is 1. | Sprint 4 User Stories — Product Detail — AC2 – Quantity selector \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-003 | AC3 – Increase quantity | Given the quantity input is displayed When I click the plus button Then the quantity increases by 1. | Sprint 4 User Stories — Product Detail — AC3 – Increase quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-004 | AC4 – Decrease quantity | Given the quantity is greater than 1 When I click the minus button Then the quantity decreases by 1. | Sprint 4 User Stories — Product Detail — AC4 – Decrease quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-005 | AC5 – Minimum quantity | Given the quantity is 1 When I click the minus button Then the quantity remains at 1. | Sprint 4 User Stories — Product Detail — AC5 – Minimum quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-006 | AC6 – Manual quantity entry | Given the quantity input is displayed When I type a number directly into the input field Then the quantity is updated to the entered value And the value is clamped between 1 and 999,999,999. | Sprint 4 User Stories — Product Detail — AC6 – Manual quantity entry \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-007 | AC7 – Add to cart | Given a valid quantity is selected When I click the "Add to Cart" button Then the product is added to the cart with the selected quantity And a success message "Product added to shopping cart." is displayed. | Sprint 4 User Stories — Product Detail — AC7 – Add to cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-008 | AC8 – Out of stock | Given the product is not in stock and is not a rental item Then the "Add to Cart" button is disabled And "Out of stock" is shown in red. | Sprint 4 User Stories — Product Detail — AC8 – Out of stock \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-009 | AC9 – Related products | Given the product detail page is displayed Then related products are shown below the main information. | Sprint 4 User Stories — Product Detail — AC9 – Related products \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-010 | AC10 – Add to Favorites button | Given I am on the product detail page Then an "Add to Favorites" button is displayed. | Sprint 4 User Stories — Product Detail — AC10 – Add to Favorites button \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-011 | AC11 – Adding a favorite | Given I am logged in When I click "Add to Favorites" Then a success message "Product added to your favorites list." is displayed. | Sprint 4 User Stories — Product Detail — AC11 – Adding a favorite \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-012 | AC12 – Duplicate favorite | Given the product is already in my favorites When I click "Add to Favorites" Then the message "Product already in your favorites list." is displayed. | Sprint 4 User Stories — Product Detail — AC12 – Duplicate favorite \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PD-013 | AC13 – Not logged in | Given I am not logged in When I click "Add to Favorites" Then the message "Unauthorized, can not add product to your favorite list." is displayed. | Sprint 4 User Stories — Product Detail — AC13 – Not logged in \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Product Overview

**User Story:** As a visitor, I want to browse a paginated overview of all products with search, filtering, and sorting, so that I can efficiently find products of interest.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-PO-001 | AC1 – Product grid is displayed | Given I navigate to the home page Then a grid of product cards is displayed And each card shows a product image, name, and price. | Sprint 4 User Stories — Product Overview — AC1 – Product grid is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-002 | AC2 – Navigating to product detail | Given the product overview is displayed When I click on a product card Then I am navigated to the product detail page. | Sprint 4 User Stories — Product Overview — AC2 – Navigating to product detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-003 | AC3 – Pagination | Given there are more products than fit on one page Then pagination controls are displayed below the product grid And clicking a page number updates the grid. | Sprint 4 User Stories — Product Overview — AC3 – Pagination \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-004 | AC4 – Search | Given I enter a valid search query (3–40 characters) and submit Then the product grid updates to show only matching products And all active filters are reset. | Sprint 4 User Stories — Product Overview — AC4 – Search \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-005 | AC5 – Category filter | Given I check one or more category checkboxes in the sidebar Then the product grid updates to show only products from those categories. | Sprint 4 User Stories — Product Overview — AC5 – Category filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-006 | AC6 – Brand filter | Given I check one or more brand checkboxes in the sidebar Then the product grid updates to show only products from those brands. | Sprint 4 User Stories — Product Overview — AC6 – Brand filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-PO-007 | AC7 – Sorting | Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High) Then the product grid reloads with products ordered accordingly. | Sprint 4 User Stories — Product Overview — AC7 – Sorting \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### Rental Products

**User Story:** As a visitor, I want to browse products available for rent, so that I can find tools I can rent by the hour.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-RENT-001 | AC1 – Rentals page is accessible | Given I navigate to the rentals page Then a list of all rental products is displayed. | Sprint 4 User Stories — Rental Products — AC1 – Rentals page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-RENT-002 | AC2 – Rental product display | Given the rentals page is displayed Then each rental product shows a product image, name, and description. | Sprint 4 User Stories — Rental Products — AC2 – Rental product display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-RENT-003 | AC3 – Rental detail page | Given I click on a rental product Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons And the total price is calculated as the hourly rate multiplied by the selected duration. | Sprint 4 User Stories — Rental Products — AC3 – Rental detail page \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-RENT-004 | AC4 – Rental label in checkout | Given a rental item is in my cart Then the item is marked with "This is a rental item" in the checkout cart. | Sprint 4 User Stories — Rental Products — AC4 – Rental label in checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### User Login

**User Story:** As a registered user, I want to log in with my email and password, so that I can access my account, favorites, invoices, and other authenticated features.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-LOGIN-001 | AC1 – Login form | Given I navigate to the login page Then a form with email and password fields is displayed. | Sprint 4 User Stories — User Login — AC1 – Login form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-LOGIN-002 | AC2 – Email validation | Given I am on the login page Then the email field is required and must contain a valid email format. | Sprint 4 User Stories — User Login — AC2 – Email validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-LOGIN-003 | AC3 – Password validation | Given I am on the login page Then the password field is required. | Sprint 4 User Stories — User Login — AC3 – Password validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-LOGIN-004 | AC4 – Successful login | Given I enter valid credentials When I submit the login form Then I am authenticated and redirected to my account dashboard. | Sprint 4 User Stories — User Login — AC4 – Successful login \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-LOGIN-005 | AC5 – Invalid credentials | Given I enter an incorrect email or password When I submit the form Then the error message "Invalid email or password" is displayed. | Sprint 4 User Stories — User Login — AC5 – Invalid credentials \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

#### User Registration

**User Story:** As a new visitor, I want to create an account by providing my personal details, so that I can log in and access features like checkout, favorites, and my account.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S4-REG-001 | AC1 – Registration page is accessible | Given I am not logged in When I navigate to the registration page Then a registration form is displayed. | Sprint 4 User Stories — User Registration — AC1 – Registration page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-REG-002 | AC2 – Required fields | Given the registration form is displayed Then the following required fields are shown: - First name - Last name - Date of birth - Address - Postcode (exactly 5 digits) - City - State - Country - Phone - Email - Password | Sprint 4 User Stories — User Registration — AC2 – Required fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-REG-003 | AC3 – Email validation | Given I enter an email address Then it must match a valid format (letters, numbers, dots, underscores, percent, plus, hyphen before @). | Sprint 4 User Stories — User Registration — AC3 – Email validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-REG-004 | AC4 – Password requirements | Given I enter a password Then it must be at least 6 characters long And no more than 40 characters. | Sprint 4 User Stories — User Registration — AC4 – Password requirements \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-REG-005 | AC5 – Duplicate email | Given I submit the form with an email that is already registered Then the error message "Email is already in use." is displayed. | Sprint 4 User Stories — User Registration — AC5 – Duplicate email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |
| REQ-S4-REG-006 | AC6 – Successful registration | Given all fields are filled in with valid data When I submit the form Then the account is created And I am redirected to the login page. | Sprint 4 User Stories — User Registration — AC6 – Successful registration \| https://testsmith-io.github.io/practice-software-testing/user-stories/v4.md \| Application_Context.md §10 |

### Sprint 5

#### Admin Dashboard

**User Story:** As an administrator, I want to access a dashboard and manage all entities, so that I can oversee and administer the application.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-ADMIN-001 | AC1 – Dashboard | Given I am logged in as an admin When I navigate to `/admin/dashboard` Then a bar chart of total sales by year and a paginated list of recent invoices are displayed. | Sprint 5 User Stories — Admin Dashboard — AC1 – Dashboard \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-002 | AC2 – Product management | Given I navigate to the products management page Then I can list, create, edit, and delete products. | Sprint 5 User Stories — Admin Dashboard — AC2 – Product management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-003 | AC3 – Category management | Given I navigate to the categories management page Then I can list, create, edit, and delete categories (with optional parent category). | Sprint 5 User Stories — Admin Dashboard — AC3 – Category management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-004 | AC4 – Brand management | Given I navigate to the brands management page Then I can list, create, edit, and delete brands. | Sprint 5 User Stories — Admin Dashboard — AC4 – Brand management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-005 | AC5 – Order management | Given I navigate to the orders management page Then I can list all orders, view details, and update order status And the available status values are: AWAITING_FULFILLMENT, ON_HOLD, AWAITING_SHIPMENT, SHIPPED, COMPLETED. | Sprint 5 User Stories — Admin Dashboard — AC5 – Order management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-006 | AC6 – User management | Given I navigate to the users management page Then I can list, view, edit, and delete user accounts. | Sprint 5 User Stories — Admin Dashboard — AC6 – User management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-007 | AC7 – Disable and enable user accounts | Given I am editing a user account in the admin panel Then an "Enabled" toggle is available And disabling the account immediately prevents the user from logging in And re-enabling the account restores the user's access. | Sprint 5 User Stories — Admin Dashboard — AC7 – Disable and enable user accounts \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-008 | AC8 – Message management | Given I navigate to the messages management page Then I can view all contact messages, view details, and reply. | Sprint 5 User Stories — Admin Dashboard — AC8 – Message management \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-ADMIN-009 | AC9 – Reports | Given I navigate to the reports section Then I can view monthly sales, weekly sales, and general statistics. | Sprint 5 User Stories — Admin Dashboard — AC9 – Reports \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Browse Products by Category

**User Story:** As a visitor, I want to browse products within a specific category with filtering, sorting, pagination, and price range, so that I can find specific products within a category.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CAT-001 | AC1 – Category page is displayed | Given I click on a category name Then a page with products belonging to that category is displayed And the category name is shown as the page title. | Sprint 5 User Stories — Browse Products by Category — AC1 – Category page is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CAT-002 | AC2 – Filters available | Given the category page is displayed Then the same filters as the product overview are available: - category checkboxes (subcategory tree) - brand checkboxes - sorting dropdown - pagination controls - price range slider | Sprint 5 User Stories — Browse Products by Category — AC2 – Filters available \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Change Password

**User Story:** As an authenticated user, I want to change my password with real-time strength feedback, so that I can maintain strong account security.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CPWD-001 | AC1 – Change password form | Given I am on my profile page Then a change password section is displayed with: - Current password (required) - New password (required) - Confirm new password (required) | Sprint 5 User Stories — Change Password — AC1 – Change password form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CPWD-002 | AC2 – Password strength indicator | Given I enter a new password Then the same password strength indicator as registration is displayed With the same 5 strength levels and visual progress bar. | Sprint 5 User Stories — Change Password — AC2 – Password strength indicator \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CPWD-003 | AC3 – Passwords must match | Given the new password and confirmation do not match Then the error "Passwords do not match." is displayed. | Sprint 5 User Stories — Change Password — AC3 – Passwords must match \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CPWD-004 | AC4 – Current password verification | Given I enter an incorrect current password When I submit the form Then the error "Your current password does not matches with the password." is displayed. | Sprint 5 User Stories — Change Password — AC4 – Current password verification \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CPWD-005 | AC5 – New password must differ | Given I enter a new password identical to the current one When I submit the form Then the error "New Password cannot be same as your current password." is displayed. | Sprint 5 User Stories — Change Password — AC5 – New password must differ \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CPWD-006 | AC6 – Successful change | Given I provide a valid current password and a new password that matches the confirmation When I submit the form Then a success message is displayed And I am logged out after 5 seconds. | Sprint 5 User Stories — Change Password — AC6 – Successful change \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Chat Widget

**User Story:** As a visitor or logged-in user, I want to use a chat widget to search products, place orders, go through checkout, or submit support tickets, so that I can interact with the application without navigating away from the current page.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CHAT-001 | AC1 – Chat toggle | Given I am on any page Then a chat toggle button is displayed in the bottom-right corner And clicking it opens the chat window with a menu: Find Product, Order Product, Checkout, Support. | Sprint 5 User Stories — Chat Widget — AC1 – Chat toggle \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CHAT-002 | AC2 – Find Product | Given I select "Find Product" Then I can enter a search query and up to 5 matching products are shown as cards And I can click "View Product" to navigate to the detail page. | Sprint 5 User Stories — Chat Widget — AC2 – Find Product \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CHAT-003 | AC3 – Order Product | Given I select "Order Product" Then I can search for a product, select a quantity (1, 2, 3, 5, 10, or custom 1–999), confirm the order, and the product is added to my cart. | Sprint 5 User Stories — Chat Widget — AC3 – Order Product \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CHAT-004 | AC4 – Checkout | Given I select "Checkout" and my cart has items Then the chat walks me through the full checkout flow: - cart summary - guest details (if not logged in): email, first name, last name - address: street, city, state, country, postal code - payment method selection and details - order confirmation with invoice number | Sprint 5 User Stories — Chat Widget — AC4 – Checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CHAT-005 | AC5 – Empty cart | Given I select "Checkout" and my cart is empty Then the message "Your cart is empty" is displayed. | Sprint 5 User Stories — Chat Widget — AC5 – Empty cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CHAT-006 | AC6 – Support | Given I select "Support" Then the chat prompts me for subject, message (min 50 chars), and optional file attachment (.txt) And if not logged in, also asks for first name, last name, and email And on submission, a confirmation is displayed. | Sprint 5 User Stories — Chat Widget — AC6 – Support \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Checkout – Billing Address

**User Story:** As a customer, I want to enter my billing address, pre-filled from my account if logged in, so that my invoice is accurate.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CC-ADDR-001 | AC1 – Address form fields | Given I am on the billing address step Then the following required fields are displayed: - Street (max 70 characters) - City (max 40 characters) - State (max 40 characters) - Country (max 40 characters) - Postal code (max 10 characters) | Sprint 5 User Stories — Checkout – Billing Address — AC1 – Address form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-ADDR-002 | AC2 – Validation | Given I leave a required field empty Then the field is highlighted as invalid And the "Proceed" button is disabled. | Sprint 5 User Stories — Checkout – Billing Address — AC2 – Validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-ADDR-003 | AC3 – Proceed to payment | Given all address fields are filled in When I click "Proceed" Then I advance to the payment step. | Sprint 5 User Stories — Checkout – Billing Address — AC3 – Proceed to payment \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-ADDR-004 | AC4 – Pre-fill for logged-in users | Given I am logged in Then the address fields are pre-filled with my account address details. | Sprint 5 User Stories — Checkout – Billing Address — AC4 – Pre-fill for logged-in users \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Checkout – Cart Review

**User Story:** As a customer, I want to review the items in my cart, including any applied discounts, so that I can verify my order is correct.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CC-CART-001 | AC1 – Cart contents displayed | Given I have items in my cart When I navigate to the checkout page Then a table is displayed with columns: Item, Quantity, Price, Total, and Actions. | Sprint 5 User Stories — Checkout – Cart Review — AC1 – Cart contents displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-002 | AC2 – Update quantity | Given I change the quantity of a cart item Then the item total and cart total are recalculated And a confirmation message "Product quantity updated." is displayed. | Sprint 5 User Stories — Checkout – Cart Review — AC2 – Update quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-003 | AC3 – Delete item | Given I click the delete button on a cart item Then the item is removed from the cart And the cart total is recalculated. | Sprint 5 User Stories — Checkout – Cart Review — AC3 – Delete item \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-004 | AC4 – Empty cart | Given I have no items in my cart Then the message "Your shopping cart is empty" is displayed. | Sprint 5 User Stories — Checkout – Cart Review — AC4 – Empty cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-005 | AC5 – Proceed | Given the cart contains at least one item When I click "Proceed" Then I advance to the next checkout step. | Sprint 5 User Stories — Checkout – Cart Review — AC5 – Proceed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-006 | AC6 – Discount badge on items | Given a cart item has a discount Then a discount badge is shown next to the product name And both the original and discounted price are displayed. | Sprint 5 User Stories — Checkout – Cart Review — AC6 – Discount badge on items \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-007 | AC7 – Combined product discount | Given the cart contains both rental and non-rental items Then a 15% additional discount is applied to the cart subtotal And the cart shows the subtotal, discount amount, and final total. | Sprint 5 User Stories — Checkout – Cart Review — AC7 – Combined product discount \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-CART-008 | AC8 – Combined discount removed | Given I remove all rental or all non-rental items Then the 15% combined discount is removed And the total reverts to the regular subtotal. | Sprint 5 User Stories — Checkout – Cart Review — AC8 – Combined discount removed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Checkout – Payment (Advanced)

**User Story:** As a customer, I want to provide payment details specific to my chosen payment method, so that my payment is processed correctly.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CC-PAY-001 | AC1 – Payment method selection | Given I am on the payment step Then a dropdown is displayed with options: - Bank Transfer - Cash on Delivery - Credit Card - Buy Now Pay Later - Gift Card | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC1 – Payment method selection \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-002 | AC2 – Bank Transfer fields | Given I select "Bank Transfer" Then these fields are displayed: - Bank name (required, letters and spaces only) - Account name (required, alphanumeric with spaces, periods, apostrophes, hyphens) - Account number (required, digits only) | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC2 – Bank Transfer fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-003 | AC3 – Credit Card fields | Given I select "Credit Card" Then these fields are displayed: - Card number (format: XXXX-XXXX-XXXX-XXXX) - Expiration date (format: MM/YYYY, must be a future date) - CVV (3 or 4 digits) - Card holder name (letters and spaces only) | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC3 – Credit Card fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-004 | AC4 – Credit Card expiration validation | Given I enter an expiration date in the past Then the error "Expiration date must be in the future." is displayed. | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC4 – Credit Card expiration validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-005 | AC5 – Buy Now Pay Later | Given I select "Buy Now Pay Later" Then a "Monthly installments" dropdown is displayed with options: 3, 6, 9, 12. | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC5 – Buy Now Pay Later \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-006 | AC6 – Gift Card fields | Given I select "Gift Card" Then these fields are displayed: - Gift card number (required, alphanumeric) - Validation code (required, alphanumeric) | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC6 – Gift Card fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-007 | AC7 – Cash on Delivery | Given I select "Cash on Delivery" Then no additional fields are required. | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC7 – Cash on Delivery \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-008 | AC8 – Payment method change resets form | Given I switch to a different payment method Then the form resets and shows the new method's fields. | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC8 – Payment method change resets form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-PAY-009 | AC9 – Successful order | Given valid payment details are provided When I click confirm Then the payment is validated, the order is placed, a confirmation with the invoice number is shown, and the cart is cleared And a checkout confirmation email is sent to the customer. | Sprint 5 User Stories — Checkout – Payment (Advanced) — AC9 – Successful order \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Checkout – Sign In

**User Story:** As a user who is not logged in, I want the possibility to log in during the checkout workflow, so that I can complete my purchase without leaving the checkout.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CC-SIGNIN-001 | AC1 – Login step displayed for guests | Given I am not logged in And I am on the checkout page When I click "Proceed to Checkout" from the cart step Then a login form is displayed as the next step in the checkout wizard. | Sprint 5 User Stories — Checkout – Sign In — AC1 – Login step displayed for guests \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-SIGNIN-002 | AC2 – Login form fields | Given the checkout login step is displayed Then email and password fields are shown And a submit button is available. | Sprint 5 User Stories — Checkout – Sign In — AC2 – Login form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-SIGNIN-003 | AC3 – TOTP support during checkout login | Given I have TOTP enabled on my account When I submit valid email and password on the checkout login step Then a 6-digit TOTP input field is displayed And I must enter a valid TOTP code to proceed. | Sprint 5 User Stories — Checkout – Sign In — AC3 – TOTP support during checkout login \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-SIGNIN-004 | AC4 – Successful login during checkout | Given I enter valid credentials on the checkout login step When I submit the form Then I am authenticated And I can proceed to the billing address step. | Sprint 5 User Stories — Checkout – Sign In — AC4 – Successful login during checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CC-SIGNIN-005 | AC5 – Already logged in | Given I am already logged in When I reach the checkout login step Then a message "You are already signed in as [First Name] [Last Name]" is displayed And I can proceed directly to the billing address step. | Sprint 5 User Stories — Checkout – Sign In — AC5 – Already logged in \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Combination Discount

**User Story:** As a customer with both rental and non-rental items in my cart, I want to receive an additional discount on my order, so that I am rewarded for combining product types.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-COMBO-001 | AC1 – Combination discount applied | Given my cart contains at least one rental item and at least one non-rental item Then an additional 15% discount is applied to the cart subtotal. | Sprint 5 User Stories — Combination Discount — AC1 – Combination discount applied \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-COMBO-002 | AC2 – Discount display in cart | Given the combination discount is applied Then the cart shows the subtotal, discount percentage (15%), discount amount, and final total. | Sprint 5 User Stories — Combination Discount — AC2 – Discount display in cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-COMBO-003 | AC3 – Discount removed when condition no longer met | Given I remove all rental items or all non-rental items from my cart Then the 15% combination discount is removed And the total reverts to the regular subtotal. | Sprint 5 User Stories — Combination Discount — AC3 – Discount removed when condition no longer met \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-COMBO-004 | AC4 – Discount on invoice | Given I complete checkout with the combination discount applied Then the invoice shows the subtotal, the 15% discount amount, and the final total. | Sprint 5 User Stories — Combination Discount — AC4 – Discount on invoice \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Contact Form (Advanced)

**User Story:** As a visitor or logged-in user, I want to send a message through a contact form with optional file attachment, so that I can provide additional context with my inquiry.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-CFA-001 | AC1 – Auto-fill for logged-in users | Given I am logged in Then my first name, last name, and email are auto-filled And the message "Known user, [Full Name]" is displayed And the name and email fields are hidden. | Sprint 5 User Stories — Contact Form (Advanced) — AC1 – Auto-fill for logged-in users \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-002 | AC2 – Guest user fields | Given I am not logged in Then first name, last name, and email fields are displayed and required. | Sprint 5 User Stories — Contact Form (Advanced) — AC2 – Guest user fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-003 | AC3 – Subject and message | Given the form is displayed Then a subject dropdown is shown with options: - Customer service - Webmaster - Return - Payments - Warranty - Status of order And a message field is shown (required, minimum 50 characters). | Sprint 5 User Stories — Contact Form (Advanced) — AC3 – Subject and message \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-004 | AC4 – File attachment | Given the form is displayed Then an optional file attachment field is available And only `.txt` files are accepted And the file must be exactly 0 KB in size. | Sprint 5 User Stories — Contact Form (Advanced) — AC4 – File attachment \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-005 | AC5 – Invalid file type | Given I select a non-`.txt` file Then the error "File should have a txt extension." is displayed. | Sprint 5 User Stories — Contact Form (Advanced) — AC5 – Invalid file type \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-006 | AC6 – Invalid file size | Given I select a file that is not 0 KB Then the error "File should be empty." is displayed. | Sprint 5 User Stories — Contact Form (Advanced) — AC6 – Invalid file size \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-CFA-007 | AC7 – Successful submission | Given all fields are valid When I submit the form Then a confirmation email is sent to the provided email address And a confirmation message is displayed. | Sprint 5 User Stories — Contact Form (Advanced) — AC7 – Successful submission \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Customer Profile

**User Story:** As an authenticated user, I want to view and update my personal information, so that my account details are accurate.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-PROF-001 | AC1 – Profile page is accessible | Given I am logged in When I navigate to my profile page Then my current profile information is displayed. | Sprint 5 User Stories — Customer Profile — AC1 – Profile page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PROF-002 | AC2 – Editable fields | Given the profile page is displayed Then I can edit: - First name (required) - Last name (required) - Phone (required) - Street (required) - Postal code (required) - City (required) - State (required) - Country (required) | Sprint 5 User Stories — Customer Profile — AC2 – Editable fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PROF-003 | AC3 – Read-only email | Given the profile page is displayed Then the email field is not editable. | Sprint 5 User Stories — Customer Profile — AC3 – Read-only email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PROF-004 | AC4 – Successful update | Given I modify profile fields with valid data When I save Then a success message is displayed and fades out after 5 seconds. | Sprint 5 User Stories — Customer Profile — AC4 – Successful update \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Favorites

**User Story:** As an authenticated user, I want to view and manage my list of favorite products, so that I can quickly access products I'm interested in.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-FAV-001 | AC1 – Favorites page | Given I am logged in When I navigate to my favorites page Then a list of my favorite products is displayed showing image, name, and description (truncated to 250 characters). | Sprint 5 User Stories — Favorites — AC1 – Favorites page \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-FAV-002 | AC2 – Empty favorites | Given I have no favorites Then a message indicating no favorites is displayed. | Sprint 5 User Stories — Favorites — AC2 – Empty favorites \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-FAV-003 | AC3 – Remove a favorite | Given the favorites list is displayed When I click the delete button on a favorite Then the product is removed and the list refreshes. | Sprint 5 User Stories — Favorites — AC3 – Remove a favorite \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Forgot Password

**User Story:** As a registered user who has forgotten their password, I want to request a password reset by providing my email, so that I can regain access to my account.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-FP-001 | AC1 – Forgot password form | Given I click "Forgot password" on the login page Then a form with an email input is displayed. | Sprint 5 User Stories — Forgot Password — AC1 – Forgot password form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-FP-002 | AC2 – Email validation | Given I enter an email address Then it must match a valid RFC-compliant format. | Sprint 5 User Stories — Forgot Password — AC2 – Email validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-FP-003 | AC3 – Successful reset | Given I enter a registered email When I submit the form Then a new password is generated and sent to my email address And a confirmation message is displayed and fades out after 3 seconds. | Sprint 5 User Stories — Forgot Password — AC3 – Successful reset \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-FP-004 | AC4 – Non-existent email | Given I enter an unregistered email When I submit the form Then an error message is displayed. | Sprint 5 User Stories — Forgot Password — AC4 – Non-existent email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Geo-Location Discount

**User Story:** As a visitor browsing from a supported city, I want to automatically receive a location-based discount on eligible products, so that I benefit from regional promotions.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-GEO-001 | AC1 – Discount applied based on location | Given my browser geo-location matches a supported city and a product is a location offer Then the following discount is applied: - New York: 5% - Mumbai: 10% - Tokyo: 15% - Amsterdam: 20% - London: 25% | Sprint 5 User Stories — Geo-Location Discount — AC1 – Discount applied based on location \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-GEO-002 | AC2 – Discount display | Given a location discount is applied Then the original price is shown with a strikethrough and the discounted price is shown below. | Sprint 5 User Stories — Geo-Location Discount — AC2 – Discount display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-GEO-003 | AC3 – No match | Given my location does not match any supported city Then no location discount is applied. | Sprint 5 User Stories — Geo-Location Discount — AC3 – No match \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-GEO-004 | AC4 – Discount in cart | Given I add a location-discounted product to the cart Then the discounted price is used for the cart line item. | Sprint 5 User Stories — Geo-Location Discount — AC4 – Discount in cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Invoices

**User Story:** As an authenticated user, I want to view my invoices with discount details and download them as PDF, so that I can keep records of my purchases.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-INV-001 | AC1 – Invoice list | Given I am logged in When I navigate to my invoices page Then a paginated table is displayed with columns: invoice number, billing street, invoice date, total, and a details link. | Sprint 5 User Stories — Invoices — AC1 – Invoice list \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-002 | AC2 – Invoice detail | Given I click on an invoice Then the detail page shows: - invoice number, date, and total - billing address (street, postal code, city, state, country) - payment method and details - product line items (quantity, name, price, line total) | Sprint 5 User Stories — Invoices — AC2 – Invoice detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-003 | AC3 – Non-existent invoice | Given the invoice does not exist or does not belong to me Then a "not found" message is displayed. | Sprint 5 User Stories — Invoices — AC3 – Non-existent invoice \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-004 | AC4 – Discount on invoice | Given the invoice has a discount Then the detail page shows the subtotal, discount percentage and amount, and final total. | Sprint 5 User Stories — Invoices — AC4 – Discount on invoice \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-005 | AC5 – Discounted line items | Given a line item has a discount Then the original price is shown with a strikethrough and the discounted price below. | Sprint 5 User Stories — Invoices — AC5 – Discounted line items \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-006 | AC6 – PDF download button | Given I am on the invoice detail page Then a "Download PDF" button is displayed. | Sprint 5 User Stories — Invoices — AC6 – PDF download button \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-007 | AC7 – PDF generation status | Given the PDF is still being generated Then the download button is disabled And the system checks the status every 20 seconds. | Sprint 5 User Stories — Invoices — AC7 – PDF generation status \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-INV-008 | AC8 – Successful PDF download | Given the PDF generation is complete When I click "Download PDF" Then the PDF file is downloaded. | Sprint 5 User Stories — Invoices — AC8 – Successful PDF download \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Messages

**User Story:** As an authenticated user, I want to view my contact messages and reply to them, so that I can follow up on my inquiries.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-MSG-001 | AC1 – Messages list | Given I am logged in When I navigate to my messages page Then a paginated table is displayed with columns: subject, message (truncated to 50 chars), status badge (NEW / IN_PROGRESS / RESOLVED), date, and a details link. | Sprint 5 User Stories — Messages — AC1 – Messages list \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-MSG-002 | AC2 – Message detail | Given I click on a message Then the original message is displayed (sender, subject, status, full text, timestamp) And any replies are listed chronologically below. | Sprint 5 User Stories — Messages — AC2 – Message detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-MSG-003 | AC3 – Reply to message | Given I am on the message detail page When I enter a reply and submit Then the reply is added and the replies list is updated. | Sprint 5 User Stories — Messages — AC3 – Reply to message \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Multi-Language Support

**User Story:** As a visitor, I want to switch the application language, so that I can use it in my preferred language.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-I18N-001 | AC1 – Automatic browser language detection | Given I visit the application for the first time And my browser language is set to a supported language (English, German, Spanish, French, Dutch, or Turkish) Then the application automatically displays in my browser's language. | Sprint 5 User Stories — Multi-Language Support — AC1 – Automatic browser language detection \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-I18N-002 | AC2 – Unsupported browser language fallback | Given I visit the application for the first time And my browser language is not one of the supported languages Then the application defaults to English. | Sprint 5 User Stories — Multi-Language Support — AC2 – Unsupported browser language fallback \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-I18N-003 | AC3 – Language selector | Given I am on any page Then a language selector is available in the navigation bar with: DE, EN, ES, FR, NL, TR. | Sprint 5 User Stories — Multi-Language Support — AC3 – Language selector \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-I18N-004 | AC4 – Language switch | Given I select a language from the selector Then all labels, messages, and UI elements update to the selected language. | Sprint 5 User Stories — Multi-Language Support — AC4 – Language switch \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-I18N-005 | AC5 – Persistence across sessions | Given I have selected a language Then my preference is stored in the browser (localStorage) And on subsequent visits my stored preference takes priority over browser language detection. | Sprint 5 User Stories — Multi-Language Support — AC5 – Persistence across sessions \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Privacy Policy

**User Story:** As a visitor, I want to read the privacy policy, so that I understand how my data is handled.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-PRIV-001 | AC1 – Privacy page accessible | Given I navigate to `/privacy` Then the privacy policy is displayed covering: Google Sign-In integration, data collection, automatic data removal (hourly), third-party services, data security, and contact information. | Sprint 5 User Stories — Privacy Policy — AC1 – Privacy page accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Product Detail

**User Story:** As a visitor, I want to view a product's details, add it to my cart, or save it to my favorites, so that I can purchase it or come back to it later.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-PD-001 | AC1 – Product information shown | Given I am on the product detail page Then the product image, name, description, price, category badge, and brand badge are shown. | Sprint 5 User Stories — Product Detail — AC1 – Product information shown \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-002 | AC2 – Discount price display | Given the product has a discount Then the original price is shown with a strikethrough And the discounted price and discount percentage badge are displayed. | Sprint 5 User Stories — Product Detail — AC2 – Discount price display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-003 | AC3 – Quantity selector | Given the product is in stock Then a quantity input field is displayed with plus (+) and minus (-) buttons And the default quantity is 1. | Sprint 5 User Stories — Product Detail — AC3 – Quantity selector \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-004 | AC4 – Increase quantity | Given the quantity input is displayed When I click the plus button Then the quantity increases by 1. | Sprint 5 User Stories — Product Detail — AC4 – Increase quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-005 | AC5 – Decrease quantity | Given the quantity is greater than 1 When I click the minus button Then the quantity decreases by 1. | Sprint 5 User Stories — Product Detail — AC5 – Decrease quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-006 | AC6 – Minimum quantity | Given the quantity is 1 When I click the minus button Then the quantity remains at 1. | Sprint 5 User Stories — Product Detail — AC6 – Minimum quantity \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-007 | AC7 – Manual quantity entry | Given the quantity input is displayed When I type a number directly into the input field Then the quantity is updated to the entered value And the value is clamped between 1 and 999,999,999. | Sprint 5 User Stories — Product Detail — AC7 – Manual quantity entry \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-008 | AC8 – Add to cart | Given a valid quantity is selected When I click the "Add to Cart" button Then the product is added to the cart with the selected quantity And a success message "Product added to shopping cart." is displayed. | Sprint 5 User Stories — Product Detail — AC8 – Add to cart \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-009 | AC9 – Out of stock | Given the product is not in stock and is not a rental item Then the "Add to Cart" button is disabled And "Out of stock" is shown in red. | Sprint 5 User Stories — Product Detail — AC9 – Out of stock \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-010 | AC10 – Rental duration slider | Given the product is a rental item Then a duration slider (1–10 hours) is shown instead of plus/minus buttons And the total price is calculated as hourly rate multiplied by duration. | Sprint 5 User Stories — Product Detail — AC10 – Rental duration slider \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-011 | AC11 – Add to Favorites | Given I am logged in When I click "Add to Favorites" Then a success message "Product added to your favorites list." is displayed. | Sprint 5 User Stories — Product Detail — AC11 – Add to Favorites \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-012 | AC12 – Duplicate favorite | Given the product is already in my favorites When I click "Add to Favorites" Then the message "Product already in your favorites list." is displayed. | Sprint 5 User Stories — Product Detail — AC12 – Duplicate favorite \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-013 | AC13 – Not logged in | Given I am not logged in When I click "Add to Favorites" Then the message "Unauthorized, can not add product to your favorite list." is displayed. | Sprint 5 User Stories — Product Detail — AC13 – Not logged in \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PD-014 | AC14 – Related products | Given the product detail page is displayed Then related products are shown below the main information. | Sprint 5 User Stories — Product Detail — AC14 – Related products \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Product Overview

**User Story:** As a visitor, I want to browse a paginated overview of all products with search, filtering, sorting, and a price range slider, so that I can efficiently find products within my preferences and budget.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-PO-001 | AC1 – Product grid is displayed | Given I navigate to the home page Then a grid of product cards is displayed And each card shows a product image, name, and price. | Sprint 5 User Stories — Product Overview — AC1 – Product grid is displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-002 | AC2 – Navigating to product detail | Given the product overview is displayed When I click on a product card Then I am navigated to the product detail page. | Sprint 5 User Stories — Product Overview — AC2 – Navigating to product detail \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-003 | AC3 – Pagination | Given there are more products than fit on one page Then pagination controls are displayed below the product grid And clicking a page number updates the grid. | Sprint 5 User Stories — Product Overview — AC3 – Pagination \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-004 | AC4 – Search | Given I enter a valid search query (3–40 characters) and submit Then the product grid updates to show only matching products And all active filters are reset. | Sprint 5 User Stories — Product Overview — AC4 – Search \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-005 | AC5 – Category filter | Given I check one or more category checkboxes in the sidebar Then the product grid updates to show only products from those categories. | Sprint 5 User Stories — Product Overview — AC5 – Category filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-006 | AC6 – Hierarchical category selection | Given a parent category has child categories When I check the parent category checkbox Then all child category checkboxes are also checked And unchecking all children unchecks the parent. | Sprint 5 User Stories — Product Overview — AC6 – Hierarchical category selection \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-007 | AC7 – Brand filter | Given I check one or more brand checkboxes in the sidebar Then the product grid updates to show only products from those brands. | Sprint 5 User Stories — Product Overview — AC7 – Brand filter \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-008 | AC8 – Combining filters | Given I have selected categories and brands Then the product grid shows only products matching both filters. | Sprint 5 User Stories — Product Overview — AC8 – Combining filters \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-009 | AC9 – Sorting | Given I select a sort option (Name A-Z, Name Z-A, Price High-Low, Price Low-High) Then the product grid reloads with products ordered accordingly. | Sprint 5 User Stories — Product Overview — AC9 – Sorting \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-010 | AC10 – Price range slider | Given I am on the product overview page Then a price range slider is displayed in the sidebar with a default range of $1 to $100 and a maximum of $200. | Sprint 5 User Stories — Product Overview — AC10 – Price range slider \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-011 | AC11 – Adjusting the price range | Given I drag the slider handles to a new minimum and maximum Then the product grid updates to show only products within the selected price range. | Sprint 5 User Stories — Product Overview — AC11 – Adjusting the price range \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-012 | AC12 – Discount price display | Given a product has a discount (location-based or otherwise) Then the product card shows the original price with a strikethrough and the discounted price below. | Sprint 5 User Stories — Product Overview — AC12 – Discount price display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-PO-013 | AC13 – Out of stock indicator | Given a product has no stock available Then "Out of stock" is displayed on the product card. | Sprint 5 User Stories — Product Overview — AC13 – Out of stock indicator \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Rental Products

**User Story:** As a visitor, I want to browse products available for rent, so that I can find tools I can rent by the hour.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-RENT-001 | AC1 – Rentals page is accessible | Given I navigate to the rentals page Then a list of all rental products is displayed. | Sprint 5 User Stories — Rental Products — AC1 – Rentals page is accessible \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-RENT-002 | AC2 – Rental product display | Given the rentals page is displayed Then each rental product shows a product image, name, and description. | Sprint 5 User Stories — Rental Products — AC2 – Rental product display \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-RENT-003 | AC3 – Rental detail page | Given I click on a rental product Then the product detail page shows a duration slider (1–10 hours) instead of plus/minus buttons And the total price is calculated as the hourly rate multiplied by the selected duration. | Sprint 5 User Stories — Rental Products — AC3 – Rental detail page \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-RENT-004 | AC4 – Rental label in checkout | Given a rental item is in my cart Then the item is marked with "This is a rental item" in the checkout cart. | Sprint 5 User Stories — Rental Products — AC4 – Rental label in checkout \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-RENT-005 | AC5 – Location-based discount on rentals | Given a rental product is marked as a location offer And my location matches a supported city Then the location discount is applied to the rental price. | Sprint 5 User Stories — Rental Products — AC5 – Location-based discount on rentals \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### Two-Factor Authentication Setup

**User Story:** As an authenticated user, I want to set up TOTP two-factor authentication, so that my account is protected with an additional security layer.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-TOTP-001 | AC1 – TOTP setup section | Given I am on my profile page Then a "Setup two factor authentication" section is displayed. | Sprint 5 User Stories — Two-Factor Authentication Setup — AC1 – TOTP setup section \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-TOTP-002 | AC2 – QR code displayed | Given the TOTP setup section is shown Then a QR code is displayed that I can scan with my authenticator app. | Sprint 5 User Stories — Two-Factor Authentication Setup — AC2 – QR code displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-TOTP-003 | AC3 – Manual secret entry | Given the TOTP setup section is shown Then the secret key is also displayed as text for manual entry. | Sprint 5 User Stories — Two-Factor Authentication Setup — AC3 – Manual secret entry \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-TOTP-004 | AC4 – Verification | Given I enter a valid 6-digit code from my authenticator app When I click "Verify TOTP" Then the message "TOTP verified and enabled successfully." is displayed. | Sprint 5 User Stories — Two-Factor Authentication Setup — AC4 – Verification \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-TOTP-005 | AC5 – Invalid code | Given I enter an incorrect code Then an error message is displayed. | Sprint 5 User Stories — Two-Factor Authentication Setup — AC5 – Invalid code \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-TOTP-006 | AC6 – Restricted for test accounts | Given I am logged in as customer@practicesoftwaretesting.com or admin@practicesoftwaretesting.com Then TOTP setup is denied with "Access denied: If you want to configure TOTP, please create your own account." | Sprint 5 User Stories — Two-Factor Authentication Setup — AC6 – Restricted for test accounts \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### User Login

**User Story:** As a registered user, I want to log in with my credentials or via social login, with support for two-factor authentication, so that I can securely access my account.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-LOGIN-001 | AC1 – Login form | Given I navigate to the login page Then email and password fields are displayed And a "Sign in with Google" button is shown. | Sprint 5 User Stories — User Login — AC1 – Login form \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-002 | AC2 – Successful login | Given I enter valid credentials When I submit the form Then I am redirected based on my role: `/account` for users, `/admin/dashboard` for admins. | Sprint 5 User Stories — User Login — AC2 – Successful login \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-003 | AC3 – Invalid credentials | Given I enter incorrect credentials Then the error "Invalid email or password" is displayed. | Sprint 5 User Stories — User Login — AC3 – Invalid credentials \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-004 | AC4 – Account locking | Given I have entered incorrect credentials 3 times consecutively When I try to log in again Then the error "Account locked, too many failed attempts. Please contact the administrator." is displayed And the API returns HTTP 423. | Sprint 5 User Stories — User Login — AC4 – Account locking \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-005 | AC5 – Admin accounts are exempt from locking | Given I am logging in as an admin Then the account is never locked regardless of failed attempts. | Sprint 5 User Stories — User Login — AC5 – Admin accounts are exempt from locking \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-006 | AC6 – Disabled account | Given my account has been disabled by an administrator When I try to log in with valid credentials Then the error "Account disabled." is displayed And I am not authenticated. | Sprint 5 User Stories — User Login — AC6 – Disabled account \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-007 | AC7 – TOTP prompt | Given I have TOTP enabled on my account When I submit valid email and password Then a 6-digit TOTP input field is displayed. | Sprint 5 User Stories — User Login — AC7 – TOTP prompt \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-008 | AC8 – Valid TOTP code | Given I enter a valid TOTP code Then I am fully authenticated and redirected. | Sprint 5 User Stories — User Login — AC8 – Valid TOTP code \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-009 | AC9 – Invalid TOTP code | Given I enter an incorrect TOTP code Then the error "Invalid TOTP" is displayed. | Sprint 5 User Stories — User Login — AC9 – Invalid TOTP code \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-LOGIN-010 | AC10 – Google social login | Given I click "Sign in with Google" Then a popup (500x400px) opens for Google authentication And on success, I am logged in and redirected to my account. | Sprint 5 User Stories — User Login — AC10 – Google social login \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

#### User Registration

**User Story:** As a new visitor, I want to create an account with strong password validation and real-time feedback, so that I can securely access the application.

| Requirement ID | Title | Acceptance Criteria | Acceptance Source |
|----------------|-------|---------------------|-------------------|
| REQ-S5-REG-001 | AC1 – Registration form fields | Given the registration form is displayed Then the following required fields are shown: - First name - Last name - Date of birth (ISO format YYYY-MM-DD) - Street - Postal code (numeric) - City - State - Country (dropdown) - Phone (numeric only) - Email (max 256 characters, RFC-compliant format) - Password | Sprint 5 User Stories — User Registration — AC1 – Registration form fields \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-REG-002 | AC2 – Password requirements displayed | Given the password input is focused Then a list of requirements is displayed: - at least 8 characters long - both uppercase and lowercase letters - at least one number - at least one special character | Sprint 5 User Stories — User Registration — AC2 – Password requirements displayed \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-REG-003 | AC3 – Real-time password validation | Given I type in the password field Then the requirements update immediately to reflect which rules are fulfilled. | Sprint 5 User Stories — User Registration — AC3 – Real-time password validation \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-REG-004 | AC4 – Password strength indicator | Given I am entering a password Then a strength indicator is displayed with levels: - Weak (1 criterion met, 20% bar) - Moderate (2 criteria met, 40% bar) - Strong (3 criteria met, 60% bar) - Very Strong (4 criteria met, 80% bar) - Excellent (all criteria met, 100% bar) | Sprint 5 User Stories — User Registration — AC4 – Password strength indicator \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-REG-005 | AC5 – Duplicate email | Given the email is already registered Then the error "Email is already in use." is displayed. | Sprint 5 User Stories — User Registration — AC5 – Duplicate email \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |
| REQ-S5-REG-006 | AC6 – Successful registration | Given all fields are valid When I submit the form Then the account is created And a confirmation email is sent to the registered email address And I am redirected to the login page. | Sprint 5 User Stories — User Registration — AC6 – Successful registration \| https://testsmith-io.github.io/practice-software-testing/user-stories/v5.md \| Application_Context.md §10 |

---

### Business Rules (§4)

| Requirement ID | Module | Acceptance Criteria | Acceptance Source |
|----------------|--------|---------------------|-------------------|
| REQ-BR-001 | Business Rules — 4.1 Product & Inventory | Products with zero stock show **"Out of stock"** and disable **Add to Cart** (non-rental items) | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-002 | Business Rules — 4.1 Product & Inventory | Rental products are always orderable regardless of stock | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-003 | Business Rules — 4.1 Product & Inventory | Rental duration: 1–10 hours; total = hourly rate × duration | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-004 | Business Rules — 4.1 Product & Inventory | Quantity minimum: 1; maximum: 999,999,999 | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-005 | Business Rules — 4.1 Product & Inventory | Search query length: 3–40 characters | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-006 | Business Rules — 4.1 Product & Inventory | Applying search resets all active filters | Application_Context.md §4 — 4.1 Product & Inventory |
| REQ-BR-007 | Business Rules — 4.2 Cart & Pricing | Empty cart displays: `"Your shopping cart is empty"` | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-008 | Business Rules — 4.2 Cart & Pricing | Quantity update shows: `"Product quantity updated."` | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-009 | Business Rules — 4.2 Cart & Pricing | Add to cart shows: `"Product added to shopping cart."` | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-010 | Business Rules — 4.2 Cart & Pricing | Combination discount (15%) requires **at least one rental AND one non-rental** item | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-011 | Business Rules — 4.2 Cart & Pricing | Removing all items of one type removes the combination discount | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-012 | Business Rules — 4.2 Cart & Pricing | Location discounts apply at product card, detail, and cart line-item level | Application_Context.md §4 — 4.2 Cart & Pricing |
| REQ-BR-013 | Business Rules — 4.3 Authentication & Registration | Password requirements: | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-014 | Business Rules — 4.3 Authentication & Registration | Password strength levels: Weak (20%), Moderate (40%), Strong (60%), Very Strong (80%), Excellent (100%) | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-015 | Business Rules — 4.3 Authentication & Registration | Registration fields: first name, last name, DOB (YYYY-MM-DD), address, phone (numeric), email (max 256, RFC-compliant), password | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-016 | Business Rules — 4.3 Authentication & Registration | Duplicate email: `"Email is already in use."` | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-017 | Business Rules — 4.3 Authentication & Registration | Invalid login: `"Invalid email or password"` | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-018 | Business Rules — 4.3 Authentication & Registration | Account locked: `"Account locked, too many failed attempts. Please contact the administrator."` (HTTP 423) | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-019 | Business Rules — 4.3 Authentication & Registration | Invalid TOTP: `"Invalid TOTP"` | Application_Context.md §4 — 4.3 Authentication & Registration |
| REQ-BR-020 | Business Rules — 4.4 Checkout & Orders | Guest checkout requires login step before billing address | Application_Context.md §4 — 4.4 Checkout & Orders |
| REQ-BR-021 | Business Rules — 4.4 Checkout & Orders | Billing address fields (all required): | Application_Context.md §4 — 4.4 Checkout & Orders |
| REQ-BR-022 | Business Rules — 4.4 Checkout & Orders | Successful order: confirmation with invoice number, cart cleared, confirmation email sent | Application_Context.md §4 — 4.4 Checkout & Orders |
| REQ-BR-023 | Business Rules — 4.4 Checkout & Orders | Order statuses: `AWAITING_FULFILLMENT`, `ON_HOLD`, `AWAITING_SHIPMENT`, `SHIPPED`, `COMPLETED` | Application_Context.md §4 — 4.4 Checkout & Orders |
| REQ-BR-024 | Business Rules — 4.5 Contact Form | Message minimum length: **50 characters** | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-025 | Business Rules — 4.5 Contact Form | Subject options: Customer service, Webmaster, Return, Payments, Warranty, Status of order | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-026 | Business Rules — 4.5 Contact Form | File attachment: `.txt` only, must be exactly **0 KB** | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-027 | Business Rules — 4.5 Contact Form | Invalid file type: `"File should have a txt extension."` | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-028 | Business Rules — 4.5 Contact Form | Invalid file size: `"File should be empty."` | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-029 | Business Rules — 4.5 Contact Form | Logged-in users: name/email auto-filled and hidden; shows `"Known user, [Full Name]"` | Application_Context.md §4 — 4.5 Contact Form |
| REQ-BR-030 | Business Rules — 4.6 Gift Card Validation | Gift card number: exactly **16 alphanumeric** characters (`/^[A-Za-z0-9]{16}$/`) | Application_Context.md §4 — 4.6 Gift Card Validation |
| REQ-BR-031 | Business Rules — 4.6 Gift Card Validation | Validation code: exactly **4 alphanumeric** characters (`/^[A-Za-z0-9]{4}$/`) | Application_Context.md §4 — 4.6 Gift Card Validation |
| REQ-BR-032 | Business Rules — 4.6 Gift Card Validation | Validated at three layers: Angular form, `POST /payment/check`, `POST /invoices` | Application_Context.md §4 — 4.6 Gift Card Validation |
| REQ-BR-033 | Business Rules — 4.6 Gift Card Validation | Invalid format returns **422 Unprocessable Entity**; no invoice/payment created | Application_Context.md §4 — 4.6 Gift Card Validation |
| REQ-BR-034 | Business Rules — 4.7 Postcode Lookup | Endpoint: `GET /postcode-lookup?country={code}&postcode={code}&house_number={num}` | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-035 | Business Rules — 4.7 Postcode Lookup | Triggers when country + postcode + house number are all filled (300ms debounce) | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-036 | Business Rules — 4.7 Postcode Lookup | Default driver: Faker (deterministic fake addresses) | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-037 | Business Rules — 4.7 Postcode Lookup | HTTP driver: calls external mock/real service | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-038 | Business Rules — 4.7 Postcode Lookup | Admin UI override: local Docker only (hidden on production) | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-039 | Business Rules — 4.7 Postcode Lookup | Failure returns **502 Bad Gateway** | Application_Context.md §4 — 4.7 Postcode Lookup |
| REQ-BR-040 | Business Rules — 4.8 Multi-Language | Supported: English, German, Spanish, French, Dutch, Turkish | Application_Context.md §4 — 4.8 Multi-Language |
| REQ-BR-041 | Business Rules — 4.8 Multi-Language | First visit: auto-detect browser language; fallback to English | Application_Context.md §4 — 4.8 Multi-Language |
| REQ-BR-042 | Business Rules — 4.8 Multi-Language | Preference stored in `localStorage`; takes priority over browser detection | Application_Context.md §4 — 4.8 Multi-Language |

---

### Role-Based Access (§2)

| Requirement ID | Rule | Acceptance Criteria | Acceptance Source |
|----------------|------|---------------------|-------------------|
| REQ-RBAC-001 | Favorites | Requires authentication; guests receive `"Unauthorized, can not add product to your favorite list."` | Application_Context.md §2 — Role-Based Access Rules |
| REQ-RBAC-002 | Invoices & Messages | Only accessible to the authenticated owner; other users' invoices return "not found" | Application_Context.md §2 — Role-Based Access Rules |
| REQ-RBAC-003 | Admin panel | Restricted to admin role (`/admin/*`) | Application_Context.md §2 — Role-Based Access Rules |
| REQ-RBAC-004 | TOTP setup | Denied for `customer@practicesoftwaretesting.com` and `admin@practicesoftwaretesting.com` (use a self-registered account) | Application_Context.md §2 — Role-Based Access Rules |
| REQ-RBAC-005 | Account locking | Applies to regular users after **3 consecutive failed login attempts** (HTTP 423); admins are never locked | Application_Context.md §2 — Role-Based Access Rules |
| REQ-RBAC-006 | Disabled accounts | Admin can disable user accounts; disabled users see `"Account disabled."` on login | Application_Context.md §2 — Role-Based Access Rules |

---

### REST API Coverage (§6)

> **Source:** [OpenAPI Spec](https://api.practicesoftwaretesting.com/docs?api-docs.json) · [Swagger UI](https://api.practicesoftwaretesting.com/api/documentation)  

> **Base URL:** `https://api.practicesoftwaretesting.com` · **Auth:** JWT Bearer token via `POST /users/login`  

> **Coverage tiers:** Smoke (critical path) · Regression (full contract) · Regression (Auth) · Regression (Admin)

#### API — Brands

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-BRD-001 | GET | `/brands` | Smoke | When calling GET `/brands` then the API responds per the OpenAPI contract. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-002 | POST | `/brands` | Regression (Admin) | When calling POST `/brands` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-003 | GET | `/brands/search` | Regression | When calling GET `/brands/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-004 | QUERY | `/brands/search` | Regression | When calling QUERY `/brands/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-005 | DELETE | `/brands/{brandId}` | Regression (Admin) | When calling DELETE `/brands/{brandId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-006 | GET | `/brands/{brandId}` | Regression | When calling GET `/brands/{brandId}` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-007 | PATCH | `/brands/{brandId}` | Regression (Admin) | When calling PATCH `/brands/{brandId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-BRD-008 | PUT | `/brands/{brandId}` | Regression (Admin) | When calling PUT `/brands/{brandId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Brand \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Carts

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-CART-001 | POST | `/carts` | Smoke | When calling POST `/carts` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CART-002 | DELETE | `/carts/{cartId}` | Regression | When calling DELETE `/carts/{cartId}` then the API responds per the OpenAPI contract. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CART-003 | GET | `/carts/{cartId}` | Regression | When calling GET `/carts/{cartId}` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CART-004 | PUT | `/carts/{cartId}/product/quantity` | Regression | When calling PUT `/carts/{cartId}/product/quantity` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CART-005 | DELETE | `/carts/{cartId}/product/{productId}` | Regression | When calling DELETE `/carts/{cartId}/product/{productId}` then the API responds per the OpenAPI contract. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CART-006 | POST | `/carts/{id}` | Regression | When calling POST `/carts/{id}` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Cart \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Categories

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-CAT-001 | GET | `/categories` | Smoke | When calling GET `/categories` then the API responds per the OpenAPI contract. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-002 | POST | `/categories` | Regression (Admin) | When calling POST `/categories` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-003 | GET | `/categories/search` | Regression | When calling GET `/categories/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-004 | QUERY | `/categories/search` | Regression | When calling QUERY `/categories/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-005 | GET | `/categories/tree` | Regression | When calling GET `/categories/tree` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-006 | QUERY | `/categories/tree` | Regression | When calling QUERY `/categories/tree` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-007 | GET | `/categories/tree/{categoryId}` | Regression | When calling GET `/categories/tree/{categoryId}` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-008 | DELETE | `/categories/{categoryId}` | Regression (Admin) | When calling DELETE `/categories/{categoryId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-009 | PATCH | `/categories/{categoryId}` | Regression (Admin) | When calling PATCH `/categories/{categoryId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-CAT-010 | PUT | `/categories/{categoryId}` | Regression (Admin) | When calling PUT `/categories/{categoryId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Category \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Contact Messages

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-MSG-001 | GET | `/messages` | Regression (Auth) | When calling GET `/messages` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-MSG-002 | POST | `/messages` | Regression (Auth) | When calling POST `/messages` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-MSG-003 | GET | `/messages/{messageId}` | Regression (Auth) | When calling GET `/messages/{messageId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-MSG-004 | POST | `/messages/{messageId}/attach-file` | Regression (Auth) | When calling POST `/messages/{messageId}/attach-file` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-MSG-005 | POST | `/messages/{messageId}/reply` | Regression (Auth) | When calling POST `/messages/{messageId}/reply` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-MSG-006 | PUT | `/messages/{messageId}/status` | Regression (Admin) | When calling PUT `/messages/{messageId}/status` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Contact \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Favorites

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-FAV-001 | GET | `/favorites` | Regression (Auth) | When calling GET `/favorites` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Favorite \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-FAV-002 | POST | `/favorites` | Regression (Auth) | When calling POST `/favorites` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Favorite \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-FAV-003 | DELETE | `/favorites/{favoriteId}` | Regression (Auth) | When calling DELETE `/favorites/{favoriteId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Favorite \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-FAV-004 | GET | `/favorites/{favoriteId}` | Regression (Auth) | When calling GET `/favorites/{favoriteId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Favorite \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Images

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-IMG-001 | GET | `/images` | Regression | When calling GET `/images` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Image \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Invoices & Orders

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-INV-001 | GET | `/invoices` | Smoke | When calling GET `/invoices` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-002 | POST | `/invoices` | Regression (Auth) | When calling POST `/invoices` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-003 | POST | `/invoices/guest` | Regression | When calling POST `/invoices/guest` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-004 | GET | `/invoices/search` | Regression (Auth) | When calling GET `/invoices/search` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-005 | QUERY | `/invoices/search` | Regression | When calling QUERY `/invoices/search` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-006 | GET | `/invoices/{invoiceId}` | Regression (Auth) | When calling GET `/invoices/{invoiceId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-007 | PATCH | `/invoices/{invoiceId}` | Regression (Auth) | When calling PATCH `/invoices/{invoiceId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-008 | PUT | `/invoices/{invoiceId}` | Regression (Auth) | When calling PUT `/invoices/{invoiceId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-009 | PUT | `/invoices/{invoiceId}/status` | Regression (Admin) | When calling PUT `/invoices/{invoiceId}/status` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-010 | GET | `/invoices/{invoice_number}/download-pdf` | Regression (Auth) | When calling GET `/invoices/{invoice_number}/download-pdf` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-INV-011 | GET | `/invoices/{invoice_number}/download-pdf-status` | Regression (Auth) | When calling GET `/invoices/{invoice_number}/download-pdf-status` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — Invoice \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Payment

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-PAY-001 | POST | `/payment/check` | Smoke | When calling POST `/payment/check` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Payment \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Postcode Lookup

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-PCL-001 | GET | `/postcode-lookup` | Regression | When calling GET `/postcode-lookup` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Postcode \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Product Specs

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-PSPEC-001 | GET | `/product-specs/names` | Regression | When calling GET `/product-specs/names` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PSPEC-002 | GET | `/products/{productId}/specs` | Regression | When calling GET `/products/{productId}/specs` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PSPEC-003 | POST | `/products/{productId}/specs` | Regression (Admin) | When calling POST `/products/{productId}/specs` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PSPEC-004 | DELETE | `/products/{productId}/specs/{specId}` | Regression (Admin) | When calling DELETE `/products/{productId}/specs/{specId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PSPEC-005 | GET | `/products/{productId}/specs/{specId}` | Regression | When calling GET `/products/{productId}/specs/{specId}` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PSPEC-006 | PUT | `/products/{productId}/specs/{specId}` | Regression (Admin) | When calling PUT `/products/{productId}/specs/{specId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product Spec \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Products

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-PRD-001 | GET | `/products` | Smoke | When calling GET `/products` then the API responds per the OpenAPI contract. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-002 | POST | `/products` | Regression (Admin) | When calling POST `/products` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-003 | QUERY | `/products` | Regression | When calling QUERY `/products` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-004 | GET | `/products/search` | Regression | When calling GET `/products/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-005 | QUERY | `/products/search` | Regression | When calling QUERY `/products/search` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-006 | DELETE | `/products/{productId}` | Regression (Admin) | When calling DELETE `/products/{productId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-007 | GET | `/products/{productId}` | Smoke | When calling GET `/products/{productId}` then the API responds per the OpenAPI contract. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-008 | PATCH | `/products/{productId}` | Regression (Admin) | When calling PATCH `/products/{productId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-009 | PUT | `/products/{productId}` | Regression (Admin) | When calling PUT `/products/{productId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-PRD-010 | GET | `/products/{productId}/related` | Regression | When calling GET `/products/{productId}/related` then the API responds per the OpenAPI contract. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — Product \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Reports (Admin)

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-RPT-001 | GET | `/reports/average-sales-per-month` | Regression (Admin) | When calling GET `/reports/average-sales-per-month` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-002 | GET | `/reports/average-sales-per-week` | Regression (Admin) | When calling GET `/reports/average-sales-per-week` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-003 | GET | `/reports/customers-by-country` | Regression (Admin) | When calling GET `/reports/customers-by-country` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-004 | GET | `/reports/top10-best-selling-categories` | Regression (Admin) | When calling GET `/reports/top10-best-selling-categories` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-005 | GET | `/reports/top10-purchased-products` | Regression (Admin) | When calling GET `/reports/top10-purchased-products` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-006 | GET | `/reports/total-sales-of-years` | Regression (Admin) | When calling GET `/reports/total-sales-of-years` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-RPT-007 | GET | `/reports/total-sales-per-country` | Regression (Admin) | When calling GET `/reports/total-sales-per-country` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — Report \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — TOTP

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-TOTP-001 | POST | `/totp/setup` | Regression (Auth) | When calling POST `/totp/setup` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — TOTP \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-TOTP-002 | POST | `/totp/verify` | Regression (Auth) | When calling POST `/totp/verify` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — TOTP \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

#### API — Users & Authentication

| Requirement ID | Method | Endpoint | Coverage | Acceptance Criteria | Acceptance Source |
|----------------|--------|----------|----------|---------------------|-------------------|
| REQ-API-USR-001 | GET | `/users` | Regression (Admin) | When calling GET `/users` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-002 | POST | `/users/change-password` | Regression (Auth) | When calling POST `/users/change-password` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-003 | POST | `/users/forgot-password` | Regression | When calling POST `/users/forgot-password` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-004 | POST | `/users/login` | Smoke | When calling POST `/users/login` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Smoke. | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-005 | GET | `/users/logout` | Regression (Auth) | When calling GET `/users/logout` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-006 | GET | `/users/me` | Regression (Auth) | When calling GET `/users/me` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-007 | GET | `/users/refresh` | Regression (Auth) | When calling GET `/users/refresh` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Coverage tier: Regression (Auth). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-008 | POST | `/users/register` | Regression | When calling POST `/users/register` then the API responds per the OpenAPI contract. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-009 | GET | `/users/search` | Regression (Admin) | When calling GET `/users/search` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-010 | QUERY | `/users/search` | Regression | When calling QUERY `/users/search` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression. | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-011 | DELETE | `/users/{userId}` | Regression (Admin) | When calling DELETE `/users/{userId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Deleting a non-existent resource returns 404 Not Found. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-012 | GET | `/users/{userId}` | Regression (Admin) | When calling GET `/users/{userId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-013 | PATCH | `/users/{userId}` | Regression (Admin) | When calling PATCH `/users/{userId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |
| REQ-API-USR-014 | PUT | `/users/{userId}` | Regression (Admin) | When calling PUT `/users/{userId}` then the API responds per the OpenAPI contract. Without a valid JWT Bearer token the API returns 401 Unauthorized. Customer-role tokens must receive 403 Forbidden. Invalid request payload returns 422 Unprocessable Entity with validation errors. Coverage tier: Regression (Admin). | Application_Context.md §6 — REST API Reference — User \| https://api.practicesoftwaretesting.com/docs?api-docs.json \| Swagger: https://api.practicesoftwaretesting.com/api/documentation |

---

## 5. Traceability

| Artifact | Relationship |
|----------|--------------|
| [`Application_Context.md`](Application_Context.md) | Parent context document |
| [`requirements_document.csv`](requirements_document.csv) | Full requirements export (all columns) |
| [`requirements_document.xlsx`](requirements_document.xlsx) | Excel workbook with Requirements, Summary, and ID Convention sheets |
| [`test_plan.md`](test_plan.md) | Test coverage derived from requirements |
| [`risk_analysis.md`](risk_analysis.md) | Risk prioritization by feature |
| [`FunctionalTestCase.csv`](FunctionalTestCase.csv) | All test scenarios: UI manual, API automation, and E2E (UI/API/cross-layer) |
| [`FunctionalTestCase.xlsx`](FunctionalTestCase.xlsx) | Excel workbook with Test Cases, Summary, and ID Convention sheets |

---

*Generated from Application_Context.md — Practice Software Testing Toolshop.*
