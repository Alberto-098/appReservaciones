export interface reservation {
    hotelid: string;
    userid: string;
    startDate: string;
    endDate: string;
    image?: string;
    hotelName?: string;
    totalOfNights?: number;
    pricePerNight?: number;
}