import { UpdateAgendaDto } from "./../../domain/dtos/agenda/update-agenda.dto";
import { Request, Response } from "express";
import { CreateAgendaDto } from "../../domain/dtos/agenda/create-agenda.dto";
import { CustomError } from "../../domain";
import { AgendaService } from "../services/agenda.service";
import { AgendaModel } from "../../data/mongo/models/agenda.model";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class AgendaController {
  constructor() {}
  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  async create(req: Request, res: Response) {
    try {
      const [error, createAgendaDto] = CreateAgendaDto.create(
        JSON.parse(req.body.agenda)
      );
      if (error) return res.status(400).json({ error });
      const agenda = new AgendaModel({ ...createAgendaDto });
      await agenda.save();
      return res.status(201).json(agenda);
    } catch (error) {
      throw CustomError.internalServer("Error en Group Service");
    }
  }

  async getByEvent(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { page, limit } = req.query;
      const [error, paginatioDto] = PaginationDto.create(+page!, +limit!);
      if (error) return res.status(400).json({ error });
      if (paginatioDto) {
        // Contar el número total de documentos que coinciden con el filtro
        const totalCount = await AgendaModel.countDocuments({ event: id });

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalCount / paginatioDto.limit);

        // Consultar los documentos paginados
        //obtener agendas con populate de grupos
        const agendas = await AgendaModel.find({ event: id })
          .skip((paginatioDto.page - 1) * paginatioDto.limit)
          .limit(paginatioDto.limit)
          .sort({
            startDate: 1,
          });
        const offset = +page! * +agendas.length;

        agendas.forEach((agenda) => {
          if (agenda.startDate && agenda.endDate) {
            // Restar 6 horas a startDate y endDate
            agenda.startDate = new Date(
              agenda.startDate.getTime() + 6 * 60 * 60 * 1000
            );
            agenda.endDate = new Date(
              agenda.endDate.getTime() + 6 * 60 * 60 * 1000
            );
          }
        });

        res.json({ agendas, totalPages, totalCount, offset }); // Devolver el resultado con el número total de páginas
      }
    } catch (error) {
      throw CustomError.internalServer("Error en Group Service");
    }
  }
  async getByEventApp(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const groupId = req.query.group;
      if (groupId) {
        const agendas = await AgendaModel.find({
          event: id,
          groups: { $in: [groupId] },
        }).sort({
          startDate: 1,
        });
        const agendaItems: any = {};
        agendas.forEach((agenda) => {
          if (agenda.startDate && agenda.endDate) {
            // Restar 6 horas a startDate y endDate
            const adjustedStartDate = new Date(
              agenda.startDate.getTime() - 6 * 60 * 60 * 1000
            );
            const adjustedEndDate = new Date(
              agenda.endDate.getTime() - 6 * 60 * 60 * 1000
            );

            const dateKey = adjustedStartDate.toISOString().split("T")[0]; // Obtener la fecha en formato AAAA-MM-DD
            if (!agendaItems[dateKey]) {
              agendaItems[dateKey] = [];
            }
            agendaItems[dateKey].push({
              startDate: adjustedStartDate,
              endDate: adjustedEndDate,
              name: agenda.name,
              details: agenda.details,
              extraInfo: agenda.extraData,
              groups: agenda.groups,
              id: agenda._id,
            }); // Agregar el evento al array correspondiente a la fecha
          }
        });

        return res.json({ ...agendaItems });
      }
      // Consultar todos los documentos de la agenda relacionados con el evento
      const agendas = await AgendaModel.find({ event: id }).sort({
        startDate: 1,
      });

      const agendaItems: any = {};
      agendas.forEach((agenda) => {
        if (agenda.startDate && agenda.endDate) {
          // Restar 6 horas a startDate y endDate
          const adjustedStartDate = new Date(
            agenda.startDate.getTime() - 6 * 60 * 60 * 1000
          );
          const adjustedEndDate = new Date(
            agenda.endDate.getTime() - 6 * 60 * 60 * 1000
          );

          const dateKey = adjustedStartDate.toISOString().split("T")[0]; // Obtener la fecha en formato AAAA-MM-DD
          if (!agendaItems[dateKey]) {
            agendaItems[dateKey] = [];
          }
          agendaItems[dateKey].push({
            startDate: adjustedStartDate,
            endDate: adjustedEndDate,
            name: agenda.name,
            details: agenda.details,
            extraInfo: agenda.extraData,
            groups: agenda.groups,
            id: agenda._id,
          }); // Agregar el evento al array correspondiente a la fecha
        }
      });

      res.json({ ...agendaItems }); // Devolver el resultado con el objeto agendaItems
    } catch (error) {
      throw CustomError.internalServer("Error en Group Service");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const [error, updateAgendaDto] = UpdateAgendaDto.create(
        JSON.parse(req.body.agenda)
      );
      if (error) return res.status(400).json({ error });
      const agenda = await AgendaModel.findOneAndUpdate(
        { _id: updateAgendaDto!.id },
        updateAgendaDto,
        { new: true }
      );
      return res.json(agenda);
    } catch (error) {
      throw CustomError.internalServer("Error en Event Service");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const agenda = await AgendaModel.findByIdAndDelete(id);
      return res.json(agenda);
    } catch (error) {
      throw CustomError.internalServer("Error en Event Service");
    }
  }
}
