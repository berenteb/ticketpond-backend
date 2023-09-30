import { OrderDto } from '../dtos/order.dto';

export abstract class PaymentServiceInterface {
  abstract payForOrder(order: OrderDto): Promise<void>;
  abstract paymentSucceed(): Promise<void>;
  abstract paymentFail(): Promise<void>;
}
