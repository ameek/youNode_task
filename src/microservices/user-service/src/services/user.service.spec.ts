import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const user = [
    { id: 1, name: 'aaa' },
    { id: 2, name: 'bbb' },
    { id: 3, name: 'ccc' },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();
    userService = app.get<UserService>(UserService);
    userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
    describe('success', () => {
      it('should return a user by given id', async () => {
        const mockUser:User = {
          id: '1',
          username: 'john_doe',
          password: 'password123',
          email: 'john@example.com',
          contact_number: '123456789',
        };
        jest.spyOn(userRepository, 'findOneOrFail').mockResolvedValue(mockUser);

        const userId = '1';
        const result = await userService.getUserById(userId);

        expect(result.success.user).toEqual(mockUser);
      });
    });

    describe('failures', () => {
      it('should throw NotFoundException when user is not found', async () => {
        jest
          .spyOn(userRepository, 'findOneOrFail')
          .mockRejectedValue(new Error());
        await expect(userService.getUserById('nonexistentID')).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
