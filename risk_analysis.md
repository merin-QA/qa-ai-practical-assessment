# QA Risk Analysis — Practice Software Testing Toolshop

> **Application:** [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)  
> **Documentation:** [https://testsmith-io.github.io/practice-software-testing/#/](https://testsmith-io.github.io/practice-software-testing/#/)  
> **Version:** Sprint 5 (Full Platform)  
> **Related:** See [Application_Context.md](./Application_Context.md) for feature details and business rules.

---

## Risk Rating Criteria

| Priority | Definition |
|----------|------------|
| **High** | Direct impact on revenue, security, financial accuracy, or access control. Failure can block purchases, expose data, or allow unauthorized actions. |
| **Medium** | Important to user experience or data quality, but failure is recoverable or limited in scope. Often involves complex logic or secondary integrations. |
| **Low** | Limited business impact. Failures are mostly cosmetic, informational, or affect non-critical paths. |

Risk priority is based on **business impact**, **security sensitivity**, **workflow complexity**, **data integrity**, and **blast radius** if the feature fails.

---

## High Risk Features

### 1. Authentication & Login (JWT, Account Locking, Route Guards)

**Why High:** This is the security boundary for the entire application. Failures can allow unauthorized access to accounts, admin functions, invoices, and checkout.

| Risk Area | Concern |
|-----------|---------|
| JWT handling | Token leakage, expiry, or bypass could expose protected routes |
| Account locking | Must lock after 3 failed attempts (HTTP 423); admin exemption must hold |
| Disabled accounts | Disabled users must not authenticate |
| Role-based redirect | Users → `/account`, admins → `/admin/dashboard` |
| Checkout login | Guest checkout login must support TOTP when enabled |

**Key test focus:** Brute-force locking, disabled account login, direct URL access to `/admin` and `/account` without auth, TOTP during checkout login.

---

### 2. Two-Factor Authentication (TOTP)

**Why High:** Security control for account protection. A broken TOTP flow either locks out legitimate users or weakens account security.

| Risk Area | Concern |
|-----------|---------|
| Setup flow | QR code generation, secret display, verification |
| Login enforcement | Valid credentials must still require TOTP when enabled |
| Bypass risk | Login without TOTP when it should be required |
| Restricted accounts | Default test accounts must be denied TOTP setup |

**Key test focus:** Setup → login with TOTP, invalid codes, bypass attempts via API, checkout login with TOTP enabled.

---

### 3. Social Login (Google OAuth)

**Why High:** Third-party auth integration with popup flow. Failures can cause auth bypass, account linking issues, or session inconsistencies.

| Risk Area | Concern |
|-----------|---------|
| OAuth popup | 500×400px popup, callback handling |
| Account creation/linking | New vs existing user handling |
| Session management | JWT issued correctly after social login |

**Key test focus:** Successful login, popup cancellation, invalid OAuth responses, session persistence.

---

### 4. User Registration

**Why High:** Entry point for new accounts. Weak server-side validation can create insecure accounts or duplicate identities.

| Risk Area | Concern |
|-----------|---------|
| Password policy | 8+ chars, upper/lower, number, special char — must be enforced server-side |
| Email uniqueness | `"Email is already in use."` must block duplicates |
| Field validation | DOB format, phone numeric, email RFC-compliant (max 256) |
| Confirmation email | Must be sent on successful registration |

**Key test focus:** Bypass client-side password rules via API, duplicate email, invalid field formats, SQL/XSS in registration fields.

---

### 5. Forgot Password & Change Password

**Why High:** Account takeover vectors. Password reset must only work for valid accounts; change password must verify current credentials.

| Risk Area | Concern |
|-----------|---------|
| Forgot password | Only registered emails; new password emailed |
| Change password | Current password verification, new ≠ current, confirmation match |
| Post-change behavior | User logged out after 5 seconds on successful change |
| Enumeration | Error handling for non-existent emails |

**Key test focus:** Reset for unregistered email, change with wrong current password, reuse current password as new password.

---

### 6. Shopping Cart & Checkout (End-to-End)

**Why High:** Core revenue path. Multi-step wizard with server-side cart persistence. Failures cause lost orders, wrong totals, or orphaned carts.

| Risk Area | Concern |
|-----------|---------|
| Cart CRUD | Create, add, update quantity, delete via API |
| Multi-step flow | Cart → Sign In → Address → Payment |
| Guest vs authenticated | Login step skipped when already signed in |
| Order completion | Invoice created, cart cleared, confirmation email sent |
| State persistence | Cart survives across steps and sessions |

**Key test focus:** Full E2E guest and authenticated checkout, cart state after browser refresh, empty cart handling, step navigation (back/forward).

---

### 7. Payment Methods & Validation

**Why High:** Direct financial impact. Five payment methods with distinct validation rules. Client/server mismatch can allow invalid payments to succeed.

| Method | High-Risk Validation |
|--------|---------------------|
| Credit Card | Format `XXXX-XXXX-XXXX-XXXX`, future expiry, CVV 3–4 digits |
| Bank Transfer | Field format rules per account type |
| Gift Card | 16-char number + 4-char code (validated at 3 layers) |
| Buy Now Pay Later | Installment options 3/6/9/12 |
| Cash on Delivery | No extra fields — order must still complete |

**Key test focus:** Invalid payment details rejected at UI and API (`POST /payment/check`, `POST /invoices`), payment method switch resets form, bypass pre-check via direct API call.

---

### 8. Discounts (Geo-Location, Combination, Location Offer)

**Why High:** Pricing errors directly affect revenue and customer trust. Multiple discount types can interact across product card, cart, and invoice.

| Discount Type | Risk |
|---------------|------|
| Geo-location | NYC 5%, Mumbai 10%, Tokyo 15%, Amsterdam 20%, London 25% — wrong city = wrong price |
| Combination | 15% off when cart has rental + non-rental; must remove when condition breaks |
| Location offer | Applies to eligible products including rentals |
| Stacking | Discount must be consistent across catalog → cart → invoice |

**Key test focus:** Discount applied/removed correctly, invoice totals match cart, geo-location spoofing, combination discount edge cases (add/remove items).

---

### 9. Invoices & PDF Download

**Why High:** Financial records with user data isolation. IDOR (accessing another user's invoice) is a critical security risk. PDF generation is async with polling.

| Risk Area | Concern |
|-----------|---------|
| Data isolation | Users see only their own invoices |
| Invoice accuracy | Line items, discounts, subtotals, payment details |
| PDF generation | Async status polling (every 20s), download when ready |
| Non-existent invoice | "Not found" for invalid/unauthorized IDs |

**Key test focus:** Cross-user invoice access via URL/API, discount display on invoice detail, PDF download timing and content.

---

### 10. Admin — User Management

**Why High:** Privileged operations on user accounts. Incorrect enable/disable or role handling can lock out users or elevate privileges.

| Risk Area | Concern |
|-----------|---------|
| Enable/disable toggle | Disabled users cannot login immediately |
| User CRUD | List, view, edit, delete |
| Access control | Only admins can access `/admin/users` |

**Key test focus:** Disable user → verify login blocked → re-enable → login restored, non-admin access denied.

---

### 11. Admin — Order Management

**Why High:** Controls order fulfillment lifecycle. Wrong status updates affect customer experience and reporting.

| Risk Area | Concern |
|-----------|---------|
| Status transitions | AWAITING_FULFILLMENT → ON_HOLD → AWAITING_SHIPMENT → SHIPPED → COMPLETED |
| Order detail accuracy | Matches customer invoice |
| Admin-only access | Non-admins cannot modify orders |

**Key test focus:** All valid status values, status reflected in customer view/reports, unauthorized status change attempts.

---

### 12. Role-Based Access Control (RBAC)

**Why High:** Cross-cutting security concern affecting favorites, invoices, messages, and admin panel.

| Rule | Risk if Broken |
|------|----------------|
| Favorites require auth | Guest cart manipulation or data leak |
| Invoices owner-only | Financial data exposure (IDOR) |
| Admin panel admin-only | Full system compromise |
| TOTP denied for default accounts | Test account security bypass |

**Key test focus:** API-level authorization tests for all protected endpoints, direct URL navigation without proper role.

---

## Medium Risk Features

### 13. Product Catalog (Search, Filter, Sort, Pagination, Price Range)

**Why Medium:** Drives product discovery but is read-only. Wrong results frustrate users without direct financial loss. Logic is complex (hierarchical categories, combined filters, search resets filters).

| Risk Area | Concern |
|-----------|---------|
| Search | 3–40 char validation, resets filters on submit |
| Hierarchical categories | Parent checks all children; uncheck children unchecks parent |
| Combined filters | Category + brand intersection |
| Price range slider | Default $1–$100, max $200 |
| Pagination | Correct page counts and navigation |

**Key test focus:** Filter combinations, search + filter interaction, empty results, boundary values on price slider.

---

### 14. Product Detail & Add to Cart

**Why Medium:** Gateway to checkout. Out-of-stock and quantity rules must be enforced before payment.

| Risk Area | Concern |
|-----------|---------|
| Out of stock | Button disabled for non-rental items with zero stock |
| Quantity limits | Clamped 1–999,999,999; +/- button boundaries |
| Add to cart | Success toast, correct quantity in cart |
| Discount display | Strikethrough original + discounted price |

**Key test focus:** Out-of-stock purchase prevention, extreme quantity values, cart reflects selected quantity.

---

### 15. Rental Products

**Why Medium:** Special pricing model (hourly rate × duration 1–10 hours). Always orderable regardless of stock. Feeds into combination discount logic.

| Risk Area | Concern |
|-----------|---------|
| Duration slider | 1–10 hours, price recalculation |
| Rental label in checkout | "This is a rental item" displayed |
| Stock exemption | Rentable even when out of stock |
| Location discount on rentals | Applies when product is location offer |

**Key test focus:** Price calculation accuracy, rental + non-rental combination discount trigger.

---

### 16. Postcode / Address Lookup

**Why Medium:** External dependency (Faker default, HTTP driver optional). Affects billing address accuracy on registration and checkout. Production has defense-in-depth against SSRF.

| Risk Area | Concern |
|-----------|---------|
| Autofill trigger | Country + postcode + house number, 300ms debounce |
| Failure handling | 502 Bad Gateway on upstream failure |
| Address accuracy | Street, city, state, country, postcode populated |
| Local-only admin override | Hidden on production |

**Key test focus:** Valid lookup autofill, debounce behavior, failure UX, admin override only in local Docker.

---

### 17. Customer Profile Management

**Why Medium:** PII update with email read-only. Incorrect saves affect checkout address pre-fill and invoice billing details.

| Risk Area | Concern |
|-----------|---------|
| Editable fields | Name, phone, address fields required |
| Email read-only | Cannot be changed via profile |
| Pre-fill checkout | Logged-in user address auto-populated |

**Key test focus:** Required field validation, profile changes reflected in checkout, email immutability.

---

### 18. Favorites

**Why Medium:** Auth-gated feature with duplicate detection. Lower business impact than checkout but tests authorization rules.

| Risk Area | Concern |
|-----------|---------|
| Auth required | Guest gets unauthorized message |
| Duplicate handling | "Product already in your favorites list." |
| Remove favorite | List refreshes after delete |

**Key test focus:** Guest access blocked, add/remove lifecycle, duplicate add.

---

### 19. Contact Messages (Account & Admin)

**Why Medium:** Support workflow with status tracking (NEW / IN_PROGRESS / RESOLVED). Admin reply functionality.

| Risk Area | Concern |
|-----------|---------|
| Message list | Paginated, truncated display |
| Reply flow | Customer and admin can reply |
| Status badges | Correct status displayed |

**Key test focus:** Reply threading, status updates by admin, message detail accuracy.

---

### 20. Chat Widget (Find, Order, Checkout, Support)

**Why Medium:** Parallel checkout and support path. Duplicates core flows in a conversational UI — inconsistency between chat and standard UI is a key risk.

| Risk Area | Concern |
|-----------|---------|
| Find Product | Search returns up to 5 results |
| Order Product | Quantity selection, add to cart |
| Checkout | Full flow in chat (guest details, address, payment) |
| Support | Same rules as contact form (50 char min, .txt attachment) |
| Empty cart | "Your cart is empty" in checkout |

**Key test focus:** Chat checkout vs standard checkout parity, cart state shared between paths.

---

### 21. Admin — Product/Category/Brand CRUD

**Why Medium:** Catalog integrity affects all users. Incorrect CRUD can break product display, filtering, or checkout.

| Risk Area | Concern |
|-----------|---------|
| Product CRUD | Create, edit, delete with all fields |
| Category hierarchy | Parent category assignment |
| Brand management | Linked to product filtering |
| Cascade effects | Deleting category/brand with linked products |

**Key test focus:** CRUD lifecycle, hierarchical category integrity, deleted entities removed from catalog.

---

### 22. Admin — Reports & Dashboard

**Why Medium:** Business intelligence. Wrong data affects admin decisions but not customer transactions directly.

| Risk Area | Concern |
|-----------|---------|
| Sales bar chart | Total sales by year |
| Recent invoices | Paginated list on dashboard |
| Reports | Monthly sales, weekly sales, general statistics |

**Key test focus:** Report data matches actual orders, chart accuracy after new orders.

---

### 23. Email Notifications

**Why Medium:** Async, depends on mail infrastructure. Order may succeed even if email fails — but missing confirmation emails hurt trust.

| Notification | Trigger |
|--------------|---------|
| Registration confirmation | Account created |
| Password reset | Forgot password submitted |
| Checkout confirmation | Order placed |
| Contact form | Message submitted |

**Key test focus:** Email sent on success (MailHog in local Docker), content accuracy (invoice number in checkout email).

---

### 24. REST & GraphQL APIs

**Why Medium:** Parallel surface to the UI. Same business rules must apply. GraphQL used for product comparison page.

| Risk Area | Concern |
|-----------|---------|
| JWT on protected endpoints | `/invoices`, `/users/search` (admin) |
| HTTP QUERY method | RFC 10008 for search/filter |
| GraphQL authorization | `@guard` on protected fields |
| API/UI parity | Same validation as frontend |

**Key test focus:** Unauthorized API access, direct `POST /invoices` bypassing UI validation, GraphQL field-level auth.

---

## Low Risk Features

### 25. Multi-Language Support (i18n)

**Why Low:** Display and localization issue. Core functionality works in English; wrong translation does not block purchases or compromise security.

| Risk Area | Concern |
|-----------|---------|
| Browser detection | EN, DE, ES, FR, NL, TR |
| Language selector | UI labels update |
| localStorage persistence | Preference survives sessions |
| Fallback | Unsupported languages default to English |

**Key test focus:** Language switch updates UI, persistence across refresh, fallback behavior.

---

### 26. Privacy Policy Page

**Why Low:** Static informational content at `/privacy`. No transactional or security logic.

**Key test focus:** Page accessible, content covers required topics (Google Sign-In, data collection, removal policy).

---

### 27. Contact Form (Advanced)

**Why Low:** Support channel, not revenue-critical. Unusual file rules (0 KB `.txt` only) are edge-case validation.

| Risk Area | Concern |
|-----------|---------|
| Message min length | 50 characters |
| File attachment | `.txt` only, exactly 0 KB |
| Auto-fill for logged-in users | Name/email hidden |
| Subject dropdown | 6 predefined options |

**Key test focus:** File type/size rejection, min message length, guest vs logged-in field display.

---

### 28. Product Comparison

**Why Low:** Secondary browsing feature using GraphQL. Helps decision-making but is not on the purchase critical path.

| Risk Area | Concern |
|-----------|---------|
| Side-by-side specs | Multiple products compared |
| GraphQL query | Aliased queries for efficiency |
| Highlight differences | Optional diff view |

**Key test focus:** Comparison loads correct specs, handles 2–3 products, GraphQL errors handled gracefully.

---

### 29. Password Strength Indicator

**Why Low:** UX feedback only. Server-side password policy is the real enforcement. Indicator mismatch is cosmetic.

| Risk Area | Concern |
|-----------|---------|
| 5 strength levels | Weak → Excellent |
| Real-time update | Criteria checkmarks |
| Registration & change password | Same indicator in both forms |

**Key test focus:** Indicator updates as user types; verify server still rejects weak passwords regardless of indicator.

---

### 30. Related Products Section

**Why Low:** Recommendation display on product detail. Wrong or missing related products do not block purchase.

**Key test focus:** Related products displayed, links navigate to correct detail pages.

---

### 31. Out-of-Stock Indicator (Catalog Cards)

**Why Low:** Display-only on product overview. Actual purchase prevention happens on product detail (Medium risk #14).

**Key test focus:** "Out of stock" label visible on cards for zero-stock products.

---

### 32. Admin Settings (Postcode Lookup Override)

**Why Low:** Local Docker only, hidden on production. Admin convenience feature with defense-in-depth against SSRF.

**Key test focus:** Setting visible only in local builds, backend ignores override on production.

---

### 33. Mobile App (React Native)

**Why Low:** Separate channel integrated with Sprint 4. Shared environment but not the primary Sprint 5 web testing surface.

| Risk Area | Concern |
|-----------|---------|
| Data sync | Changes on mobile appear on web |
| Feature parity | Subset of web features |

**Key test focus:** Cross-platform data consistency if mobile is in scope.

---

## Risk Summary Matrix

| Priority | Feature Count | Features |
|----------|---------------|----------|
| **High** | 12 | Auth/Login, TOTP, Social Login, Registration, Password Reset/Change, Cart & Checkout, Payments, Discounts, Invoices/PDF, Admin User Mgmt, Admin Order Mgmt, RBAC |
| **Medium** | 12 | Product Catalog, Product Detail/Add to Cart, Rentals, Postcode Lookup, Profile, Favorites, Messages, Chat Widget, Admin CRUD, Reports/Dashboard, Email Notifications, REST/GraphQL APIs |
| **Low** | 9 | Multi-language, Privacy Policy, Contact Form, Product Comparison, Password Strength Indicator, Related Products, Out-of-Stock Display, Admin Settings, Mobile App |

---

## Recommended Test Priority (Risk-Based)

### Suggested allocation

| Priority | Suggested Test Effort | Rationale |
|----------|----------------------|-----------|
| **High** | ~50–60% | Security, payments, and order integrity |
| **Medium** | ~30–35% | Complex logic and integration paths |
| **Low** | ~10–15% | Smoke and regression on non-critical features |

### Test execution order

1. **High risk first** — Auth & RBAC, Checkout & Payments, Discounts & Invoices, Admin User/Order Management
2. **Medium risk second** — Catalog & Rentals, Chat Widget & APIs, Profile & Messages
3. **Low risk last** — i18n & static pages, comparison & UX helpers

---

## Cross-Cutting High-Risk Scenarios

These span multiple features and should be tested as integrated scenarios:

| # | Scenario | Features Involved |
|---|----------|-------------------|
| 1 | Guest checkout with combination discount + gift card payment | Cart, Discounts, Payment validation, Invoice |
| 2 | TOTP-enabled user completes checkout via chat widget | Auth, TOTP, Chat checkout parity |
| 3 | Admin disables user mid-checkout | User management, active session, Checkout |
| 4 | Geo-discount product + rental in same cart | Location discount, Combination discount stacking |
| 5 | API direct order creation bypassing UI validation | Payment check vs invoice creation security boundary |
| 6 | Cross-user invoice access | RBAC, Invoice data isolation |

---

*Risk analysis based on [Application_Context.md](./Application_Context.md) and official documentation at [testsmith-io.github.io/practice-software-testing](https://testsmith-io.github.io/practice-software-testing/#/).*
