export interface User {
  name: string;
  email: string;
}

export interface Session {
  accessToken: string;
  accessTokenExpires: number;
  user: User;
}
