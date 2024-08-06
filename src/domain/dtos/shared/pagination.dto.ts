export class PaginationDto{
    private constructor(
        public readonly page:number,
        public readonly limit:number
    ){}

    static create(page:number = 1, limit:number = 10):[string?, PaginationDto?]{
        if(isNaN(page) || isNaN(limit)) return ['EL limite y la pagina deben ser un numero'];
        if(page <= 0) return ['La pagina debe ser mayor que 0'];
        if(limit <= 0) return ['EL limite debe ser mayor que 0'];

        return [undefined, new PaginationDto(page, limit)]
    }
}