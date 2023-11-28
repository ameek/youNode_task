// user.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'dtos/user.dto';
import { User } from 'entities/user.entity';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { UserList, UserRespones } from 'types/userTypes';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<UserRespones> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return {
        sucssess: {
          user,
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found');
      // return {
      //   failues: {
      //     message: 'User not found',
      //     reason: error.message,
      //   },
      // };
    }
  }

  async getUsers(limit: number, cursor?: string): Promise<UserList> {
    try {
      const queryOptions: FindManyOptions<User> = {
        take: limit,
        order: { id: 'ASC' },
      };

      if (cursor) {
        queryOptions.where = {
          id: MoreThan(cursor),
        };
      }

      const [users, count] =
        await this.userRepository.findAndCount(queryOptions);
      console.log( count);
      const hasNextPage = count > limit;

      return {
        users: users.slice(0, limit),
        hasNextPage,
        lastCursor: users.length > 0 && hasNextPage ? users[users.length - 1].id : '',
      };
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<UserRespones> {
    const { username, email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    try {
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);

      return {
        sucssess: {
          user: savedUser,
        },
      };
    } catch (error) {
      throw new BadRequestException('User registration failed', error.message);
    }
  }

  // Other methods for authentication, profile management, etc.
}
