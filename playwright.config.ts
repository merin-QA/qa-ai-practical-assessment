import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'test-results/html-report' }]],
  projects: [
    {
      name: 'api',
      testDir: './API/tests',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com',
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
    {
      name: 'ui',
      testDir: './UI/tests',
      use: {
        baseURL: process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com',
        testIdAttribute: 'data-test',
      },
    },
  ],
});
