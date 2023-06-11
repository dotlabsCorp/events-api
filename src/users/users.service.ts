import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto';
import { Repository } from 'typeorm';
import { PostgresError } from 'src/auth/types';
import { ErrorCodes } from 'src/types/error.type';
import { ValidRoles } from 'src/auth/enums';
import { ValidRolesArgs } from './dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    const newUser = this.userRepository.create({
      ...signUpInput,
      // @todo inject a hash realted ops dependency
      password: bcrypt.hashSync(signUpInput.password, 10),
    });

    return this.createUser(newUser);
  }

  private async createUser(user: User): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);
      if (newUser) return newUser;

      throw new Error();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(validRoles: ValidRoles[]): Promise<User[]> {
    return await this.findAllUsers(validRoles);
  }

  private async findAllUsers(validRoles?: ValidRoles[]): Promise<User[]> {
    try {
      if (!validRoles || validRoles.length === 0) {
        return this.userRepository.find({});
      } else {
        return await this.userRepository
          .createQueryBuilder()
          .andWhere('ARRAY[roles] && ARRAY[:...roles]')
          .setParameter('roles', validRoles)
          .getMany();
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.findOneUserByEmail(email);
  }

  private async findOneUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleError(PostgresError.NOT_FOUND);
    }
  }

  async findOneById(id: string): Promise<User> {
    return this.findOneUserById(id);
  }

  private async findOneUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleError(PostgresError.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    signerUser: User,
  ): Promise<User> {
    const user = await this.findOneUserById(id);
    return this.updateUser(user, updateUserInput, signerUser);
  }

  private async updateUser(
    user: User,
    updateUserInput: UpdateUserInput,
    signerUser: User,
  ): Promise<User> {
    const updatedUser = this.setSignerUser(
      {
        ...user,
        ...updateUserInput,
      },
      signerUser,
    );

    try {
      await this.userRepository.update(user.id, updatedUser);
    } catch (error) {
      this.handleError(error);
    }

    return updatedUser;
  }

  async block(id: string, signerUser: User): Promise<boolean> {
    const user = await this.findOneUserById(id);
    return this.blockUser(user, signerUser);
  }

  private async blockUser(
    user: UpdateUserInput,
    signerUser: User,
  ): Promise<boolean> {
    user.isBlocked = true;
    try {
      if (this.update(user.id, user, signerUser)) return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOneUserById(id);
    if (!user) throw new NotFoundException();

    return this.removeUser(user);
  }

  async removeUser(user: User): Promise<boolean> {
    try {
      await this.userRepository.delete(user.id);
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    this.logger.error(error);

    if (error === PostgresError.NOT_FOUND)
      throw new NotFoundException(error.detail);

    if (error.code === PostgresError.DUPLICATE_KEY)
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(error);
  }

  private setSignerUser(updatedUser: User, signerUser: User): User {
    updatedUser.lastUpdatedBy = signerUser;
    return updatedUser;
  }
}
