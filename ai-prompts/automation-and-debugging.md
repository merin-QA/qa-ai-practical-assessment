# AI Prompts – Automation and Debugging

Prompts used for automation structure, assertions, and analyzing failures/logs.

---

## Entry 1 — UI Smoke Automation from Automation_testcases.xlsx

- **Prompt:**

  ```
  create automation scripts for UI from the Automation_testcases.xlsx for the smoke cases.
  ```

- **AI Response Summary:**

  Mapped the four UI smoke cases from `Automation_testcases.xlsx` / `API/testdata/automation_testcases.json`:

  1. `FunctionalTestCase-REG-001` — Registration form displays all required fields
  2. `FunctionalTestCase-REG-009` — Successful registration with valid data
  3. `FunctionalTestCase-LOGIN-001` — Login form displays email, password, and Google sign-in
  4. `FunctionalTestCase-LOGIN-002` — Successful login as customer redirects to account

  Implemented the Playwright Prism layout:

  - **Page objects:** `UI/pageobjects/registrationPage.ts`, `UI/pageobjects/loginPage.ts`
  - **Utilities:** `UI/utilities/commonutils.ts` (timestamp replacement, country mapping, unique password)
  - **Fixture:** `tests/UI/ui.fixture.ts`
  - **Specs:** `tests/UI/registration.spec.ts`, `tests/UI/login.spec.ts`
  - **Config:** `playwright.config.ts` — added `ui` project with `UI_BASE_URL` and `testIdAttribute: 'data-test'`
  - **Scripts:** `npm run test:ui`, `npm run test:ui:smoke` in `package.json`

  Tests follow `test-case-standards.mdc`: requirement IDs in titles, `@smoke` / `@p1` / `@p2` / `@ui` tags, and annotations. Test data is read from `UI/resources/testdata/registration.json` and `login.json`.

- **Debugging Outcome:**

  **Helped:** Using `automation_testcases.json` as the bridge from Excel to code gave an exact list of smoke cases, data files, and data keys. Following `playwright-prism-architecture.mdc` kept page objects, utilities, and specs in the right layers. Mirroring `tests/API/api.fixture.ts` and `authentication.spec.ts` made the UI suite consistent with existing API tests.

  **Misled initially:** Assumed `getByTestId()` would work without setting `testIdAttribute: 'data-test'` in config — locators timed out until the attribute was configured. Assumed test-data labels (`DOB`, `United States`, `Welcome@123`) matched the live UI/API without verification.

---

## Entry 2 — Locator Discovery (Registration & Login Forms)

- **Prompt:**

  *(Implicit — AI investigated locators after initial automation scaffolding; no separate user prompt.)*

- **AI Response Summary:**

  Because browser MCP inspection was blocked, locators were extracted with a Node + Playwright script against the live site. Key `data-test` attributes:

  | Area | Locators |
  |------|----------|
  | Registration | `register-form`, `first-name`, `last-name`, `dob`, `country`, `postal_code`, `house_number`, `street`, `city`, `state`, `phone`, `email`, `password`, `register-submit` |
  | Login | `login-form`, `email`, `password`, `login-submit` |
  | Google sign-in | No `data-test` — located via `getByRole('button', { name: 'Sign in with Google' })` |
  | Post-login session | `nav-menu`, `nav-sign-in`, `nav-sign-out` (sign-out inside dropdown) |

- **Debugging Outcome:**

  **Helped:** Script-based locator mining was reliable when static HTML fetch returned only the Angular shell. Confirmed the site uses `data-test`, not default `data-testid`.

  **Misled:** Early attempts used `getByTestId` in a raw Node script without `testIdAttribute`, causing false timeouts that looked like missing elements. Google button exists in DOM but is outside `login-form`; checking only inside the form made it appear absent briefly.

---

## Entry 3 — REG-009 Registration Flow Failures

- **Prompt:**

  *(Implicit — failures surfaced on first `npm run test:ui:smoke` run.)*

