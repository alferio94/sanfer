export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly isActive: boolean,
    public readonly groups: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password, isActive, groups } = object;

    if (!name) return ["El nombre es obligatorio"];
    if (!email) return ["El correo es obligatorio"];
    if (!password) return ["La contrasenia es obligatorio"];

    return [undefined, new CreateUserDto(name, email, password, isActive, groups)];
  }
}
