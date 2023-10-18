import { IsNotEmpty,  } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    startDate: Date;
    
    @IsNotEmpty()
    endDate: Date;
    
    @IsNotEmpty()
    placeId: string;
    
    @IsNotEmpty()
    invoiceId: string;
}
