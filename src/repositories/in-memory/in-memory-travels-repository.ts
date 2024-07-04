import { TravelsRepository } from "@/repositories/travels-repository";
import { Prisma, Travel } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import "dayjs/locale/pt-br"; // Importe o locale brasileiro para dayjs

export class InMemoryTravelsRepository implements TravelsRepository {
    public items: Travel[] = [];

    async createTravel(data: Prisma.TravelUncheckedCreateInput): Promise<Travel> {


        dayjs().locale("pt-br")


        const startDate = dayjs(data.startDate).toDate();
        const endDate = dayjs(data.endDate).toDate();

        const newTravel: Travel = {
            ...data,
            id: randomUUID(),
            totalExpenses: data.totalExpenses ?? 0,
            startDate,
            endDate,
        };

        this.items.push(newTravel);

        return newTravel;
    }

    async deleteTravel(data: Travel): Promise<void> {
        const travelIndex = this.items.findIndex((travel) => travel.id === data.id);

        if (travelIndex !== -1) {
            this.items.splice(travelIndex, 1);
        }
    }

    async fetchTravels(page: number): Promise<Travel[]> {
        const startIndex = (page - 1) * 20;

        const endIndex = startIndex + 20;


        return this.items.slice(startIndex, endIndex);
    }

    async getTravelById(id: string): Promise<Travel | null> {
        const travel = this.items.find((travel) => travel.id === id);

        if (!travel) {
            return null;
        }
        return travel;
    }

    async updateTravel(data: Travel): Promise<Travel> {
        const travelIndex = this.items.findIndex((item) => item.id === data.id);

        if (travelIndex !== -1) {
            this.items[travelIndex] = data;
        }

        return data;
    }

    async fetchTravelsByStartDate(startDate: Date): Promise<Travel[] | null> {
        dayjs.locale("pt-br"); // Define o locale brasileiro para dayjs

        const startOfDay = dayjs(startDate).startOf("day");

        const travelsWithStartDate = this.items.filter((travel) =>
            dayjs(travel.startDate).startOf("day").isSame(startOfDay, "day")
        );

        return travelsWithStartDate.length > 0 ? travelsWithStartDate : null;
    }
}
