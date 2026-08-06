import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Endpoints } from '../pageobjects/endpoints';

export class ApiHelper {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string,
  ) {}

  private authHeaders(token?: string) {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async get(path: string, token?: string): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${path}`, {
      headers: this.authHeaders(token),
    });
  }

  async post(path: string, data?: object, token?: string): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${path}`, {
      data,
      headers: this.authHeaders(token),
    });
  }

  async put(path: string, data?: object, token?: string): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${path}`, {
      data,
      headers: this.authHeaders(token),
    });
  }

  async delete(path: string, token?: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${path}`, {
      headers: this.authHeaders(token),
    });
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.post(Endpoints.users.login, { email, password });
    const body = await response.json();
    return body.access_token as string;
  }

  async createCart(): Promise<string> {
    const response = await this.post(Endpoints.carts.create, {});
    const body = await response.json();
    return body.id as string;
  }

  async getFirstProductId(): Promise<string> {
    const response = await this.get(Endpoints.products.list);
    const body = await response.json();
    const products = Array.isArray(body) ? body : body.data;
    return products[0].id as string;
  }
}
