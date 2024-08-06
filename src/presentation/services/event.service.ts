
import { AgendaModel } from "../../data/mongo/models/agenda.model";
import { EventModel } from "../../data/mongo/models/event.model";
import { MenuItemModel } from "../../data/mongo/models/menuItem.model";
import { CreateAgendaDto, CreateEventDto, CustomError, UpdateEventDto } from "../../domain";



export class EventService{
    constructor(){}

    async createEvent(dto:CreateEventDto){
        const eventExists = await EventModel.findOne({ name: dto.name })
        if(eventExists) {
             throw CustomError.badRequest('Evento ya registrado');
             return
        }
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
    async getAll() {
        try {
          const currentDate = new Date(); // Obtener la fecha y hora actual
          //const events = await EventModel.find({ endDate: { $gte: currentDate } }).populate('groups').exec();
          //obtener los eventos que se han creado en el futuro 
          const events = await EventModel.find().populate('groups').populate('menuItems').exec();

          return events;
        } catch (error) {
          throw CustomError.internalServer('Error en Event Service GetlAll');
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
    async getEventPopulate(id:string){
        try {
            const event = EventModel.findById(id).populate("groups").populate('menuItems');
            return event
        } catch (error) {
            throw CustomError.internalServer('Error en Event Service Get By ID')
        }
    }

    async deleteEvent(id:string){
        try {
            const event = EventModel.findByIdAndDelete(id);
            return event
        } catch (error) {
            throw CustomError.internalServer('Error en event Service Delete')
        }
    }

    async createAgenda(dto:CreateAgendaDto){
        try {
            const agenda = new AgendaModel({...dto});
             await agenda.save();
            return agenda 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }

    async getMenu(){
        try {
            const menuItems = MenuItemModel.find();
            console.log(menuItems)
            return menuItems
        } catch (error) {
            throw CustomError.internalServer('Error en event Service GetlAll')
        }
    }
    
}