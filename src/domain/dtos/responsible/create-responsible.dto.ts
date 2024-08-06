export class CreateResponsibleDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly event: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateResponsibleDto?] {
    const { name, email, phone, event } = object;
    if (!name || name === "") return ["El nombre es obligatorio"];
    if (!event || event === "") return ["El id del evento no es valido"];

    return [undefined, new CreateResponsibleDto(name, email, phone, event)];
  }
}
