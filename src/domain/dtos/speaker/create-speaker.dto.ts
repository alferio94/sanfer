export class CreateSpeakerDto {
  private constructor(
    public readonly name: string,
    public readonly specialty: string,
    public readonly presentation: string,
    public readonly extra: string,
    public readonly event: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateSpeakerDto?] {
    const { name, specialty, presentation, event, extra } = object;
    if (!name || name === "") return ["El nombre es obligatorio"];
    if (!event || event === "") return ["El id del evento no es valido"];

    return [
      undefined,
      new CreateSpeakerDto(name, specialty, presentation, extra, event),
    ];
  }
}
