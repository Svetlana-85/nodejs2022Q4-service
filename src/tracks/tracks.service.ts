import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './store/track.storage';

@Injectable()
export class TracksService {
  constructor(
    private storage: TrackStorage,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(id, updateTrackDto);
  }

  remove(id: string) {
    if (this.favoriteService.findTrack(id)) {
      this.favoriteService.removeTrack(id);
    }
    this.storage.delete(id);
  }

  changeArtistId(id: string) {
    const tracks = this.storage.findAllArtistsTrack(id);
    tracks.forEach((item) => {
      const track = this.findOne(item.id);
      track.artistId = null;
      this.update(item.id, track);
    });
  }

  changeAlbumId(id: string) {
    const tracks = this.storage.findAllAlbumTrack(id);
    tracks.forEach((item) => {
      const track = this.findOne(item.id);
      track.albumId = null;
      this.update(item.id, track);
    });
  }
}
