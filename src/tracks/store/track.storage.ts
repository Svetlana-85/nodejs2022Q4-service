import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackStore } from '../interfaces/track-storage.interface';

@Injectable()
export class TrackStorage implements TrackStore {
  private tracks: TrackEntity[] = [];

  create(track: CreateTrackDto): TrackEntity {
    const newTrack = {
      ...track,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, trackNew: UpdateTrackDto): TrackEntity {
    const track = this.tracks.find((item) => {
      return item.id === id;
    });
    track.albumId = trackNew.albumId;
    track.name = trackNew.name;
    track.artistId = trackNew.artistId;
    return track;
  }

  findById(id: string): TrackEntity {
    const track = this.tracks.find((item) => {
      return item.id === id;
    });
    return track;
  }

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((item) => item.id !== id);
  }
}
