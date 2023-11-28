import { User } from 'entities/user.entity';

export interface UserRespones {
  message?: string;
  sucssess?: {
    user: User;
  };
  failues?: {
    message: string;
    reason: string;
  };
}

export interface UserList {
  users: User[];
  hasNextPage: boolean;
  lastCursor: string;
}