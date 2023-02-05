import { Injectable } from '@nestjs/common';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistStore } from '../interfaces/artist-storage.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsStorage implements ArtistStore {
  private artists: ArtistEntity[] = [];

  create(artist: CreateArtistDto): ArtistEntity {
    const newArtist = {
      ...artist,
      id: uuidv4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, artistNew: UpdateArtistDto): ArtistEntity {
    const artist: ArtistEntity = this.artists.find((item) => {
      return item.id === id;
    });
    artist.grammy = artistNew.grammy;
    artist.name = artistNew.name;
    return artist;
  }

  findById(id: string): ArtistEntity {
    const artist: ArtistEntity = this.artists.find((item) => {
      return item.id === id;
    });
    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  delete(id: string): void {
    this.artists = this.artists.filter((item) => item.id !== id);
  }
}
