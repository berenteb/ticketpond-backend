export type Identifiable = {
  id: string;
};

export type WithoutId<T extends Identifiable> = Omit<T, 'id'>;

export const PhoneRegex = /^\+?\d{10,11}$/;

export const PhoneRegexMessage = 'Phone number must be 10 or 11 digits and can start with a plus sign!';
