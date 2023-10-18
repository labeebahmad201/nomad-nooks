import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, collection: 'reservations' })
export class ReservationDocument extends AbstractDocument {
    @Prop()
    startDate: Date;
    
    @Prop()
    endDate: Date;
    
    @Prop()
    createdAt: Date;
    
    @Prop()
    placeId: string;
    
    @Prop()
    userId: string;

    @Prop()
    invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);