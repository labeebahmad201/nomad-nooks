import { AbstractRepository } from "@app/common/database/abstract.repository";
import { ReservationDocument } from './models/reservation.model'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class ReservationsRepository extends AbstractRepository<ReservationDocument>{

    constructor(@InjectModel(ReservationDocument.name) model: Model<ReservationDocument>){
        super(model);
    }
}