import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  create: (user: TrackEntity) => TrackEntity;
  update(id: string, artistNew: UpdateTrackDto): TrackEntity;
  findById: (id: string) => TrackEntity | undefined;
  findAll(): TrackEntity[];
  delete(id: string): void;
}
