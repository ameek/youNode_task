// user.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { UserList, UserRespones } from 'src/types/userTypes';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<UserRespones> {
    try {
      console.log('user getUserById ', id);
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return {
        success: {
          user,
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    
    }
  }

    /**
   * Retrieves a list of users with optional pagination.
   *
   * @param {number} limit - The maximum number of users to retrieve.
   * @param {string} [cursor] - The cursor used for pagination.
   * @return {Promise<UserList>} A promise that resolves to an object containing
   * the list of users, a flag indicating if there is a next page, and the last
   * cursor value.
   */
  async getUsers(limit: number, cursor?: string): Promise<UserList> {
    try {
      const MAX_LIMIT = 100;
      if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
      }
      const queryOptions: FindManyOptions<User> = {
        take: limit,
        order: { id: 'ASC' },
      };

      if (cursor && cursor !== '') {
        queryOptions.where = {
          id: MoreThan(cursor),
        };
      }

      const [users, count] =
        await this.userRepository.findAndCount(queryOptions);
      const hasNextPage = count > limit;

      return {
        users: users.slice(0, limit),
        hasNextPage,
        lastCursor:
          users.length > 0 && hasNextPage ? users[users.length - 1].id : '',
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
        success: {
          user: savedUser,
        },
      };
    } catch (error) {
      throw new BadRequestException('User registration failed', error.message);
    }
  }

  async getUserEmailPass(email, password): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, password },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      //find the user by id 
      const user = await this.userRepository.findOneOrFail({ where: { id:id } });
     

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  // Other methods for authentication, profile management, etc.
}
