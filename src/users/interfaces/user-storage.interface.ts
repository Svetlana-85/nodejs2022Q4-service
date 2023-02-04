import { UserEntity } from '../entities/user.entity';

export interface UsersStore {
  create: (user: UserEntity) => UserEntity;
  //update: (user: UserEntity) => UserEntity;
  findById: (id: string) => UserEntity | undefined;
}

export interface CreateUserDto {
  login: string;
  password: string;
}
