import { CustomError } from "../../domain";
import { Request, Response } from "express";
import { CreateHotelDto } from "../../domain/dtos/hotel/create-hotel.dto";
import { UpdateHotelDto } from "../../domain/dtos/hotel/update-hotel.dto";
import { HotelService } from "../services/hotel.service";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.service";

export class HotelController {
    constructor(
        private readonly hotelService: HotelService,
        private readonly uploadFile: FileUploadService
    ) {}

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    };

    create = async (req: Request, res: Response) => {
        const [error, createHotelDto] = CreateHotelDto.create(JSON.parse(req.body.hotel));
        if (error) return res.status(400).json({ error });
        this.hotelService
            .create(createHotelDto!)
            .then((hotel) => res.status(201).json(hotel))
            .catch((error) => this.handleError(error, res));
    };
    update = async (req: Request, res: Response) => {
        const [error, updateHotelDto] = UpdateHotelDto.create(JSON.parse(req.body.hotel));
        if (error) return res.status(400).json({ error });
        this.hotelService
            .update(updateHotelDto!)
            .then((hotel) => res.status(202).json(hotel))
            .catch((error) => this.handleError(error, res));
    };    
    getAll = async (req: Request, res: Response) => {
        const id = req.params.id;
        this.hotelService
            .getAll(id)
            .then((hotels) => res.json(hotels))
            .catch((error) => this.handleError(error, res));
    };
    getById = async (req: Request, res: Response) => {
        const id = req.params.id;
        this.hotelService
            .getId(id)
            .then((hotel) => res.json(hotel))
            .catch((error) => this.handleError(error, res));
    };
    delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "ID invalido" });
        this.hotelService
            .delete(id)
            .then((hotel) => res.json(hotel))
            .catch((error) => this.handleError(error, res));
    };

    uploadImage = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({ error: "No hay archivos cargados" });
        }
        const file = req.files.file as UploadedFile;
        this.uploadFile
          .uploadSingle(file, "hotelPhoto", undefined, id)
          .then((uploaded) => {
            this.hotelService.getId(id).then((hotel: any) => {
              if (hotel) hotel["photo"] = uploaded;
              this.hotelService
                .update(hotel)
                .then((hotelUpdated) => res.json(hotelUpdated));
            });
          })
          .catch((error) => this.handleError(error, res));
      };
}