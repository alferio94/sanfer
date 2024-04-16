export class CreateGroupDto{
    private constructor(
        public readonly name:string,
        public readonly specialty:string,
        public readonly color:string,
        public readonly icon:string,
    ){}

    static create(object:{[key:string]:any}):[string?, CreateGroupDto?]{
        const {name, specialty, color, icon} = object;

        if(!name) return ['El nombre es obligatorio'];
        if(!specialty) return ['La especialidad es obligatoria'];

        return[undefined, new CreateGroupDto(name, specialty, color, icon)]
    }
}