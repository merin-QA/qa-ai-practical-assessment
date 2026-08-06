# QA AI Practical Assessment — Playwright Test Automation

Automated API and UI test suite for [Practice Software Testing](https://practicesoftwaretesting.com), built with **Playwright** and **TypeScript**.

| Item | Details |
|------|---------|
| **Framework** | [Playwright Test](https://playwright.dev/) (`@playwright/test` v1.51+) |
| **Language** | TypeScript |
| **Application (UI)** | https://practicesoftwaretesting.com |
| **Application (API)** | https://api.practicesoftwaretesting.com |
| **API Docs** | https://api.practicesoftwaretesting.com/api/documentation |

---

## Prerequisites

1. [Node.js](https://nodejs.org/) (LTS recommended)
2. npm (bundled with Node.js)
3. A code editor — [VS Code](https://code.visualstudio.com/) with the [Playwright Test extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) is recommended

---

## Installation

```bash
# 1. Clone the repository and switch to the assessment branch
git clone https://github.com/merin-QA/qa-ai-practical-assessment.git
cd qa-ai-practical-assessment
git checkout assesment

# 2. Install dependencies
npm install

# 3. Install Playwright browsers (first-time setup)
npx playwright install
```

Alternatively, clone the assessment branch directly:

```bash
git clone -b assesment https://github.com/merin-QA/qa-ai-practical-assessment.git
cd qa-ai-practical-assessment
```

---

## Environment Configuration

Copy the example environment file and update values if needed:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `API_BASE_URL` | Base URL for API tests | `https://api.practicesoftwaretesting.com` |
| `UI_BASE_URL` | Base URL for UI tests | `https://practicesoftwaretesting.com` |
| `CUSTOMER_EMAIL` | Default customer account email | See `Application_Context.md` |
| `CUSTOMER_PASSWORD` | Default customer account password | See `Application_Context.md` |
| `ADMIN_EMAIL` | Default admin account email | See `Application_Context.md` |
| `ADMIN_PASSWORD` | Default admin account password | See `Application_Context.md` |

> **Note:** `.env` is loaded automatically via `dotenv` in `playwright.config.ts`. Do not commit `.env` to version control. Credential defaults are also available in `API/testdata/login.json` and `UI/resources/testdata/login.json`.

---

## Project Structure

```
qa-ai-practical-assessment/
├── API/
│   ├── pageobjects/          # API endpoints
│   ├── testdata/             # API test data (JSON)
│   ├── tests/                # API test specs (*.spec.ts)
│   └── utilities/            # API helpers (apiHelper, etc.)
├── UI/
│   ├── pageobjects/          # Page Object Model classes
│   ├── resources/testdata/   # UI test data (JSON)
│   ├── tests/                # UI test specs (*.spec.ts)
│   └── utilities/            # Shared UI utilities
├── test-results/             # Test execution artifacts (screenshots, traces on failure)
├── playwright-report/        # HTML test report
├── playwright.config.ts      # Playwright projects, reporters, timeouts
├── package.json              # npm scripts
├── .env.example              # Environment variable template
├── FunctionalTestCase.md     # Manual functional test cases (Markdown)
├── FunctionalTestCase.xlsx   # Manual functional test cases (Excel)
└── Application_Context.md    # Application overview & test accounts
```

---

## Test Data

### Automation test data (JSON)

| Location | Purpose |
|----------|---------|
| `API/testdata/login.json` | API login credentials (customer, admin, invalid) |
| `API/testdata/cart.json` | Cart API request payloads and expected responses |
| `API/testdata/products.json` | Product API test data |
| `API/testdata/automation_testcases.json` | Automation test case metadata |
| `UI/resources/testdata/login.json` | UI login paths, credentials, and expected outcomes |
| `UI/resources/testdata/registration.json` | UI registration form data and validation cases |

### Manual test cases

| Location | Format | Purpose |
|----------|--------|---------|
| `FunctionalTestCase.md` | Markdown | Full manual test case catalog with traceability |
| `FunctionalTestCase.csv` | CSV | Spreadsheet-friendly export of manual test cases |
| `FunctionalTestCase.xlsx` | Excel | Excel version of manual test cases |
| `Automation_testcases.xlsx` | Excel | Automation test case mapping |
| `Application_Context.md` | Markdown | Application features, roles, and default test accounts |
| `requirements_document.md` | Markdown | Requirements traceability reference |
| `risk_analysis.md` | Markdown | Risk-based testing reference |

### Default test accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | `CUSTOMER_EMAIL` | `CUSTOMER_PASSWORD` |
| Admin | `ADMIN_EMAIL` | `ADMIN_PASSWORD` |

Defaults are in `.env.example`; see `Application_Context.md` for the full account list.

---

## Running Tests

Tests are organized into two Playwright **projects** (`api` and `ui`) and tagged by suite:

| Tag | Description |
|-----|-------------|
| `@smoke` | Critical path / high-value checks |
| `@regression` | Broader coverage beyond smoke |
| `@e2e` | End-to-end API flows |
| `@api` / `@ui` | Layer-specific tests |
| `@p1` / `@p2` | Priority markers |

### API and UI tests (both)

```bash

npx playwright test                         # All API + UI tests
npx playwright test --project api --project ui   # Explicit: run both projects
npx playwright test --grep @smoke             # Smoke tests across API and UI
npx playwright test --grep @regression        # Regression tests across API and UI
```

### API tests

```bash
npm run test:api                  # All API tests
npm run test:api:smoke            # API smoke (@smoke)
npm run test:api:regression       # API regression (@regression)
npm run test:api:e2e              # API end-to-end (@e2e)
```

### UI tests

```bash
npm run test:ui                   # All UI tests
npm run test:ui:smoke             # UI smoke (@smoke)
npm run test:ui:regression        # UI regression (@regression)
```

### Run a single spec file

```bash
npx playwright test API/tests/authentication.spec.ts
npx playwright test UI/tests/login.spec.ts
```

### Run a single test by name

```bash
npx playwright test -g "Successful registration with valid data"
```

### Additional Playwright options

```bash
npx playwright test --ui          # Interactive UI mode
npx playwright test --headed      # Run with visible browser (UI tests)
npx playwright test --debug       # Step-through debugger
npx playwright test --project ui  # Run only the UI project
npx playwright codegen <URL>      # Record actions and generate code
```

---

## Test Reports

After each run, Playwright generates reports in two locations:

| Output | Location | How to view |
|--------|----------|-------------|
| **HTML Report** | `playwright-report/` | `npx playwright show-report` |
| **Console output** | Terminal (`list` reporter) | Shown during test execution |
| **Failure artifacts** | `test-results/<test-name>/` | Screenshots, traces, and error context on failure |

The HTML report is the primary report. Open it after a run with:

```bash
npx playwright show-report
```

---

## Manual Testing

To execute manual test cases:

1. Open `FunctionalTestCase.md` (or `.xlsx` / `.csv`) for step-by-step test cases.
2. Use `Application_Context.md` for application URLs, user roles, and default credentials.
3. Reference `requirements_document.md` and `risk_analysis.md` for traceability and risk context.
4. Record results in your preferred test management tool or directly in the Excel/CSV files.

---

## Configuration Reference

Key settings in `playwright.config.ts`:

- **API project** — `testDir: ./API/tests`, uses `API_BASE_URL`
- **UI project** — `testDir: ./UI/tests`, uses `UI_BASE_URL`, `data-test` attribute for locators
- **Parallel execution** — enabled (`fullyParallel: true`)
- **CI retries** — 1 retry when `CI` env var is set
- **Reporter** — `list` (console) + `html` (output: `playwright-report`)

---

## Troubleshooting

| Issue | Suggested fix |
|-------|---------------|
| Browsers not found | Run `npx playwright install` |
| Connection / timeout errors | Verify network access to the application URLs |
| Auth failures | Confirm `.env` credentials match `Application_Context.md` |
| Stale report | Delete `test-results/` and re-run tests |
