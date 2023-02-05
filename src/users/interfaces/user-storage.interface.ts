import { UserEntity } from '../entities/user.entity';

export interface UsersStore {
  create: (user: UserEntity) => UserEntity;
  update(id: string, password: string): UserEntity;
  findById: (id: string) => UserEntity | undefined;
  findAll(): UserEntity[];
  delete(id: string): void;
}
