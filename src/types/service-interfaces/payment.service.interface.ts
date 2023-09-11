import { OrderView } from '../entities/order.entity';

export abstract class PaymentServiceInterface {
  abstract payForOrder(order: OrderView): Promise<void>;
  abstract paymentSucceed(): Promise<void>;
  abstract paymentFail(): Promise<void>;
}
