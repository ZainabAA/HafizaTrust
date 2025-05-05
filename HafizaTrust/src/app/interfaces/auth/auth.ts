export interface AuthRequest {
    username: string;
    password: string;
    image?: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  