import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorage } from './store/artist.storage';

@Injectable()
export class ArtistsService {
  constructor(
    private storage: ArtistsStorage,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  findArtist(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(id, updateArtistDto);
  }

  remove(id: string) {
    if (this.favoriteService.findArtist(id)) {
      this.favoriteService.removeArtist(id);
    }
    this.trackService.changeArtistId(id);
    this.albumService.changeArtistId(id);
    this.storage.delete(id);
  }
}
