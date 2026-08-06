# AI Prompts – Test Data

Prompts used to build the automation test case list and the test data files that support it.

---

## Entry 1 — Automation Test Case Excel (Smoke)

- **Prompt:**

  ```
  from the FunctionalTestCase pick first 4 smoke testcases and add it into another excel names Autoamtion_testcases.xlsx
  ```

- **AI Response Summary:**

  Created `Automation_testcases.xlsx` in the project root with the first 4 smoke test cases from `FunctionalTestCase.csv`:

  1. `FunctionalTestCase-REG-001` — Registration form displays all required fields
  2. `FunctionalTestCase-REG-009` — Successful registration with valid data
  3. `FunctionalTestCase-LOGIN-001` — Login form displays email, password, and Google sign-in
  4. `FunctionalTestCase-LOGIN-002` — Successful login as customer redirects to account

  The Excel file uses the same columns and formatting as `FunctionalTestCase.xlsx`.

- **Validation Notes:**

  Confirmed 4 rows were added with correct test case IDs, suite type (Smoke), and matching data from the source CSV.

---

## Entry 2 — Add UI Regression Test Case

- **Prompt:**

  ```
  add one ui regession test case as well
  ```

- **AI Response Summary:**

  Added one UI regression test case to `Automation_testcases.xlsx`:

  - `FunctionalTestCase-REG-002` — Password requirements list shown on password field focus

  Total test cases in the file: **5**.

- **Validation Notes:**

  Verified that the selected regression test case complements the existing smoke scenarios and provides additional functional coverage without duplicating the smoke suite.
---

## Entry 3 — Add API Smoke and E2E Test Cases

- **Prompt:**

  ```
  from api testcases also add 3 smoke and one e2e testcase in Automation_testcases.xlsx
  ```

- **AI Response Summary:**

  Added 4 API test cases to `Automation_testcases.xlsx`:

  **Smoke (3):**
  1. `FunctionalTestCase-API-AUTH-001` — POST /users/login returns JWT for valid credentials
  2. `FunctionalTestCase-API-CART-001` — POST /carts creates a new cart
  3. `FunctionalTestCase-API-PRD-001` — GET /products returns paginated product list

  **E2E (1):**
  4. `FunctionalTestCase-API-AUTH-011` — E2E Login → get profile → logout

  Total test cases in the file: **9**.

- **Validation Notes:**

  Verified that the selected API smoke and E2E test cases cover the core authentication, product retrieval, cart creation, and user workflow identified in the test plan.

---

## Entry 4 — Create Test Data for Automation Test Cases

- **Prompt:**

  ```
  create testdata required for the testcases in Automation_testcases.xlsx
  ```

- **AI Response Summary:**

  Created test data files for all 9 automation test cases, following the Prism framework layout:

  | File | What it is for |
  |------|----------------|
  | `API/testdata/automation_testcases.json` | Main index — maps each test case ID to its data file and key |
  | `UI/resources/testdata/registration.json` | UI registration data (REG-001, REG-002, REG-009) |
  | `UI/resources/testdata/login.json` | UI login data (LOGIN-001, LOGIN-002) |
  | `API/testdata/cart.json` | Empty cart body for API-CART-001 |
  | `API/testdata/products.json` | Product list expectations for API-PRD-001 |

  `API/testdata/login.json` (already in the project) is reused for API-AUTH-001 and API-AUTH-011.

  Also added `UI_BASE_URL` to `.env.example` for future UI automation.

- **Validation Notes:**

  Verified that all generated JSON files are valid and can be parsed successfully. Confirmed that every automation test case has a corresponding test data entry and that the generated data follows the expected project structure.

  **Important:** For REG-009, the email uses a template (`automation_{{timestamp}}@example.com`). Replace `{{timestamp}}` at runtime (e.g. with `Date.now()`) so each test run uses a unique email.

---

## Output Files

| File | Purpose |
|------|---------|
| `Automation_testcases.xlsx` | Selected test cases for automation (9 total) |
| `API/testdata/automation_testcases.json` | Test case ID → data file mapping |
| `UI/resources/testdata/registration.json` | Registration form and user data |
| `UI/resources/testdata/login.json` | Login form and customer credentials |
| `API/testdata/cart.json` | Cart creation request data |
| `API/testdata/products.json` | Product list expectations |
| `API/testdata/login.json` | API login credentials (existing file, reused) |
| `.env.example` | Added `UI_BASE_URL` for UI tests |

## Current Automation Test Case List

| Layer | Suite Type | Count | Test Case IDs |
|-------|------------|:-----:|---------------|
| UI | Smoke | 4 | REG-001, REG-009, LOGIN-001, LOGIN-002 |
| UI | Regression | 1 | REG-002 |
| API | Smoke | 3 | API-AUTH-001, API-CART-001, API-PRD-001 |
| API | E2E | 1 | API-AUTH-011 |
| **Total** | | **9** | |

## Chat Summary (Simple Language)

This chat built a focused automation test pack from the full manual test suite:

1. **Started with smoke tests** — Picked the first 4 smoke cases from `FunctionalTestCase.csv` (2 registration + 2 login) and saved them in `Automation_testcases.xlsx`.
2. **Added one UI regression** — Added `REG-002` (password requirements on the registration form).
3. **Added API cases** — Added 3 API smoke tests (login, create cart, get products) and 1 API E2E test (login → profile → logout).
4. **Created test data** — Built JSON test data files for all 9 cases, with a main index file (`automation_testcases.json`) that links each test case to the right data.

The automation list represents a focused subset of the manual test cases, selected to provide coverage of the most critical user journeys while keeping the implementation scope small for the assessment.
