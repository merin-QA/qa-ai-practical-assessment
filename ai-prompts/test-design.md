# AI Prompts – Test Design

Prompts used to create and refine manual test cases for UI and API.

---

## Entry 1 — Test Case Rules

- **Prompt:**

  ```
  update the .rules to include the priority for testcases , type of test case smoke , regression, E2E . Also for testcase created map it with the requirement document.
  ```

- **AI Response Summary:**

  Added `test-case-standards.mdc` with priority (P1/P2/P3), suite types (smoke/regression/E2E), and requirement mapping. Updated related `.rules` files.

- **Validation Notes:**

  Checked if the rules are correctly defined in the file created

---

## Entry 2 — Registration & Login Test Cases

- **Prompt:**

  ```
  create manual testcases for the user registeration and login
  ```

- **AI Response Summary:**

  Created 30 manual test cases for registration (14) and login (16) with steps, expected results, priority, and requirement IDs.

- **Validation Notes:**

  Mapped the testcases created with the requirement document tags , `REQ-S5-REG-*`, `REQ-S5-LOGIN-*`, and `REQ-BR-013` to `REQ-BR-019`. Checked proper messages are asserted and redirections in expected criteria matches with what is defined in `Application_Context.md`.
  

---

## Entry 3 — Rename Test Case Files

- **Prompt:**

  ```
  keep the testcases name  FunctionalTestCase and keep it root directory
  ```

- **AI Response Summary:**

  Moved files to root as `FunctionalTestCase.md` and `FunctionalTestCase.csv`. Renamed IDs to `FunctionalTestCase-REG-*` and `FunctionalTestCase-LOGIN-*`.

- **Validation Notes:**

  Verified all test case IDs and requirement mappings were preserved after renaming.
  Confirmed no data loss between the original and renamed files.
  

---

## Entry 4 — Excel Export

- **Prompt:**

  ```
  create an excel for FunctionalTestCase
  ```

- **AI Response Summary:**

  Created `FunctionalTestCase.xlsx` and `scripts/generateFunctionalTestCaseExcel.py`.

- **Validation Notes:**

  Ran the export script and verified that FunctionalTestCase.xlsx was generated successfully. Confirmed that all rows, columns, and test case details match the contents of FunctionalTestCase.csv.

---

## Entry 5 — Register → Login → Profile Scenario

- **Prompt:**

  ```
  verify the testcase is created for The user should be able to register with valid details, log in using the registered credentials, and verify their profile information successfully
  ```

- **AI Response Summary:**

  Found a gap. Updated `FunctionalTestCase-REG-014` to cover register, login, and profile verification in one E2E test.

- **Validation Notes:**

  Verified that the test case was updated to cover the complete Register → Login → Profile workflow. Confirmed that the test steps, expected results, and requirement mappings align with the corresponding requirements in requirements_document.md.
 

---

## Entry 6 — Products Purchase Journey

- **Prompt:**

  ```
  create manual testcases for  products purchase journey
  ```

- **AI Response Summary:**

  Added 28 test cases (`FunctionalTestCase-PUR-001` to `PUR-028`) for browse, cart, checkout, payment, rentals, discounts, and E2E purchase flows. Total cases: 58.

- **Validation Notes:**

  Verified that the generated purchase journey test cases are mapped to the corresponding checkout and product requirements in requirements_document.md. Confirmed that the selected UI scenarios cover the intended workflow. API test case generation is planned as a separate activity.
  

---

## Entry 7 — Multi-Item Purchase + Invoice Scenario

- **Prompt:**

  ```
  verify if this scenario is covered The user should be able to browse products, add multiple items to the cart (including updating quantity), complete the checkout using Cash on Delivery, and successfully view the generated invoice under My Invoices.
  ```

- **AI Response Summary:**

  Found a gap. Updated `FunctionalTestCase-PUR-028` to cover browse, multiple items, quantity update, Cash on Delivery, and invoice check in My Invoices.

- **Validation Notes:**

  Checked if the testcases is updated to accomodate this flow.The steps and expected values are properly mapped with the requirement document.
  Before: steps were split across PUR-011, PUR-020, and old PUR-028. After: one E2E test covers the full scenario.

---

## Entry 8 — API User Authentication & Cart Creation

- **Prompt:**

  ```
  create manual API testcases for User Authentication & Cart Creation
  ```

