import {TravelsRepository} from "@/repositories/travels-repository";
import {Prisma, Travel} from "@prisma/client";
import dayjs from "dayjs";
import {randomUUID} from "node:crypto";
import "dayjs/locale/pt-br";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository"; // Importe o locale brasileiro para dayjs

export class InMemoryTravelsRepository implements TravelsRepository {


    constructor(
        private usersRepository:InMemoryUsersRepository
    ) {
    }

    public items: Travel[] = []; // Array que armazena as viagens

    // Método para criar uma nova viagem
    async createTravel(data: Prisma.TravelUncheckedCreateInput): Promise<Travel> {
        dayjs().locale("pt-br"); // Define o locale brasileiro para dayjs

        // Converte as datas para o formato Date usando dayjs
        const startDate = dayjs(data.startDate).toDate();
        const endDate = dayjs(data.endDate).toDate();

        // Cria um novo objeto de viagem com os dados fornecidos
        const newTravel: Travel = {
            ...data,
            id: randomUUID(), // Gera um ID único usando randomUUID do Node.js crypto
            totalExpenses: data.totalExpenses ?? 0, // Define totalExpenses como 0 se não estiver definido
            startDate,
            endDate,
        };

        this.items.push(newTravel); // Adiciona a nova viagem ao array de viagens

        return newTravel; // Retorna a nova viagem criada
    }

    // Método para deletar uma viagem
    async deleteTravel(data: Travel): Promise<void> {
        // Encontra o índice da viagem no array com base no ID
        const travelIndex = this.items.findIndex((travel) => travel.id === data.id);

        // Remove a viagem se encontrada no array
        if (travelIndex !== -1) {
            this.items.splice(travelIndex, 1);
        }
    }


    // Método para buscar uma viagem pelo ID
    async getTravelById(id: string): Promise<Travel | null> {
        // Encontra a viagem no array com base no ID
        const travel = this.items.find((travel) => travel.id === id);

        // Retorna a viagem se encontrada ou null se não encontrada
        if (!travel) {
            return null;
        }
        return travel;
    }

    // Método para atualizar uma viagem
    async updateTravel(data: Travel): Promise<Travel> {
        // Encontra o índice da viagem no array com base no ID
        const travelIndex = this.items.findIndex((item) => item.id === data.id);

        // Atualiza a viagem se encontrada no array
        if (travelIndex !== -1) {
            this.items[travelIndex] = data;
        }

        return data; // Retorna a viagem atualizada
    }

    // Método para buscar um conjunto de viagens com base na data de início especificada
    async fetchTravelsByStartDate(startDate: Date): Promise<Travel[] | null> {
        dayjs.locale("pt-br"); // Define o locale brasileiro para dayjs

        const startOfDay = dayjs(startDate).startOf("day"); // Obtém o início do dia da data fornecida

        // Filtra as viagens que têm a mesma data de início do dia
        const travelsWithStartDate = this.items.filter((travel) =>
            dayjs(travel.startDate).startOf("day").isSame(startOfDay, "day")
        );

        // Retorna as viagens filtradas se houver alguma, ou null se não houver
        return travelsWithStartDate.length > 0 ? travelsWithStartDate : null;
    }


    async fetchTravelsWithAuthorName(page: number) {
        return this.items
            .slice((page - 1) * 20, page * 20)
            .map((travel) => {
                const author = this.usersRepository.items.find((user) => {
                    return user.id === travel.authorId;
                });


                const authorName = author ? author.name : 'Unknown Author';


                return {
                    ...travel,
                    authorName: authorName
                };
            });
    }

    // Método para buscar viagens de um usuário específico pelo ID do usuário
    async fetchTravelsAuthorId(page:number,userId: string) {
        return this.items.filter((item) => item.authorId === userId).slice((page - 1) * 20, page * 20);
    }

    async fetchAllTravels(page:number){
        return this.items
            .slice((page - 1) * 20, page * 20)
    }
}
