import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  HttpException,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.favoritesService.findTrack(id);
    if (track) return this.favoritesService.addTrack(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.favoritesService.findAlbum(id);
    if (album) return this.favoritesService.addAlbum(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.favoritesService.findArtist(id);
    if (artist) return this.favoritesService.addArtist(id);
    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.removeArtist(id);
  }
}
