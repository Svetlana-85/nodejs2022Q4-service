import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as uuidValidate } from 'uuid';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumsService.findOne(id);
    if (album) return album;
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    ) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumsService.findOne(id);
    if (album) return this.albumsService.update(id, updateAlbumDto);
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.albumsService.findOne(id)) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albumsService.remove(id);
  }
}
