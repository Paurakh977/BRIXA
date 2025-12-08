


// What the Login/Register/Refresh endpoints return
export interface AuthResponse {
  access_token: string;
  // If you decide to return the user object alongside the token later:
  // user?: User; 
}


export interface AuthResponse {
  access_token: string;
  // user?: UserProfile; // Uncomment if you return user with token
}