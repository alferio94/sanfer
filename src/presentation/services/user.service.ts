import { UploadedFile } from "express-fileupload";
import { UserModel } from "../../data/mongo/models/user.model";
import { GroupModel } from "../../data/mongo/models/user-group.model";
import { CreateUserDto, CustomError, UpdateUserDto } from "../../domain";
import fs from "fs";
import csvParser from "csv-parser";
import { pipeline } from "stream/promises";
import { Transform } from "stream";
import * as path from "path";
export class UserService {
  constructor() {}

  async createUser(dto: CreateUserDto) {
    const userExists = await UserModel.findOne({ email: dto.email });
    if (userExists) throw CustomError.badRequest("Usuario ya registrado");

    try {
      const user = new UserModel({ ...dto });
      await user.save();
      return user;
    } catch (error) {
      throw CustomError.internalServer("Error en user Service");
    }
  }
  async csvFileUser(file: UploadedFile, validExtensions: string = "csv") {
    const users: any[] = [];
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest("Invalid extension: " + fileExtension);
      }
      await pipeline(
        fs.createReadStream(file.tempFilePath),
        csvParser(),
        new Transform({
          objectMode: true,
          transform: async (row, encoding, callback) => {
            try {
              const nombresGrupos = row.Grupos.split("-").map(
                (nombreGrupo: string) => nombreGrupo.trim()
              );
              let [user, gruposEncontrados] = await Promise.all([
                UserModel.findOne({ email: row.Email }),
                GroupModel.find({ name: { $in: nombresGrupos } }),
              ]);
              const idGrupos = gruposEncontrados.map((grupo) => grupo.id);
              if (!user) {
                user = new UserModel({
                  name: row.Nombre,
                  email: row.Email,
                  password: row.Password,
                  isActive: true,
                  groups: idGrupos,
                });
                users.push(user);
              } else {
                user.name = row.Nombre;
                user.password = row.Password;
                user.groups = idGrupos;
                user.isActive = true;
                users.push(user);
              }
              await user.save();
              callback();
            } catch (error) {
              console.error("Error al procesar el usuario:", error);
            }
          },
        })
      );

      await UserModel.updateMany(
        { email: { $nin: users.map((u) => u.email) } },
        { isActive: false }
      );
      await this.vaciarCarpetaTemporal(file.tempFilePath);

      return "Usuarios Actualizados correctamente";
    } catch (error) {
      throw CustomError.internalServer("Error en user Service CSV");
    }
  }
  async vaciarCarpetaTemporal(rutaCarpetaTemporal: string) {
    // Obtener la ruta del directorio temporal
    const rutaDirectorioTemporal = path.dirname(rutaCarpetaTemporal);

    // Leer los archivos de la carpeta temporal
    const archivos = await fs.promises.readdir(rutaDirectorioTemporal);

    // Eliminar cada archivo de la carpeta temporal
    await Promise.all(
      archivos.map(async (archivo) => {
        const rutaArchivo = path.join(rutaDirectorioTemporal, archivo);
        await fs.promises.unlink(rutaArchivo);
      })
    );
  }
  async updateUser(dto: UpdateUserDto) {
    try {
      const user = await UserModel.findOneAndUpdate({ _id: dto.id }, dto, {
        new: true,
      });
      return user;
    } catch (error) {
      throw CustomError.internalServer("Error en user Service");
    }
  }
  async getById(id: string) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw CustomError.internalServer("Error en user Service getById");
    }
  }
  async getAll() {
    try {
      const users = UserModel.find().populate("groups");
      return users;
    } catch (error) {
      throw CustomError.internalServer("Error en Group Service GetlAll");
    }
  }
  async delete(id: string) {
    try {
      const event = UserModel.findByIdAndDelete(id);
      return event;
    } catch (error) {
      throw CustomError.internalServer("Error en event Service Delete");
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email: email, password: password });
      if (!user) throw CustomError.badRequest("Usuario no encontrado");
      return user;
    } catch (error) {
      throw CustomError.internalServer("Error en speaker Service");
    }
  }
}
