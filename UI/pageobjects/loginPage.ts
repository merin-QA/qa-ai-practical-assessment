import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly form: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly googleSignInButton: Locator;

  constructor(private readonly page: Page) {
    this.form = page.getByTestId('login-form');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
    this.googleSignInButton = page.getByRole('button', { name: 'Sign in with Google' });
  }

  async goto(path = '/auth/login'): Promise<void> {
    await this.page.goto(path);
    await this.form.waitFor();
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
