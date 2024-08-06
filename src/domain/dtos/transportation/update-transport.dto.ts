export class UpdateTransportDto{
    private constructor(
        public readonly id : string,
        public readonly name : string,
        public readonly details : string,
        public readonly type : string,
        public readonly map : string,
        public readonly date : Date,
        public readonly extra : string,
        public readonly event : string
    ){}

    static create(object:{[key:string]:any}):[string?, UpdateTransportDto?]{
        const {id,name, details, type, map, date, extra, event} = object;
        if(!id) return ['Id es obligatorio']
        if(!name || name==='') return ['El nombre es obligatorio']
        if(!event || name==='') return ['El evento es obligatorio']

        return [undefined, new UpdateTransportDto(id,name, details, type, map, date, extra, event)]
    }
}