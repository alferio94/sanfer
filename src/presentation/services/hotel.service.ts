import { HotelModel } from "../../data/mongo/models/hotel.model";
import { CustomError } from "../../domain";

export class HotelService{
    constructor(){}

    async create(dto:any){
        const hotelExists = await HotelModel.findOne({ name: dto.name })
        if(hotelExists) throw CustomError.badRequest('Hotel ya registrado');

        try {
            const hotel = new HotelModel({...dto});
             await hotel.save();
            return hotel 
        } catch (error) {
            throw CustomError.internalServer('Error en Hotel Service')
        }
    }
    async update(dto:any){
        try {
            const hotel = HotelModel.findOneAndUpdate({_id: dto.id}, dto, { new: true })
            return hotel 
        } catch (error) {
            throw CustomError.internalServer('Error en Hotel Service')
        }
    }
    async getAll(id:String){
        try {
            const hotels = HotelModel.find({event:id});
            return hotels
        } catch (error) {
            throw CustomError.internalServer('Error en Hotel Service GetlAll')
        }
    }
    async getId(id:String){
        try {
            const hotel = HotelModel.findOne({ _id: id });
            return hotel
        } catch (error) {
            throw CustomError.internalServer('Error en hotel Service GetlAll');
        }
    }
    
    async delete(id:string){
        try {
            const hotel = HotelModel.findByIdAndDelete(id);
            return hotel
        } catch (error) {
            throw CustomError.internalServer('Error en event Service Delete')
        }
    }
}