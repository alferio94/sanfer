import { GroupModel } from "../../data/mongo/models/user-group.model";
import { UpdateGroupDto,CreateGroupDto,CustomError } from "../../domain";





export class GroupsService{
    constructor(){}

    async createGroup(dto:CreateGroupDto){
        const groupExists = await GroupModel.findOne({ name: dto.name })
        if(groupExists) throw CustomError.badRequest('Grupo ya registrado');

        try {
            const group = new GroupModel({...dto});
             await group.save();
            return group 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }
    async updateGroup(dto:UpdateGroupDto){
        try {
            const group = GroupModel.findOneAndUpdate({_id: dto.id}, dto, { new: true })
            return group 
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service')
        }
    }
    async getAll(){
        try {
            //obtener todos los grupos de la base de datos ordenados por el nombre
            const groups = GroupModel.find().sort({name: 1}).exec();
            //const groups = GroupModel.find();
            return groups
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service GetlAll')
        }
    }
    async delete(id:string){
        try {
            const event = GroupModel.findByIdAndDelete(id);
            return event
        } catch (error) {
            throw CustomError.internalServer('Error en event Service Delete')
        }
    }
    
}