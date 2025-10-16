const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';

export interface PriceEstimateRequest {
  pickup: string;
  dropoff: string;
  vehicleType: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
  promoCode?: string;
}

export interface PriceEstimateResponse {
  price: number;
  currency: string;
  distance?: number;
  duration?: number;
  breakdown?: {
    basePrice: number;
    distancePrice: number;
    vehicleMultiplier: number;
    promoDiscount?: number;
  };
}

export interface BookingRequest {
  pickup: string;
  dropoff: string;
  vehicleType: string;
  passengers: number;
  date: string;
  time: string;
  tripType: 'one-way' | 'round-trip';
  promoCode?: string;
  estimatedPrice: number;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface BookingResponse {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  bookingReference: string;
  createdAt: string;
}

export class VTCApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async estimatePrice(request: PriceEstimateRequest): Promise<PriceEstimateResponse> {
    const response = await fetch(`${this.baseUrl}/estimate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Price estimation failed: ${error}`);
    }

    return response.json();
  }

  async createBooking(request: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Booking creation failed: ${error}`);
    }

    return response.json();
  }

  async getBooking(bookingId: string): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/booking/${bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch booking: ${error}`);
    }

    return response.json();
  }

  async cancelBooking(bookingId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/booking/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Booking cancellation failed: ${error}`);
    }
  }
}

export const apiClient = new VTCApiClient();