import { User } from 'src/entities/user.entity';

export interface UserRespones {
  message?: string;
  success?: {
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