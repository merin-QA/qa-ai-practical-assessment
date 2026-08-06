import { test, expect, loginData, Endpoints } from './api.fixture';

test.describe('User Authentication API @api', () => {
  test('[REQ-API-USR-004] [P1] [Smoke] POST /users/login returns access token for valid credentials', {
    tag: ['@smoke', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-API-AUTH-001' },
    ],
  }, async ({ api }) => {
    const response = await api.post(Endpoints.users.login, loginData.customer);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toBe('bearer');
    expect(body.expires_in).toBeGreaterThan(0);
  });

  test('[REQ-API-USR-004] [REQ-API-USR-006] [REQ-API-USR-005] [P1] [E2E] Login then retrieve profile and logout', {
    tag: ['@e2e', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'requirement', description: 'REQ-API-USR-006' },
      { type: 'requirement', description: 'REQ-API-USR-005' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'e2e' },
      { type: 'testCase', description: 'FunctionalTestCase-API-AUTH-011' },
    ],
  }, async ({ api }) => {
    const loginResponse = await api.post(Endpoints.users.login, loginData.customer);
    expect(loginResponse.status()).toBe(200);
    const { access_token: token } = await loginResponse.json();
    expect(token).toBeTruthy();

    const meResponse = await api.get(Endpoints.users.me, token);
    expect(meResponse.status()).toBe(200);
    const user = await meResponse.json();
    expect(user.email).toBe(loginData.customer.email);
    expect(user.id).toBeTruthy();

    const logoutResponse = await api.get(Endpoints.users.logout, token);
    expect(logoutResponse.status()).toBe(200);
    const logoutBody = await logoutResponse.json();
    expect(logoutBody.message).toBe('Successfully logged out');
  });
});