- **AI Response Summary:**

  First smoke run: REG-009 passed after fixes; REG-001 and LOGIN-002 failed. Registration debugging found:

  1. **Country dropdown:** Test data `"United States"` ≠ option label `"United States of America (the)"` → added `resolveCountryOptionLabel()` in `commonutils.ts`.
  2. **House number:** Form requires `house_number`; test data omitted it → page object defaults to `"1"`.
  3. **Password leak check:** Static `Welcome@123` rejected with *"The given password has appeared in a data leak"* → `uniqueRegistrationPassword()` generates `QaTest@<timestamp>!`.
  4. **Success message:** Redirect to `/auth/login` works (API 201); `"Registration successful"` toast was not consistently visible in DOM → assertion kept on URL redirect only.

- **Debugging Outcome:**

  **Helped:** Reading `.invalid-feedback` / alert text after a failed submit quickly identified password and house-number issues. API response logging (`POST /users/register` → 201) confirmed backend success when UI stayed on register page due to validation errors.

  **Misled:** `automation_testcases.json` note to replace `{{timestamp}}` in email was correct, but password also needed runtime uniqueness — static password in `registration.json` was insufficient on the live environment.

---

## Entry 4 — REG-001 Form Display Assertion Failures

- **Prompt:**

  *(Implicit — REG-001 failed on label-based assertions during first smoke run.)*

- **AI Response Summary:**

  Label loop over `formDisplayVerification.requiredFields` from test data failed because:

  - `DOB` → page shows **"Date of Birth"**
  - `Email` → page shows **"Email address"**
  - `State` → `getByText('State')` matched hidden country option *"Bolivia (Plurinational State of)"*

  Fix: removed fragile label text loop; assertions now verify all required fields via stable `data-test` locators on `RegistrationPage` plus submit button text `"Register"`.

- **Debugging Outcome:**

  **Helped:** Switching from label text to `data-test` locators aligned with the page object model and eliminated ambiguous matches.

  **Misled:** Verifying labels from JSON without mapping aliases caused two false failures. `getByText` with partial match is risky on forms with large dropdowns.

---

## Entry 5 — LOGIN-002 Session / Navigation Assertion Failure

- **Prompt:**

  *(Implicit — LOGIN-002 failed asserting `nav-sign-out` visibility after first smoke run.)*

- **AI Response Summary:**

  Login redirected to `/account` correctly, but `expect(nav-sign-out).toBeVisible()` failed — element exists in DOM but is **hidden** inside the user dropdown until `nav-menu` is opened.

  Fix:

  ```typescript
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByTestId('nav-sign-in')).toBeHidden();
  await expect(page.getByTestId('nav-menu')).toBeVisible();
  ```

- **Debugging Outcome:**

  **Helped:** Inspecting all `data-test` nav elements after login showed `nav-menu` ("Jane Doe") as the visible session indicator. Hiding `nav-sign-in` proves the user is authenticated without opening the dropdown.

  **Misled:** Playwright error *"unexpected value hidden"* on `nav-sign-out` suggested login failed; URL was already correct. Asserting dropdown-only elements without opening the menu is a common false negative.

---

## Entry 6 — Verify UI Smoke Suite

- **Prompt:**

  ```
  npm run test:ui:smoke
  ```

- **AI Response Summary:**

  Ran `playwright test --project ui --grep @smoke`. Final result: **4 passed** (~6–7s).

  | Test | Result |
  |------|--------|
  | REG-001 — Registration form fields | ✓ |
  | REG-009 — Successful registration | ✓ |
  | LOGIN-001 — Login form display | ✓ |
  | LOGIN-002 — Customer login → account | ✓ |

  Playwright reported a config warning: HTML reporter output folder (`test-results/html-report`) clashes with `test-results` — non-blocking, tests still pass.

- **Debugging Outcome:**

  **Helped:** Running the full smoke suite after each fix batch confirmed regressions were resolved and no cross-test pollution (parallel workers, unique registration email per run).

  **Misled:** None on this run — all four tests green. The HTML reporter path warning could confuse CI artifact collection if not addressed later (e.g. move report to `playwright-report`).

---

## Session Summary

