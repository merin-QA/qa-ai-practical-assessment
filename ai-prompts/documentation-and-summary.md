# AI Prompts – Documentation and Summary

Prompts used to consolidate project deliverables, record AI workflow documentation, and produce assessment summaries across all QA phases.

---

## Entry 1 — Create Documentation and Summary Prompt Log

- **Prompt:**

  ```
  create ai-prompts/documentation-and-summary.md
  ```

- **AI Response Summary:**

  Created this file as the fifth prompt log in `ai-prompts/`, alongside:

  | File | Phase |
  |------|-------|
  | `requirements-and-planning.md` | Application context, requirements, risk analysis, test plan |
  | `test-design.md` | Manual test case design (UI and API) |
  | `test-data.md` | Automation test case selection and test data |
  | `automation-and-debugging.md` | Playwright automation, debugging, suite alignment |
  | `documentation-and-summary.md` | Deliverables index and assessment summary (this file) |

  Added a cross-phase **Assessment Summary** below so reviewers can see scope, traceability, and automation status without opening every artifact.

- **Validation Notes:**

  Confirmed the file follows the same entry structure as other `ai-prompts/*.md` files (Prompt → AI Response Summary → Validation Notes). Verified automation counts against `API/testdata/automation_testcases.json` and `Automation_testcases.xlsx` (9 selected cases). API suite verified: **4/4 passing** (`npm run test:api`). UI suite requires `npx playwright install` before local runs when browsers are not cached.

---

## Assessment Summary

### Application Under Test

| Item | Value |
|------|-------|
| **Web app** | [Practice Software Testing Toolshop](https://practicesoftwaretesting.com) |
| **API** | [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com) |
| **Framework** | Playwright Prism (API + UI layers, POM, JSON test data) |
| **Primary context** | `Application_Context.md` |

### Planning & Design Deliverables

| Artifact | Purpose | Scale |
|----------|---------|-------|
| `Application_Context.md` | App overview, workflows, Sprint 1–5 ACs, API reference | Single source of truth |
| `requirements_document.md` / `.csv` / `.xlsx` | Requirement IDs and acceptance sources | 440 requirements |
| `risk_analysis.md` | Feature risk levels and test focus | High / Medium / Low matrix |
| `FunctionalTestCase.md` / `.csv` / `.xlsx` | Manual UI and API test cases | 95 cases |
| `Automation_testcases.xlsx` | Focused subset selected for automation | 9 cases |

### Automation Coverage (Automation_testcases.xlsx)

| Layer | Suite | Count | Test Case IDs | Spec files |
|-------|-------|:-----:|---------------|------------|
| UI | Smoke | 4 | REG-001, REG-009, LOGIN-001, LOGIN-002 | `UI/tests/registration.spec.ts`, `UI/tests/login.spec.ts` |
| UI | Regression | 1 | REG-002 | `UI/tests/registration.spec.ts` |
| API | Smoke | 3 | API-AUTH-001, API-CART-001, API-PRD-001 | `API/tests/authentication.spec.ts`, `cart.spec.ts`, `products.spec.ts` |
| API | E2E | 1 | API-AUTH-011 | `API/tests/authentication.spec.ts` |
| **Total** | | **9** | | **5 spec files** |

### Traceability Chain

```
Official docs / OpenAPI
        ↓
Application_Context.md
        ↓
requirements_document (REQ-* IDs)
        ↓
FunctionalTestCase (manual cases + REQ mapping)
        ↓
Automation_testcases.xlsx (focused subset)
        ↓
automation_testcases.json + layer test data JSON
        ↓
Playwright specs (annotations + @smoke / @regression / @e2e tags)
```

### Framework Layout (Automated Tests)

| Layer | Tests | Page objects / helpers | Test data |
|-------|-------|------------------------|-----------|
| **API** | `API/tests/` | `API/pageobjects/`, `API/utilities/` | `API/testdata/` |
| **UI** | `UI/tests/` | `UI/pageobjects/`, `UI/utilities/` | `UI/resources/testdata/` |

**Config:** `playwright.config.ts` — `api` project (`testDir: ./API/tests`), `ui` project (`testDir: ./UI/tests`, `testIdAttribute: data-test`).

### NPM Scripts

| Command | What it runs |
|---------|----------------|
| `npm run test` | All projects |
| `npm run test:api` | API project (4 tests) |
| `npm run test:api:smoke` | API smoke (`@smoke`) |
| `npm run test:api:e2e` | API E2E (`@e2e`) |
| `npm run test:ui` | UI project (5 tests) |
| `npm run test:ui:smoke` | UI smoke (`@smoke`) |
| `npm run test:ui:regression` | UI regression (`@regression`) |

### Environment Setup

Copy `.env.example` to `.env` and set:

- `API_BASE_URL`, `UI_BASE_URL`
- `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD` (and admin credentials if needed)

Install and run:

```bash
npm install
npx playwright install    # required for UI tests
npm run test:api
npm run test:ui
```

HTML report: `test-results/html-report/index.html` (after a test run).

### Key Debugging Learnings (from automation phase)

| Topic | Finding |
|-------|---------|
| UI locators | Site uses `data-test`, not `data-testid` — set `testIdAttribute: 'data-test'` in config |
| Registration | Country label is `"United States of America (the)"`; password must be unique (leak check rejects static passwords) |
| Login session | `nav-sign-out` is hidden in dropdown; assert URL + hidden `nav-sign-in` + visible `nav-menu` |
| API duplicate email | Live API returns **409** for duplicate register, not **422** as some manual cases assumed |
| Suite scope | API specs trimmed to match `Automation_testcases.xlsx` only (4 tests) |

### Known Configuration Notes

- HTML reporter folder (`test-results/html-report`) overlaps Playwright's `test-results` output folder — non-blocking warning; consider moving report to `playwright-report` in a future cleanup.
- UI tests need Playwright browsers installed (`npx playwright install`).

---

## Output Files (Documentation Phase)

| File | Purpose |
|------|---------|
| `ai-prompts/documentation-and-summary.md` | This file — prompt log and assessment summary |
| `ai-prompts/requirements-and-planning.md` | Planning-phase prompts |
| `ai-prompts/test-design.md` | Test design prompts |
| `ai-prompts/test-data.md` | Test data and automation selection prompts |
| `ai-prompts/automation-and-debugging.md` | Automation and debugging prompts |
| `README.md` | Framework structure and Playwright CLI reference |

---

## Chat Summary (Simple Language)

This file closes the documentation loop for the QA AI practical assessment:

1. **Five prompt logs** — Each major phase (planning, design, test data, automation, documentation) has a dedicated `ai-prompts/*.md` file recording what was asked, what AI produced, and how it was validated.
2. **Focused automation** — From 95 manual cases, 9 were selected in `Automation_testcases.xlsx` and implemented as 9 Playwright tests (5 UI + 4 API counting E2E separately from smoke).
3. **Traceability** — Every automated test maps to requirement IDs (`REQ-*`) and manual test case IDs (`FunctionalTestCase-*`) via titles, tags, and Playwright annotations.
4. **Runnable suite** — API tests pass against the live API; UI tests follow POM in `UI/pageobjects/` and need browser install on a fresh machine.

For phase-specific prompt history and debugging detail, see the other four files in `ai-prompts/`.
