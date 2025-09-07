export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone_number: string;
    blocked: boolean;
    avgTime?: number;
 
  }
  