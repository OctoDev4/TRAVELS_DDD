import {Prisma, Travel} from "@prisma/client";

export interface TravelsRepository {

    createTravel(data:Prisma.TravelCreateInput):Promise<Travel>

    findById(travelId:string):Promise<Travel | null>

    findManyByUserId(userId:string,page:number):Promise<Travel[]>

    findByOnDate(date:Date):Promise<Travel[]>

    countByUserId(userId:string):number


    delete(travel:Travel):Promise<void>
}