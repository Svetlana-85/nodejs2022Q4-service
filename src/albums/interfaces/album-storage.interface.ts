import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  create: (user: AlbumEntity) => AlbumEntity;
  update(id: string, artistNew: UpdateAlbumDto): AlbumEntity;
  findById: (id: string) => AlbumEntity | undefined;
  findAll(): AlbumEntity[];
  delete(id: string): void;
}
