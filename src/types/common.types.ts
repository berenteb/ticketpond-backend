export type Identifiable = {
  id: string;
};

export type WithoutId<T extends Identifiable> = Omit<T, 'id'>;
