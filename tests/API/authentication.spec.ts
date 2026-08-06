import { test, expect, loginData, Endpoints } from './api.fixture';

test.describe('User Authentication API @api', () => {
  test('[REQ-API-USR-004] [P1] [Smoke] POST /users/login returns access token for valid credentials', {
    tag: ['@smoke', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'smoke' },
    ],
  }, async ({ api }) => {
    const response = await api.post(Endpoints.users.login, loginData.customer);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toBe('bearer');
    expect(body.expires_in).toBeGreaterThan(0);
  });

  test('[REQ-API-USR-004] [P1] [Regression] POST /users/login returns 401 for invalid credentials', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const response = await api.post(Endpoints.users.login, loginData.invalidCredentials);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
  });

  test('[REQ-API-USR-004] [P1] [Regression] POST /users/login returns 401 for invalid email format', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const response = await api.post(Endpoints.users.login, { email: 'not-an-email', password: 'test' });
    expect(response.status()).toBe(401);
  });

  test('[REQ-API-USR-008] [P1] [Regression] POST /users/register creates a new user', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-008' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const unique = Date.now();
    const response = await api.post(Endpoints.users.register, {
      first_name: 'Api',
      last_name: 'Tester',
      dob: '1990-05-15',
      street: '123 Test Street',
      postal_code: '12345',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '5551234567',
      email: `api_user_${unique}@example.com`,
      password: `QaTest@${unique}!`,
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.email).toContain('api_user_');
  });

  test('[REQ-API-USR-008] [P1] [Regression] POST /users/register returns 422 for duplicate email', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-008' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const response = await api.post(Endpoints.users.register, {
      first_name: 'Test',
      last_name: 'User',
      dob: '1990-05-15',
      street: '123 Test Street',
      postal_code: '12345',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '5551234567',
      email: loginData.customer.email,
      password: 'QaTest@Unique99!',
    });

    expect(response.status()).toBe(422);
  });

  test('[REQ-API-USR-006] [P1] [Regression] GET /users/me returns current user with valid token', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-006' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const token = await api.login(loginData.customer.email, loginData.customer.password);
    const response = await api.get(Endpoints.users.me, token);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.email).toBe(loginData.customer.email);
    expect(body.first_name).toBeTruthy();
  });

  test('[REQ-API-USR-006] [P1] [Regression] GET /users/me returns 401 without token', {
    tag: ['@regression', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-006' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const response = await api.get(Endpoints.users.me);
    expect(response.status()).toBe(401);
  });

  test('[REQ-API-USR-005] [P2] [Regression] GET /users/logout invalidates session', {
    tag: ['@regression', '@p2', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-005' },
      { type: 'priority', description: 'P2' },
      { type: 'suite', description: 'regression' },
    ],
  }, async ({ api }) => {
    const token = await api.login(loginData.customer.email, loginData.customer.password);
    const response = await api.get(Endpoints.users.logout, token);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('Successfully logged out');
  });

  test('[REQ-API-USR-004] [REQ-API-USR-006] [P1] [E2E] Login then retrieve authenticated user profile', {
    tag: ['@e2e', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-USR-004' },
      { type: 'requirement', description: 'REQ-API-USR-006' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'e2e' },
    ],
  }, async ({ api }) => {
    const loginResponse = await api.post(Endpoints.users.login, loginData.customer);
    expect(loginResponse.status()).toBe(200);
    const { access_token: token } = await loginResponse.json();

    const meResponse = await api.get(Endpoints.users.me, token);
    expect(meResponse.status()).toBe(200);
    const user = await meResponse.json();
    expect(user.email).toBe(loginData.customer.email);
    expect(user.id).toBeTruthy();
  });
});
