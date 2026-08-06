import { expect } from '@playwright/test';
import {
  replaceTimestamp,
  uniqueRegistrationPassword,
} from '../utilities/commonutils';
import { test, registrationData } from './ui.fixture';

test.describe('User Registration @ui', () => {
  test('[REQ-S5-REG-001] [P2] [Smoke] Registration form displays all required fields', {
    tag: ['@smoke', '@p2', '@ui'],
    annotation: [
      { type: 'requirement', description: 'REQ-S5-REG-001' },
      { type: 'priority', description: 'P2' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-REG-001' },
    ],
  }, async ({ registrationPage }) => {
    await registrationPage.goto(registrationData.paths.register);

    const { submitButtonLabel } = registrationData.formDisplayVerification;

    await expect(registrationPage.form).toBeVisible();
    await expect(registrationPage.firstName).toBeVisible();
    await expect(registrationPage.lastName).toBeVisible();
    await expect(registrationPage.dob).toBeVisible();
    await expect(registrationPage.street).toBeVisible();
    await expect(registrationPage.postalCode).toBeVisible();
    await expect(registrationPage.city).toBeVisible();
    await expect(registrationPage.state).toBeVisible();
    await expect(registrationPage.country).toBeVisible();
    await expect(registrationPage.phone).toBeVisible();
    await expect(registrationPage.email).toBeVisible();
    await expect(registrationPage.password).toBeVisible();
    await expect(registrationPage.submitButton).toBeVisible();
    await expect(registrationPage.submitButton).toHaveText(submitButtonLabel);
  });

  test('[REQ-S5-REG-006] [REQ-BR-015] [P1] [Smoke] Successful registration with valid data', {
    tag: ['@smoke', '@p1', '@ui'],
    annotation: [
      { type: 'requirement', description: 'REQ-S5-REG-006' },
      { type: 'requirement', description: 'REQ-BR-015' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-REG-009' },
    ],
  }, async ({ page, registrationPage }) => {
    const user = registrationData.validUser;
    const email = replaceTimestamp(user.emailTemplate);
    const password = uniqueRegistrationPassword();

    await registrationPage.goto(registrationData.paths.register);
    await registrationPage.fillForm({
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      street: user.street,
      postalCode: user.postalCode,
      city: user.city,
      state: user.state,
      country: user.country,
      phone: user.phone,
      email,
      password,
    });
    await registrationPage.submit();

    await expect(page).toHaveURL(new RegExp(`${registrationData.expectedOutcomes.successfulRegistration.redirectPath}$`));
  });

  test('[REQ-S5-REG-002] [REQ-BR-013] [P2] [Regression] Password requirements list shown on password field focus', {
    tag: ['@regression', '@p2', '@ui'],
    annotation: [
      { type: 'requirement', description: 'REQ-S5-REG-002' },
      { type: 'requirement', description: 'REQ-BR-013' },
      { type: 'priority', description: 'P2' },
      { type: 'suite', description: 'regression' },
      { type: 'testCase', description: 'FunctionalTestCase-REG-002' },
    ],
  }, async ({ registrationPage }) => {
    const { expectedRules } = registrationData.passwordRequirements;

    await registrationPage.goto(registrationData.paths.register);
    await registrationPage.focusPassword();

    await expect(registrationPage.passwordRequirements.getByText('Your password must:')).toBeVisible();

    for (const rule of expectedRules) {
      await expect(registrationPage.passwordRequirements).toContainText(rule, { ignoreCase: true });
    }
  });
});
