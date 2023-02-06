import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  HttpException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as uuidValidate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.favoritesService.findTrack(id);
    if (track) return this.favoritesService.addTrack(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.favoritesService.findAlbum(id);
    if (album) return this.favoritesService.addAlbum(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.favoritesService.findArtist(id);
    if (artist) return this.favoritesService.addArtist(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.removeArtist(id);
  }
}
