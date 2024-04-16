
import { EventModel } from "../../data";
import { CreateEventDto, CustomError, UpdateEventDto } from "../../domain";



export class EventService{
    constructor(){}

    async createEvent(dto:CreateEventDto){
        const eventExists = await EventModel.findOne({ name: dto.name })
        if(eventExists) throw CustomError.badRequest('Evento ya registrado');

        try {
            const event = new EventModel({...dto});
             await event.save();
            return event 
        } catch (error) {
            throw CustomError.internalServer('Error en Event Service')
        }
    }
    async updateEvent(dto:UpdateEventDto){
        try {
            const event = EventModel.findOneAndUpdate({_id: dto.id}, dto, { new: true })
            return event 
        } catch (error) {
            throw CustomError.internalServer('Error en Event Service')
        }
    }
    async getAll(){
        try {
            const events = EventModel.find();
            return events
        } catch (error) {
            throw CustomError.internalServer('Error en Event Service GetlAll')
        }
    }
    async getEvent(id:string){
        try {
            const event = EventModel.findById(id);
            return event
        } catch (error) {
            throw CustomError.internalServer('Error en Event Service Get By ID')
        }
    }
    
}