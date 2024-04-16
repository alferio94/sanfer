import { Validators } from "../../../config";


export class UpdateGroupDto{
    private constructor(
        public readonly id:String,
        public readonly name:String,
        public readonly specialty:String,
        public readonly color:String,
        public readonly icon:String,
    ){}

    static create(object:{[key:string]:any}):[string?, UpdateGroupDto?]{
        const {id,name, specialty, color, icon} = object;
         if(!id)return['Id es obligatorio']
         if(!Validators.isMongoID(id)) return ['Id invalido']


        return[undefined, new UpdateGroupDto(id,name, specialty, color, icon)]
    }
}