export class UpdateSpeakerDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly specialty: string,
    public readonly presentation: string,
    public readonly photo: string,
    public readonly extra: string,
    public readonly event: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateSpeakerDto?] {
    const { id,name, specialty, presentation,photo, event, extra } = object;
    if (!id || name === '') return ["El nombre es obligatorio"];
    if (!name || name === "") return ["El nombre es obligatorio"];
    if (!event || event === "") return ["El id del evento no es valido"];

    return [undefined, new UpdateSpeakerDto(id,name, specialty, presentation,photo,extra, event)];
  }
}
