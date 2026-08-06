import { test, expect, cartData, Endpoints } from './api.fixture';

test.describe('Cart Creation API @api', () => {
  test('[REQ-API-CART-001] [P1] [Smoke] POST /carts creates a new cart', {
    tag: ['@smoke', '@p1', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-CART-001' },
      { type: 'priority', description: 'P1' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-API-CART-001' },
    ],
  }, async ({ api }) => {
    const { requestBody, expectedStatus, expectedResponseFields } = cartData.createCart;

    const response = await api.post(Endpoints.carts.create, requestBody);
    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();
    for (const field of expectedResponseFields) {
      expect(body).toHaveProperty(field);
      expect(body[field]).toBeTruthy();
    }
  });
});
