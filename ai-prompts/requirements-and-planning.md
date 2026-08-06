# AI Prompts – Requirements and Planning

(Record prompts and responses used for understanding the Toolshop flow, identifying risks, and drafting the test plan.)

---

## Entry 1 — Application Context

- **Prompt:**

  ```
  Create an Application_Context for the web application https://practicesoftwaretesting.com including the application overview, user types, key features, business rules, COMMON WORKFLOWS etc. Read the documentation from https://testsmith-io.github.io/practice-software-testing/#/.
  ```

- **AI Response Summary:**

  Read the official Toolshop docs and created **`Application_Context.md`**. It covers the app overview, user types, default accounts, key features, business rules, common workflows, API info, environments, and testing notes.

---

## Entry 2 — User Stories & Acceptance Criteria

- **Prompt:**

  ```
  In Application_Context include all the acceptance criteria mentioned in https://testsmith-io.github.io/practice-software-testing/#/ under user stories from sprint 1 to sprint 5.
  ```

- **AI Response Summary:**

  Added Sprint 1–5 user stories and acceptance criteria (Given/When/Then) to **`Application_Context.md`** Section 10. Covers modules like Product Overview, Checkout, Login, Admin, Favorites, and more.

---

## Entry 3 — Requirements Document

- **Prompt:**

  ```
  Create a requirement_document based on the application context with requirement id and Acceptance source
  ```

- **AI Response Summary:**

  Created **`requirements_document.md`** and **`requirements_document.csv`** with **353 requirements** — functional acceptance criteria, business rules, and RBAC rules. Each row has an ID, module, user story, acceptance criteria, and source link.

---

## Entry 4 — Requirements Document Excel

- **Prompt:**

  ```
  Create the requirement_document excel
  ```

- **AI Response Summary:**

  Created **`requirements_document.xlsx`** from the CSV with three sheets: Requirements, Summary, and ID Convention.

---

## Entry 5 — QA Risk Analysis

- **Prompt:**

  ```
  Based on the identified features of the Practice Software Testing Toolshop application, perform a QA risk analysis. Categorize risks as High, Medium, and Low. Explain why each feature has that priority.
  ```

- **AI Response Summary:**

  Rated app features as High, Medium, or Low risk based on business impact, security, and data accuracy. High risk areas include login, payments, checkout, and admin. Medium includes catalog and profile. Low includes privacy policy and language settings.

---

## Entry 6 — Save Risk Analysis

- **Prompt:**

  ```
  Turn this into risk_analysis.md
  ```

- **AI Response Summary:**

  Saved the full analysis as **`risk_analysis.md`** with risk levels, reasons, test focus areas, and cross-cutting scenarios.

---

## Entry 7 — Test Plan

- **Prompt:**

  ```
  Based on risk document and @Application_Context.md create a test plan that covers UI automation, API automation with smoke, regression and e2e coverage
  ```

- **AI Response Summary:**

  Created **`test_plan.md`** with UI and API coverage for smoke, regression, and E2E suites. Includes test IDs, suite tags (`@smoke`, `@regression`, `@e2e`, `@api`), CI schedule, and traceability to requirements.

---

## Entry 8 — AI Prompts Documentation

- **Prompt:**

  ```
  Create ai-prompts/requirements-and-planning.md and in that add the prompts used in this chat to create application context, risk_analysis and testplan
  ```

- **AI Response Summary:**

  Created this file to record prompts, responses, and workflow order for the planning artifacts.

---

## Entry 9 — Application Context API Details

- **Prompt:**

  ```
  in Application_Context update the api details from https://api.practicesoftwaretesting.com/api/documentation the endpoints and methods
  ```

- **AI Response Summary:**

  Updated **`Application_Context.md`** Section 6 with **87 API endpoints** from the OpenAPI spec — products, carts, login, invoices, admin, and more. Added base URL, auth notes, and Swagger links.

---

## Entry 10 — Requirements Document API Coverage

- **Prompt:**

  ```
  update the requirement_document with the api coverage required
  ```

- **AI Response Summary:**

  Added **87 API requirements** (`REQ-API-*`) to **`requirements_document.md`** and **`requirements_document.csv`**. Total requirements grew from **353 → 440**. Each API requirement includes method, endpoint, and expected status codes (200, 401, 403, 404, 422).

---

## Entry 11 — Regenerate Requirements Excel

- **Prompt:**

  ```
  generate requirements_document excel
  ```

- **AI Response Summary:**

  Created **`scripts/generateRequirementsExcel.js`** and regenerated **`requirements_document.xlsx`** with **440 rows**. Run again with:

  ```bash
  node scripts/generateRequirementsExcel.js
  ```

---

## Files Created

| File | What it is |
|------|------------|
| `Application_Context.md` | App overview, user stories, workflows, API reference |
| `requirements_document.md` / `.csv` / `.xlsx` | All requirements (440 total) |
| `risk_analysis.md` | Feature risk levels and test focus |
| `test_plan.md` | Smoke, regression, and E2E test strategy |
| `scripts/generateRequirementsExcel.js` | Regenerates requirements Excel |
