export const OrderServiceMock = {
  cancelOrder: jest.fn(),
  createOrder: jest.fn(),
  deleteOrder: jest.fn(),
  failOrder: jest.fn(),
  fulfillOrder: jest.fn(),
  getOrderById: jest.fn(),
  getOrderByIdWithCustomer: jest.fn(),
  getOrders: jest.fn(),
  getOrdersForCustomer: jest.fn(),
  getOrdersForMerchant: jest.fn(),
  isConnectedToMerchant: jest.fn(),
  isOwnProperty: jest.fn(),
};
