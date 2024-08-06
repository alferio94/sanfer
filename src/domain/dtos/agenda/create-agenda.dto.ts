export class CreateAgendaDto {
  private constructor(
    public readonly name: string,
    public readonly details: string,
    public readonly extraData: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly event: string,
    public readonly groups: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateAgendaDto?] {
    const { name, details, extraData, startDate, endDate, event, groups } =
      object;
    if (!name || name === "") return ["La actividad es obligatoria"];
    if (!event || event === "") return ["El Id del evento es obligatorio"];

    return [
      undefined,
      new CreateAgendaDto(
        name,
        details,
        extraData,
        startDate,
        endDate,
        event,
        groups
      ),
    ];
  }
}
