import path from 'path';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import { CustomError } from '../../domain';

export class FileUploadService {
  constructor(
  ) {}

  private checkFolder(folderPath: string) {
    if(!fs.existsSync(folderPath)){
      console.log('not')
        fs.mkdirSync(folderPath);
    }
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string,
    validExtensions: string[] = ["png", "jpg","jpeg", "gif"],
    fName:string,
  ) {
    try {
        const fileExtension= file.mimetype.split('/').at(1)?? '';
        if(!validExtensions.includes(fileExtension)){
            throw CustomError.badRequest('Invalid extension: ' + fileExtension)
        }
        const destination = path.resolve(__dirname,`../../../public/uploads`,folder);
        this.checkFolder(destination);
        const fileName = `${fName}.${fileExtension}`
        file.mv(destination + `/${fileName}`);

        return `uploads/${folder}/${fileName}`

    } catch (error) {
        throw CustomError.internalServer('Algo salio mal D:')
    }
  }
  public uploadMultiple(
    file: any,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "gif"]
  ) {}
}