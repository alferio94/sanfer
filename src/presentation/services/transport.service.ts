import { TransportationModel } from "../../data/mongo/models/transportation.model";
import { CreateTransportDto, CustomError, UpdateTransportDto } from "../../domain";

export class TransportService {
  constructor() {}

  async create(dto: CreateTransportDto) {
    try {
      const transport = new TransportationModel({ ...dto });
      await transport.save();
      return transport;
    } catch (error) {
      throw CustomError.internalServer("Error en transport Service");
    }
  }
  async update(dto: UpdateTransportDto) {
    try {
      const transport = TransportationModel.findOneAndUpdate({ _id: dto.id }, dto, {
        new: true,
      });
      return transport;
    } catch (error) {
      throw CustomError.internalServer("Error en transport Service");
    }
  }
  async getAll(id: String) {
    try {
      const transports = TransportationModel.find({ event: id });
      return transports;
    } catch (error) {
      throw CustomError.internalServer("Error en transport Service GetlAll");
    }
  }     
  async getId(id: String) {
    try {
      const transports = TransportationModel.findOne({ _id: id });
      return transports;
    } catch (error) {
      throw CustomError.internalServer("Error en transport Service GetlAll");
    }
  }
  async delete(id: string) {
    try {
      const event = TransportationModel.findByIdAndDelete(id);
      return event;
    } catch (error) {
      throw CustomError.internalServer("Error en event Service Delete");
    }
  }
}