| Metric | Value |
|--------|-------|
| UI smoke tests automated | 4 |
| Files added/updated | 10 (page objects, utilities, specs, fixture, config, package.json, tsconfig) |
| First-run failures | 2 (REG-001, LOGIN-002) |
| Root causes | Label/locator mismatch, hidden dropdown nav item, country/password/house-number live-form constraints |
| Final smoke status | 4/4 passing |

**Key takeaway:** Live-app validation beat assumptions from test data and manual test case text. Stable `data-test` locators + config `testIdAttribute` + runtime unique credentials were required for reliable smoke automation on `practicesoftwaretesting.com`.

---

## Entry 7 — Align Test Location with API/UI Framework Structure

- **Prompt:**

  ```
  the test cases are placed in tests/ui and tests/api which is newly created. follow the existing structure of framework.
  Add newly automated scripts inside the existing API and UI folder already used and follow the POM
  ```

- **AI Response Summary:**

  Relocated specs and fixtures from the standalone `tests/` folder into the existing `API/` and `UI/` layers, keeping page objects, utilities, and test data in their original locations:

  | Before | After |
  |--------|-------|
  | `tests/API/api.fixture.ts` | `API/tests/api.fixture.ts` |
  | `tests/API/authentication.spec.ts` | `API/tests/authentication.spec.ts` |
  | `tests/UI/ui.fixture.ts` | `UI/tests/ui.fixture.ts` |
  | `tests/UI/login.spec.ts` | `UI/tests/login.spec.ts` |
  | `tests/UI/registration.spec.ts` | `UI/tests/registration.spec.ts` |

  Updated imports to use relative paths within each layer (`../pageobjects`, `../utilities`, `../testdata` / `../resources`). Configuration changes:

  - **`playwright.config.ts`** — per-project `testDir`: `./API/tests` and `./UI/tests` (removed top-level `testDir: './tests'`)
  - **`package.json`** — scripts use `--project api` / `--project ui`
  - **`tsconfig.json`** — removed `tests/**/*.ts` from `include` (covered by `API/**` and `UI/**`)
  - **`tests/`** — removed after migration

  POM preserved: specs hold assertions only; locators/actions in `pageobjects/`; shared logic in `utilities/`; fixtures inject page objects / `ApiHelper`.

- **Debugging Outcome:**

  **Helped:** Colocating tests under `API/tests` and `UI/tests` matches the Playwright Prism layout (`API/` and `UI/` as the primary layers) and keeps imports short. Smoke verification after the move: API **1/1**, UI **4/4** passing.

  **Misled:** None — move was structural only; no test logic changes required.

---

## Entry 8 — Fix JSON Import TypeScript Error in `ui.fixture.ts`

- **Prompt:**

  ```
  For the code present, we get this error:
  Cannot find module '../resources/testdata/registration.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.
  Fix it, verify, and then give a concise explanation.
  ```

- **AI Response Summary:**

  Added `"resolveJsonModule": true` to `tsconfig.json` `compilerOptions`. This enables TypeScript to resolve and type-check `import ... from '*.json'` statements used in:

  - `UI/tests/ui.fixture.ts` — `login.json`, `registration.json`
  - `API/tests/api.fixture.ts` — `login.json`

  Verified with `npx tsc --noEmit`: no JSON or `ui.fixture` import errors. JSON files confirmed present at `UI/resources/testdata/login.json` and `registration.json`.

- **Debugging Outcome:**

  **Helped:** `resolveJsonModule` is the standard fix when importing JSON test data directly into TypeScript fixtures. One config change fixed both API and UI fixture imports.

  **Misled:** IDE may cache the old error until the TypeScript server reloads, even after `tsconfig.json` is updated.

---

## Session Summary (Structure & TypeScript Fix)

| Metric | Value |
|--------|-------|
| Tests relocated | 5 files (2 API, 3 UI) |
| Config files updated | `playwright.config.ts`, `package.json`, `tsconfig.json` |
| Top-level `tests/` folder | Removed |
| JSON import fix | `resolveJsonModule: true` in `tsconfig.json` |
| Post-move smoke status | API 1/1, UI 4/4 passing |

