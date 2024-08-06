
import { AgendaModel } from "../../data/mongo/models/agenda.model";
import { CreateAgendaDto, CustomError } from "../../domain";





export class AgendaService{
    async create(dto:CreateAgendaDto){
        try {
            const agenda = new AgendaModel({...dto});
             await agenda.save();
            return agenda 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }
    
}