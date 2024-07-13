export interface User {
  name: string;
  email: string;
}

export interface Session {
  accessToken: string;
  user: User;
}
