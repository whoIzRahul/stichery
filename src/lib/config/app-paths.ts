export const AppPaths = {
  home: '/',

  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    verifyOtp: '/verify-otp',
    resetPassword: '/reset-password',
    verifyEmail: '/verify-email',
  },

  products: {
    list: '/products',
    category: (slug: string) => `/products/category/${slug}`,
    detail: (slug: string) => `/products/${slug}`,
    search: '/products/search',
  },

  cart: '/cart',

  checkout: {
    index: '/checkout',
    confirmation: (orderId: string) => `/checkout/confirmation/${orderId}`,
  },

  orders: {
    list: '/orders',
    detail: (orderId: string) => `/orders/${orderId}`,
  },

  about: '/about',

  contact: '/contact',

  wishlist: '/wishlist',

  giftCards: '/gift-cards',

  blog: {
    list: '/blog',
    detail: (slug: string) => `/blog/${slug}`,
  },

  dashboard: {
    profile: '/dashboard/profile',
    updateProfile: '/dashboard/profile/update',
    addresses: '/dashboard/addresses',
    addAddress: '/dashboard/addresses/add',
    editAddress: (id: string) => `/dashboard/addresses/${id}`,
    notifications: '/dashboard/notifications',
    changePassword: '/dashboard/security',
    orders: '/dashboard/orders',
  },
} as const;
