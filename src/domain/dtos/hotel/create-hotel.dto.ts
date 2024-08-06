export class CreateHotelDto {
    private constructor(
        public readonly name:string,
        public readonly address:string,
        public readonly phone:string,
        public readonly map:string,
        public readonly event:string){}
    static create(object:{[key:string]:any}):[string?, CreateHotelDto?]{
        const {name, address, phone, map, event} = object;
        if(!name || name==='') return ['El nombre es obligatorio']
        return [undefined, new CreateHotelDto(name, address, phone, map, event)]
    }
}