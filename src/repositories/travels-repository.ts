import {Prisma, Travel} from "@prisma/client";

export interface TravelsRepository {
    createTravel(data:Prisma.TravelUncheckedCreateInput):Promise<Travel>
    getTravelById(id:string):Promise<Travel | null>
    fetchTravels(page:number):Promise<Travel[]>
    updateTravel(data:Travel):Promise<Travel>
    deleteTravel(data:Travel):Promise<void>
    fetchTravelsByStartDate(date:Date):Promise<Travel[] | null>
}