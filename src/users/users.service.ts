import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersStorage } from './store/user.storage';

@Injectable()
export class UsersService {
  constructor(private storage: UsersStorage) {}

  create(createUserDto: CreateUserDto): UserEntity {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string): UserEntity | undefined {
    return this.storage.findById(id);
  }

  update(id: string, password: string): UserEntity {
    return this.storage.update(id, password);
  }

  remove(id: string): void {
    this.storage.delete(id);
  }
}
