import { Injectable } from '@nestjs/common';
import { UsersStore } from '../interfaces/user-storage.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersStorage implements UsersStore {
  private users: UserEntity[] = [];

  create(user: CreateUserDto): UserEntity {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, password: string): UserEntity {
    const user: UserEntity = this.users.find((item) => {
      return item.id === id;
    });
    user.password = password;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  findById(id: string): UserEntity {
    const user: UserEntity = this.users.find((item) => {
      return item.id === id;
    });
    return user;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  delete(id: string): void {
    this.users = this.users.filter((item) => item.id !== id);
  }
}
