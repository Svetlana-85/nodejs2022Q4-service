import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStorage } from './store/album.storage';

@Injectable()
export class AlbumsService {
  constructor(
    private storage: AlbumStorage,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    if (this.favoriteService.findAlbum(id)) {
      this.favoriteService.removeAlbum(id);
    }
    this.storage.delete(id);
  }
}
