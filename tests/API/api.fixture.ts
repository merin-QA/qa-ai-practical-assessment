import { test as base, expect } from '@playwright/test';
import { ApiHelper } from '../../API/utilities/apiHelper';
import loginData from '../../API/testdata/login.json';
import { Endpoints } from '../../API/pageobjects/endpoints';

const test = base.extend<{ api: ApiHelper }>({
  api: async ({ request, baseURL }, use) => {
    await use(new ApiHelper(request, baseURL!));
  },
});

export { test, expect, loginData, Endpoints };
