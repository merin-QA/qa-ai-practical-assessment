import { expect } from '@playwright/test';
import { test, loginData } from './ui.fixture';

test.describe('User Login @ui', () => {
  test('[REQ-S5-LOGIN-001] [P2] [Smoke] Login form displays email, password, and Google sign-in', {
    tag: ['@smoke', '@p2', '@ui'],
    annotation: [
      { type: 'requirement', description: 'REQ-S5-LOGIN-001' },
      { type: 'priority', description: 'P2' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-LOGIN-001' },
    ],
  }, async ({ page, loginPage }) => {
    await loginPage.goto(loginData.paths.login);

    const { fields, buttons } = loginData.formDisplayVerification;

    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.googleSignInButton).toBeVisible();

    for (const fieldLabel of fields) {
      await expect(page.getByText(fieldLabel, { exact: false }).first()).toBeVisible();
    }

    for (const buttonLabel of buttons) {
      if (buttonLabel === 'Sign in') {
        await expect(loginPage.submitButton).toBeVisible();
        continue;
      }
      await expect(page.getByRole('button', { name: buttonLabel })).toBeVisible();
    }
  });

  test('[REQ-S5-LOGIN-002] [REQ-BR-017] [P1] [Smoke] Successful login as customer redirects to account', {
    tag: ['@smoke', '@p1', '@ui'],
    annotation: [
      { type: 'requirement', description: 'REQ-S5-LOGIN-002' },
      { type: 'requirement', description: 'REQ-BR-017' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-LOGIN-002' },
    ],
  }, async ({ page, loginPage }) => {
    const { email, password } = loginData.customer;
    const { redirectPath } = loginData.expectedOutcomes.successfulCustomerLogin;

    await loginPage.goto(loginData.paths.login);
    await loginPage.login(email, password);

    await expect(page).toHaveURL(new RegExp(`${redirectPath}$`));
    await expect(page.getByTestId('nav-sign-in')).toBeHidden();
    await expect(page.getByTestId('nav-menu')).toBeVisible();
  });
});
