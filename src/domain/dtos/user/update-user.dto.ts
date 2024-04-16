import { Validators } from "../../../config";

export class UpdateUserDto {
    private constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly email: string,
      public readonly password: string,
      public readonly isActive: boolean,
      public readonly groups: string[]
    ) {}
  
    static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
      const { id,name, email, password, isActive, groups } = object;
      if(!id)return['Id es obligatorio']
      if(!Validators.isMongoID(id)) return ['Id invalido']
      if (!name) return ["El nombre es obligatorio"];
      if (!email) return ["El correo es obligatorio"];
      if (!password) return ["La contrasenia es obligatorio"];
      
      return [undefined, new UpdateUserDto(id,name, email, password, isActive, groups)];
    }
  }
  