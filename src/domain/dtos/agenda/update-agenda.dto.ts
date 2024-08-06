export class UpdateAgendaDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly details: string,
    public readonly extraData: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly event: string,
    public readonly groups: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateAgendaDto?] {
    const { name, details, extraData, startDate, endDate, event, groups, id } =
      object;
    if (!id || id === "") return ["La Id es obligatorio es obligatoria"];
    if (!name || name === "") return ["La actividad es obligatoria"];
    if (!event || event === "") return ["El Id del evento es obligatorio"];

    return [
      undefined,
      new UpdateAgendaDto(
        id,
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
