export class UpdateHotelDto{
    private constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly address:string,
        public readonly phone:string,
        public readonly map:string,
        public readonly event:string){}
    static create(object:{[key:string]:any}):[string?, UpdateHotelDto?]{
        const {id,name, address, phone, map, event} = object;
        if(!id)return['Id es obligatorio']
        if(!name || name==='') return ['El nombre es obligatorio'];
        return [undefined, new UpdateHotelDto(id,name, address, phone, map, event)]
    }
}