import { Request, Response } from "express";
import {CreateUserDto, CustomError, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";
import { UploadedFile } from "express-fileupload";
import { UserModel } from "../../data";

export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req:Request, res:Response) =>{
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if(error) return res.status(400).json({error})
    this.userService.createUser(createUserDto!)
    .then(user => res.status(201).json(user))
    .catch(error => this.handleError(error, res)) 

  }
  update = async (req:Request, res:Response) =>{
    const userExists = await UserModel.findById(req.body.id);
    if(!userExists) res.status(404).json({error: 'Usuario no encontrado'});
    const {name, email, isActive, groups, id, password} = userExists!;
    const updatedUser = {name, email, isActive, groups, id,password, ...req.body}
     const [error, updateUserDto] = UpdateUserDto.create(updatedUser);
    if(error) return res.status(400).json({error})
    this.userService.updateUser(updateUserDto!)
    .then(user => res.status(202).json(user))
    .catch(error => this.handleError(error, res))  

  }

  getUsers = async (req:Request, res:Response) =>{
    this.userService.getAll()
    .then(users => res.json(users))
    .catch(error => this.handleError(error, res)) 
  }
  createFromCsv = (req:Request, res:Response) =>{
    if(!req.files || Object.keys(req.files).length ===0){
      return res.status(400).json({error: 'No files were uploaded'})
    }
    const file = req.files.file as UploadedFile;
    this.userService.csvFileUser(file)
    .then(uploaded => res.json(uploaded))
    .catch(error => this.handleError(error, res))
  }
}
