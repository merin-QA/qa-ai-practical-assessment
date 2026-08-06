import type { Page, Locator } from '@playwright/test';
import { resolveCountryOptionLabel } from '../utilities/commonutils';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  houseNumber?: string;
}

export class RegistrationPage {
  readonly form: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly passwordRequirements: Locator;

  constructor(private readonly page: Page) {
    this.form = page.getByTestId('register-form');
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.dob = page.getByTestId('dob');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.phone = page.getByTestId('phone');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('register-submit');
    this.passwordRequirements = page.locator('.form-group:has([data-test="password"])');
  }

  async goto(path = '/auth/register'): Promise<void> {
    await this.page.goto(path);
    await this.form.waitFor();
  }

  async fillForm(data: RegistrationFormData): Promise<void> {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);
    await this.country.selectOption({ label: resolveCountryOptionLabel(data.country) });
    await this.postalCode.fill(data.postalCode);
    await this.houseNumber.fill(data.houseNumber ?? '1');
    await this.street.fill(data.street);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.phone.fill(data.phone);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async focusPassword(): Promise<void> {
    await this.password.click();
  }
}
