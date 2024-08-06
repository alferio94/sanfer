import { SpeakerModel } from "../../data/mongo/models/speaker.model";
import { CreateSpeakerDto, CustomError, UpdateSpeakerDto } from "../../domain";

export class SpeakerService {
  constructor() {}

  async create(dto: CreateSpeakerDto) {
    try {
      const speaker = new SpeakerModel({ ...dto });
      await speaker.save();
      return speaker;
    } catch (error) {
      throw CustomError.internalServer("Error en speaker Service");
    }
  }
  async update(dto: UpdateSpeakerDto) {
    try {
      const speaker = SpeakerModel.findOneAndUpdate({ _id: dto.id }, dto, {
        new: true,
      });
      return speaker;
    } catch (error) {
      throw CustomError.internalServer("Error en speaker Service");
    }
  }
  async getAll(id: String) {
    try {
      const speakers = SpeakerModel.find({ event: id });
      return speakers;
    } catch (error) {
      throw CustomError.internalServer("Error en speaker Service GetlAll");
    }
  }
  async getId(id: String) {
    try {
      const speakers = SpeakerModel.findOne({ _id: id });
      return speakers;
    } catch (error) {
      throw CustomError.internalServer("Error en speaker Service GetlAll");
    }
  }
  async delete(id: string) {
    try {
      const event = SpeakerModel.findByIdAndDelete(id);
      return event;
    } catch (error) {
      throw CustomError.internalServer("Error en event Service Delete");
    }
  }
}
