import {Prisma, Travel} from "@prisma/client";

export interface TravelsRepository {
    createTravel(data:Prisma.TravelUncheckedCreateInput):Promise<Travel>
    getTravelById(id:string):Promise<Travel | null>
    updateTravel(data:Travel):Promise<Travel>
    deleteTravel(data:Travel):Promise<void>
    fetchAllTravels(page:number):Promise<Travel[] | null>
    fetchTravelsWithAuthorName(page:number):Promise<Travel[] | null>
    fetchTravelsAuthorId(page:number,userId:string):Promise<Travel[]>
    fetchTravelsByStartDate(date:Date):Promise<Travel[] | null>
}