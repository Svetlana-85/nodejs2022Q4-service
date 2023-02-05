import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsStorage } from './store/artist.storage';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage],
})
export class ArtistsModule {}
