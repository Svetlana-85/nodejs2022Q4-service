import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return new UserEntity({
      ...this.usersService.create(createUserDto),
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(id);
    if (user) {
      return new UserEntity({
        ...user,
      });
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    if (
      !updatePasswordDto ||
      !updatePasswordDto.newPassword ||
      !updatePasswordDto.oldPassword
    )
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const user = this.usersService.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Password is invalid', HttpStatus.FORBIDDEN);
    }
    return new UserEntity({
      ...this.usersService.update(id, updatePasswordDto.newPassword),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response): void {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(id);
    if (user) {
      this.usersService.remove(id);
      response.status(204).send();
      return;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
