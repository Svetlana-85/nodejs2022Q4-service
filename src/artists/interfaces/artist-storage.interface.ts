import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  create: (user: ArtistEntity) => ArtistEntity;
  update(id: string, artistNew: UpdateArtistDto): ArtistEntity;
  findById: (id: string) => ArtistEntity | undefined;
  findAll(): ArtistEntity[];
  delete(id: string): void;
}
