export type Vehicle = 'Comfort' | 'Sedan' | 'Van';

export type TransferType = 'one-way' | 'round-trip' | 'hourly';

export interface Booking {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  transferType: TransferType;
  passengers: number;
  vehicle: Vehicle;
  price: number;
  date: string;
  returnDate?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Route {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}