import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStorage } from './store/album.storage';

@Injectable()
export class TracksService {
  constructor(private storage: TrackStorage) {}

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
    return this.storage.delete(id);
  }
}
