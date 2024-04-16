import { Validators } from "../../../config";

export class UpdateEventDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly campus: string,
    public readonly campusPhone: string,
    public readonly campusMap: string,
    public readonly dressCode: string,
    public readonly tips: string,
    public readonly extra: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateEventDto?] {
    const {
      id,
      name,
      startDate,
      endDate,
      campus,
      campusPhone,
      campusMap,
      dressCode,
      tips,
      extra,
    } = object;

    if (!id) return ["Id es obligatorio"];
    if (!Validators.isMongoID(id)) return ["Id invalido"];
    if (!name) return ["El nombre es obligatorio"];
    if (!name) return ["El nombre es obligatorio"];
    let newStartDate = startDate;
    if (startDate) {
      newStartDate = new Date(startDate);
      if (newStartDate.toString() === "Invalid Date")
        return ["startDate must be a valid date"];
    }
    let newEndDate = endDate;
    if (endDate) {
      newEndDate = new Date(endDate);
      if (newEndDate.toString() === "Invalid Date")
        return ["endDate must be a valid date"];
    }
    return [
      undefined,
      new UpdateEventDto(
        id,
        name,
        startDate,
        endDate,
        campus,
        campusPhone,
        campusMap,
        dressCode,
        tips,
        extra
      ),
    ];
  }
}
