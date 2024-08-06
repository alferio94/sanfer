export class CreateTransportDto{
    private constructor(
        public readonly name : string,
        public readonly details : string,
        public readonly type : string,
        public readonly map : string,
        public readonly date : Date,
        public readonly extra : string,
        public readonly event : string
    ){}

    static create(object:{[key:string]:any}):[string?, CreateTransportDto?]{
        const {name, details, type, map, date, extra, event} = object;
        if(!name || name==='') return ['El nombre es obligatorio']
        if(!event || name==='') return ['El evento es obligatorio']

        return [undefined, new CreateTransportDto(name, details, type, map, date, extra, event)]
    }
}
