import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private reservationRepository: ReservationsRepository){}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      createdAt: new Date(),
      userId: '1',  // these are temporary placeholder for now
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate({_id}, updateReservationDto);
  }

  remove(_id: string) {
    return this.reservationRepository.findOneDelete({_id});
  }
}
