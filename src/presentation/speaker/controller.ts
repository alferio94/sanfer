import { Request, Response } from "express";
import { CreateSpeakerDto, CustomError, UpdateSpeakerDto } from "../../domain";
import { SpeakerService } from "../services/speaker.service";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.service";

export class SpeakerController {
  constructor(
    private readonly speakerService: SpeakerService,
    private readonly uploadFile: FileUploadService
  ) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req: Request, res: Response) => {
    const [error, createSpeakerDto] = CreateSpeakerDto.create(
      JSON.parse(req.body.speaker)
    );

    if (error) return res.status(400).json({ error });
    this.speakerService
      .create(createSpeakerDto!)
      .then((speaker) => res.status(201).json(speaker))
      .catch((error) => this.handleError(error, res));
  };
  update = async (req: Request, res: Response) => {
    const [error, updateSpeakerDto] = UpdateSpeakerDto.create(
      JSON.parse(req.body.speaker)
    );
    if (error) return res.status(400).json({ error });
    this.speakerService
      .update(updateSpeakerDto!)
      .then((speaker) => res.status(202).json(speaker))
      .catch((error) => this.handleError(error, res));
  };

  getAll = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.speakerService
      .getAll(id)
      .then((speakers) => res.json(speakers))
      .catch((error) => this.handleError(error, res));
  };
  delete = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID invalido" });
    this.speakerService.delete(id).then((speaker) => res.json(speaker));
  };

  uploadImage = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No hay archivos cargados" });
    }
    const file = req.files.file as UploadedFile;
    this.uploadFile
      .uploadSingle(file, "speakerPhoto", undefined, id)
      .then((uploaded) => {
        this.speakerService.getId(id).then((speaker: any) => {
          if (speaker) speaker["speakerPhoto"] = uploaded;
          this.speakerService
            .update(speaker)
            .then((speakerUpdated) => res.json(speakerUpdated));
        });
      })
      .catch((error) => this.handleError(error, res));
  };
}