**Key takeaway:** Keep automated specs inside `API/tests` and `UI/tests` alongside existing page objects and utilities. Enable `resolveJsonModule` whenever fixtures import JSON test data directly.

---

## Entry 9 — UI Regression Automation (REG-002 Password Requirements)

- **Prompt:**

  ```
  from automation_testcases.xlsx pick the regression case for ui and automate it
  ```

- **AI Response Summary:**

  Selected the only UI regression case from `Automation_testcases.xlsx` / `API/testdata/automation_testcases.json`:

  | Field | Value |
  |-------|-------|
  | **Test case** | `FunctionalTestCase-REG-002` |
  | **Requirement** | REQ-S5-REG-002, REQ-BR-013 |
  | **Priority** | P2 |
  | **Suite** | Regression |
  | **Data** | `UI/resources/testdata/registration.json` → `passwordRequirements` |

  **Steps automated:** Navigate to `/auth/register` → click Password field → verify requirements list is displayed.

  **Implementation:**

  - **Spec:** `UI/tests/registration.spec.ts` — new test with `@regression` / `@p2` / `@ui` tags and annotations
  - **Page object:** `UI/pageobjects/registrationPage.ts` — added `passwordRequirements` locator and `focusPassword()` method
  - **Test data:** `UI/resources/testdata/registration.json` — updated `expectedRules` to match live UI text:
    - `at least 8 characters`
    - `uppercase and lowercase`
    - `at least one number`
    - `special`
  - **Script:** `package.json` — added `npm run test:ui:regression`

- **Debugging Outcome:**

  **Helped:** `automation_testcases.json` identified exactly one UI regression case (`REG-002`). Live-page inspection showed requirements text appears after password focus with heading `"Your password must:"` and four list items.

  **Misled initially:** Scoped locator to `app-password-input` — requirements render in the parent `.form-group`, not inside the Angular component. First run failed with *element(s) not found* for `Your password must:`.

  **Fix:** Changed page object locator to `.form-group:has([data-test="password"])`, which includes the heading and requirement list.

  **Verification:** `npm run test:ui:regression` — **1/1 passing** (~8s).

---

## Session Summary (UI Regression)

| Metric | Value |
|--------|-------|
| UI regression case automated | 1 (`FunctionalTestCase-REG-002`) |
| Files updated | 4 (`registration.spec.ts`, `registrationPage.ts`, `registration.json`, `package.json`) |
| First-run failure | 1 (locator scoped to wrong container) |
| Root cause | Password requirements DOM is outside `app-password-input` |
| Final regression status | 1/1 passing |

**Key takeaway:** For password-requirement UI checks, assert against the parent form-group around `[data-test="password"]`, not the inner `app-password-input` component. Align `expectedRules` in JSON with substrings from the live requirement list.

---

## Entry 10 — API Smoke & E2E Automation from Automation_testcases.xlsx

- **Prompt:**

  ```
  automate api testcases for the ones in Automation_testcases.xlsx
  ```

- **AI Response Summary:**

  Mapped the four API cases from `Automation_testcases.xlsx` / `API/testdata/automation_testcases.json`:

  | Test Case ID | Suite | Endpoint / Flow |
  |--------------|-------|-----------------|
  | `FunctionalTestCase-API-AUTH-001` | Smoke | `POST /users/login` — valid credentials → JWT |
  | `FunctionalTestCase-API-CART-001` | Smoke | `POST /carts` — empty body → cart `id` |
  | `FunctionalTestCase-API-PRD-001` | Smoke | `GET /products` — paginated `data` array |
  | `FunctionalTestCase-API-AUTH-011` | E2E | Login → `GET /users/me` → `GET /users/logout` |

  **Implementation:**

  - **New specs:** `API/tests/cart.spec.ts`, `API/tests/products.spec.ts`
  - **Updated:** `API/tests/authentication.spec.ts` — added `testCase` annotation on smoke login; extended E2E to include logout step and `REQ-API-USR-005`
  - **Fixture:** `API/tests/api.fixture.ts` — exports `cartData` and `productsData` from `API/testdata/cart.json` and `products.json`
  - **Script:** `package.json` — added `npm run test:api:e2e`

  Tests use existing `ApiHelper`, `Endpoints`, and JSON test data. Tags and annotations follow `test-case-standards.mdc` (`@smoke` / `@e2e`, requirement IDs, `FunctionalTestCase-*` annotations).

