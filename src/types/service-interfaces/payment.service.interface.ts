export abstract class PaymentServiceInterface {
  abstract payForOrder(orderId: string): Promise<void>;
  abstract paymentSucceed(): Promise<void>;
  abstract paymentFail(): Promise<void>;
}
