import { test, expect, productsData, Endpoints } from './api.fixture';

test.describe('Product Selection API @api', () => {
  test('[REQ-API-PRD-001] [P2] [Smoke] GET /products returns paginated product list', {
    tag: ['@smoke', '@p2', '@api'],
    annotation: [
      { type: 'requirement', description: 'REQ-API-PRD-001' },
      { type: 'priority', description: 'P2' },
      { type: 'suite', description: 'smoke' },
      { type: 'testCase', description: 'FunctionalTestCase-API-PRD-001' },
    ],
  }, async ({ api }) => {
    const { expectedStatus, expectedProductFields } = productsData.listProducts;

    const response = await api.get(Endpoints.products.list);
    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    const product = body.data[0];
    for (const field of expectedProductFields) {
      expect(product).toHaveProperty(field);
    }
  });
});
