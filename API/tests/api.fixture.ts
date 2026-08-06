import { test as base, expect } from '@playwright/test';
import { ApiHelper } from '../utilities/apiHelper';
import loginData from '../testdata/login.json';
import cartData from '../testdata/cart.json';
import productsData from '../testdata/products.json';
import { Endpoints } from '../pageobjects/endpoints';

const test = base.extend<{ api: ApiHelper }>({
  api: async ({ request, baseURL }, use) => {
    await use(new ApiHelper(request, baseURL!));
  },
});

export { test, expect, loginData, cartData, productsData, Endpoints };
