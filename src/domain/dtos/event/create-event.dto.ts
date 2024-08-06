export class CreateEventDto {
  private constructor(
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly campus: string,
    public readonly campusPhone: string,
    public readonly campusMap: string,
    public readonly dressCode: string,
    public readonly tips: string,
    public readonly extra: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateEventDto?] {
    const {
      name,
      startDate,
      endDate,
      campus,
      campusPhone,
      campusMap,
      dressCode,
      tips,
      extra,
      
    } = object;
    if(!name || name === '')return['El nombre es obligatorio']

    return [
      undefined,
      new CreateEventDto(
        name,
        startDate,
        endDate,
        campus,
        campusPhone,
        campusMap,
        dressCode,
        tips,
        extra
      ),
    ];
  }
}
