export class UpdateResponsibleDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly event: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateResponsibleDto?] {
    const { id, name, email, phone, event } = object;
    if (!id || id === "") return ["El id no es valido"];
    if (!name || name === "") return ["El nombre es obligatorio"];
    if (!event || event === "") return ["El id del evento no es valido"];

    return [undefined, new UpdateResponsibleDto(id, name, email, phone, event)];
  }
}
