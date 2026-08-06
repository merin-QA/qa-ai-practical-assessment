export const Endpoints = {
  users: {
    login: '/users/login',
    register: '/users/register',
    me: '/users/me',
    logout: '/users/logout',
    refresh: '/users/refresh',
  },
  carts: {
    create: '/carts',
    byId: (cartId: string) => `/carts/${cartId}`,
    addItem: (cartId: string) => `/carts/${cartId}`,
    updateQuantity: (cartId: string) => `/carts/${cartId}/product/quantity`,
    removeProduct: (cartId: string, productId: string) => `/carts/${cartId}/product/${productId}`,
  },
  products: {
    list: '/products',
  },
} as const;