- **AI Response Summary:**

  Added 20 manual API test cases:
  - 11 for user auth (`FunctionalTestCase-API-AUTH-001` to `API-AUTH-011`) — login, register, token, profile
  - 9 for cart (`FunctionalTestCase-API-CART-001` to `API-CART-009`) — create cart, add items, errors

  Each case has API steps, expected HTTP status, and requirement IDs like `REQ-API-USR-*` and `REQ-API-CART-*`.

- **Validation Notes:**

  Checked live API with curl for login, register, and cart endpoints. Confirmed request/response details match what is written in the test cases.

---

## Entry 9 — API E2E: Register → Login → Create Cart

- **Prompt:**

  ```
  create an E2E API scenario for register, login, get bearer token, and create cart
  ```

- **AI Response Summary:**

  Added `FunctionalTestCase-API-E2E-001`. It covers the full flow in one test:
  register a new user → login → get JWT token → verify profile → create a cart.

- **Validation Notes:**

  Confirmed the E2E test links to auth and cart requirements. Steps follow the same order a real API client would use.

---

## Entry 10 — API Product Selection & Invoice Generation

- **Prompt:**

  ```
  create manual API testcases for Product Selection & Invoice Generation and cover E2E scenarios
  ```

- **AI Response Summary:**

  Added 16 more manual API test cases:

  **Product Selection (6 cases)** — `API-PRD-001` to `API-PRD-006`
  - List products, get product by ID, search, related products, 404 for bad ID, and add selected product to cart

  **Invoice Generation (8 cases)** — `API-INV-001` to `API-INV-008`
  - List invoices, payment check, create invoice, auth errors, invalid payment method, invoice detail, PDF status

  **E2E (2 cases)** — `API-E2E-002` and `API-E2E-003`
  - Single product: login → pick product → cart → payment → invoice → verify
  - Multiple products: two items, update quantity → invoice with both line items

  Total test cases went from 79 to **95**.

- **Validation Notes:**

  Tested the live API. Key finding: invoice creation needs `payment_method: "cash-on-delivery"` (not the UI label `"Cash on Delivery"`). Payment check endpoint still uses `"Cash on Delivery"`. Updated test data in the cases to match this.

---

## Output Files

| File | Purpose |
|------|---------|
| `FunctionalTestCase.md` | Manual test cases |
| `FunctionalTestCase.csv` | CSV export |
| `FunctionalTestCase.xlsx` | Excel export |
| `.cursor/Tool/.rules/test-case-standards.mdc` | Test case rules |

## Current Coverage

| Module | Cases |
|--------|:-----:|
| User Registration | 14 |
| User Login | 16 |
| Products Purchase Journey | 28 |
| API — User Authentication | 11 |
| API — Cart Creation | 9 |
| API — Product Selection | 6 |
| API — Invoice Generation | 8 |
| API — E2E | 3 |
| **Total** | **95** |

## Chat Summary (Simple Language)

This chat started with UI test cases and grew into API coverage:

1. **Rules** — Added test case standards for priority (P1/P2/P3), suite type (smoke/regression/E2E), and requirement mapping.
2. **Registration & Login** — 30 UI manual test cases with steps and expected results.
3. **File naming** — Everything moved to root as `FunctionalTestCase.md`, `.csv`, and `.xlsx`.
4. **Purchase journey** — 28 UI test cases for browse, cart, checkout, payment, and invoices.
5. **Gap fixes** — Two E2E scenarios were improved:
   - Register → login → check profile (`REG-014`)
   - Multi-item purchase with Cash on Delivery and invoice check (`PUR-028`)
6. **API auth & cart** — 20 manual API test cases for login, register, tokens, and cart operations.
7. **API E2E auth** — One full flow: register → login → token → create cart.
8. **API products & invoices** — 16 manual API test cases plus 2 E2E flows from product pick to invoice.

All cases live in `FunctionalTestCase.md` (full detail), `FunctionalTestCase.csv`, and `FunctionalTestCase.xlsx`. Run `python3 scripts/generateFunctionalTestCaseExcel.py` to refresh the Excel file after CSV changes.

## Note

AI was initially used to generate a broader set of manual test cases. Based on the assessment guidance, only a focused subset of high-priority scenarios (5–8 manual test cases) was selected for implementation and further automation.
