
import { ResponsibleModel } from "../../data/mongo/models/responsible.model";
import { CreateResponsibleDto, CustomError, UpdateResponsibleDto } from "../../domain";





export class ResponsibleService{
    constructor(){}

    async create(dto:CreateResponsibleDto){
        const responsibleExists = await ResponsibleModel.findOne({ name: dto.name })
        if(responsibleExists) throw CustomError.badRequest('Responsable ya registrado');

        try {
            const group = new ResponsibleModel({...dto});
             await group.save();
            return group 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }
    async update(dto:UpdateResponsibleDto){
        try {
            const group = ResponsibleModel.findOneAndUpdate({_id: dto.id}, dto, { new: true })
            return group 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }
    async getAll(id:String){
        try {
            const groups = ResponsibleModel.find({event:id});
            return groups
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service GetlAll')
        }
    }
    async delete(id:string){
        try {
            const event = ResponsibleModel.findByIdAndDelete(id);
            return event
        } catch (error) {
            throw CustomError.internalServer('Error en event Service Delete')
        }
    }
    
}