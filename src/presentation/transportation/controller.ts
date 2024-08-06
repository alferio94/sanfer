import { Request, Response } from "express";
import { CreateTransportDto, CustomError, UpdateTransportDto } from "../../domain";
import { TransportService } from "../services/transport.service";

export class TransportController {
    constructor(
        private readonly transportService: TransportService
    ) {}

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    };

    create = async (req: Request, res: Response) => {
        const [error, createTransportDto] = CreateTransportDto.create(JSON.parse(req.body.transport));
        if (error) return res.status(400).json({ error });
        this.transportService
            .create(createTransportDto!)
            .then((transport) => res.status(201).json(transport))
            .catch((error) => this.handleError(error, res));
    };
    update = async (req: Request, res: Response) => {
        const [error, updateTransportDto] = UpdateTransportDto.create(JSON.parse(req.body.transport));
        if (error) return res.status(400).json({ error });
        this.transportService
            .update(updateTransportDto!)
            .then((transport) => res.status(202).json(transport))
            .catch((error) => this.handleError(error, res));
    };
    getAll = async (req: Request, res: Response) => {
        const id = req.params.id;
        this.transportService
            .getAll(id)
            .then((transports) => res.json(transports))
            .catch((error) => this.handleError(error, res));
    };
    getById = async (req: Request, res: Response) => {
        const id = req.params.id;
        this.transportService
            .getId(id)
            .then((transport) => res.json(transport))
            .catch((error) => this.handleError(error, res));
    };
    delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "ID invalido" });
        this.transportService
            .delete(id)
            .then((transport) => res.json(transport))
            .catch((error) => this.handleError(error, res));
    };
}