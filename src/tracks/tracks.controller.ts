import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as uuidValidate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracksService.findOne(id);
    if (track) return track;
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    if (
      typeof updateTrackDto.name !== 'string' ||
      typeof updateTrackDto.duration !== 'number'
    ) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracksService.findOne(id);
    if (track) return this.tracksService.update(id, updateTrackDto);
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response) {
    if (!uuidValidate(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracksService.findOne(id);
    if (track) {
      this.tracksService.remove(id);
      response.status(204).send();
      return;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }
}
