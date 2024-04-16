import { GroupModel } from "../../data";
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
            const groups = GroupModel.find();
            return groups
        } catch (error) {
            throw CustomError.internalServer('Error en Group Service GetlAll')
        }
    }
    
}