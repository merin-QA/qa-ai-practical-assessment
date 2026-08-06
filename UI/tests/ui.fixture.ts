import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginPage';
import { RegistrationPage } from '../pageobjects/registrationPage';
import loginData from '../resources/testdata/login.json';
import registrationData from '../resources/testdata/registration.json';

const test = base.extend<{
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { test, loginData, registrationData };
