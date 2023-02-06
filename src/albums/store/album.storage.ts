import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumStore } from '../interfaces/album-storage.interface';

@Injectable()
export class AlbumStorage implements AlbumStore {
  private albums: AlbumEntity[] = [];

  create(album: CreateAlbumDto): AlbumEntity {
    const newAlbum = {
      ...album,
      id: uuidv4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, albumNew: UpdateAlbumDto): AlbumEntity {
    const album: AlbumEntity = this.albums.find((item) => {
      return item.id === id;
    });
    album.year = albumNew.year;
    album.name = albumNew.name;
    album.artistId = albumNew.artistId;
    return album;
  }

  findById(id: string): AlbumEntity {
    const album = this.albums.find((item) => {
      return item.id === id;
    });
    return album;
  }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  delete(id: string): void {
    this.albums = this.albums.filter((item) => item.id !== id);
  }

  findAllArtistsAlbum(id: string): AlbumEntity[] {
    return this.albums.filter((item) => item.artistId === id);
  }
}