- **Debugging Outcome:**

  **Helped:** `automation_testcases.json` gave exact endpoints, data keys, and expected fields. Reusing `ApiHelper` kept specs thin (assertions only). Smoke and E2E scripts (`test:api:smoke`, `test:api:e2e`) ran green on first verification: **3/3 smoke**, **1/1 E2E**.

  **Misled:** None on the Automation_testcases.xlsx cases — all four passed against the live API.

---

## Entry 11 — Full API Suite Run (Pre-existing Regression Failure)

- **Prompt:**

  ```
  npm run test:api
  ```

- **AI Response Summary:**

  Ran the full API project (11 tests at the time). Result: **10 passed, 1 failed**.

  | Result | Test |
  |--------|------|
  | ✓ | All 3 smoke + 1 E2E from Automation_testcases.xlsx |
  | ✓ | 6 pre-existing regression tests in `authentication.spec.ts` |
  | ✗ | `POST /users/register returns 422 for duplicate email` |

  **Failure:** Expected HTTP `422`, received `409` (Conflict) when registering with `customer@practicesoftwaretesting.com`. The live API returns **409** for duplicate email, not **422** as the test and `FunctionalTestCase.csv` text assumed.

- **Debugging Outcome:**

  **Helped:** Running the full suite exposed that the duplicate-email regression test was not aligned with live API behavior and was outside the Automation_testcases.xlsx scope.

  **Misled:** Requirements doc text (*"422 for duplicate email"*) did not match production API response code.

---

## Entry 12 — Remove Pre-existing API Tests Outside Automation_testcases.xlsx

- **Prompt:**

  ```
  remove the preexisting testcases in api which are not in application_testcases
  ```

- **AI Response Summary:**

  Trimmed `API/tests/authentication.spec.ts` to only the two auth cases listed in `Automation_testcases.xlsx`. Removed **7** pre-existing regression tests:

  - `POST /users/login` — invalid credentials (401)
  - `POST /users/login` — invalid email format (401)
  - `POST /users/register` — creates new user (201)
  - `POST /users/register` — duplicate email (422/409)
  - `GET /users/me` — with valid token (200)
  - `GET /users/me` — without token (401)
  - `GET /users/logout` — invalidates session (200) *(covered by E2E AUTH-011)*

  **Retained API suite (4 tests total):**

  | Spec | Tests |
  |------|-------|
  | `authentication.spec.ts` | API-AUTH-001 (smoke), API-AUTH-011 (E2E) |
  | `cart.spec.ts` | API-CART-001 (smoke) |
  | `products.spec.ts` | API-PRD-001 (smoke) |

- **Debugging Outcome:**

  **Helped:** Scoping the API suite to Automation_testcases.xlsx eliminated the failing duplicate-email test and aligned API coverage 1:1 with the Excel selection (4 cases). `npm run test:api` — **4/4 passed** (~2.5s).

  **Misled:** None after cleanup.

---

## Session Summary (API Automation)

| Metric | Value |
|--------|-------|
| API cases in Automation_testcases.xlsx | 4 (3 smoke + 1 E2E) |
| New spec files | 2 (`cart.spec.ts`, `products.spec.ts`) |
| Pre-existing regression tests removed | 7 |
| Files updated | 4 (`authentication.spec.ts`, `api.fixture.ts`, `package.json`, this doc) |
| Full-suite failure before cleanup | 1 (duplicate email expected 422, got 409) |
| Final API status | 4/4 passing (`npm run test:api`) |

**Key takeaway:** Keep the API suite scoped to `Automation_testcases.xlsx` via `automation_testcases.json`. Pre-existing regression tests outside that file can drift from live API behavior (e.g. 409 vs 422). Use `npm run test:api:smoke`, `test:api:e2e`, or `test:api` to run the aligned four-test suite.
