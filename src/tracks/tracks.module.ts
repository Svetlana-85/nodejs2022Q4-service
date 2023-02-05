import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TrackStorage } from './store/album.storage';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TrackStorage],
})
export class TracksModule {}
