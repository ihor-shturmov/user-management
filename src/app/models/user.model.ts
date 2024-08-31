export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface UserDTO extends User {
  password: string;
}
