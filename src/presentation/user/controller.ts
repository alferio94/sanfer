import { Request, Response } from "express";
import { CreateUserDto, CustomError, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";
import { UploadedFile } from "express-fileupload";
import { UserModel } from "../../data/mongo/models/user.model";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.userService
      .createUser(createUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };
  update = async (req: Request, res: Response) => {
    const user = JSON.parse(req.body.user);
    const userExists = await UserModel.findById(user.id);
    if (!userExists) res.status(404).json({ error: "Usuario no encontrado" });
    const { name, email, isActive, groups, id, password } = userExists!;
    const updatedUser = {
      name,
      email,
      isActive,
      groups,
      id,
      password,
      ...user,
    };
    const [error, updateUserDto] = UpdateUserDto.create(updatedUser);
    if (error) return res.status(400).json({ error });
    this.userService
      .updateUser(updateUserDto!)
      .then((user) => res.status(202).json(user))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = async (req: Request, res: Response) => {
    this.userService
      .getAll()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };
  getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    //console.log(req.params.id)
    if (!id)
      return res
        .status(400)
        .json({ error: "EL id del usuario es obligatorio" });
    this.userService
      .getById(id)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  createFromCsv = (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }
    const file = req.files.file as UploadedFile;
    this.userService
      .csvFileUser(file)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));
  };
  delete=(req:Request, res:Response) =>{
    const id = req.params.id;
    if(!id) return res.status(400).json({error: 'ID invalido'});
    this.userService.delete(id)
    .then(user => res.json(user))
    .catch((error) => this.handleError(error, res));
  }
  login= (req:Request, res:Response) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({error: 'Credenciales invalidas'});
    this.userService.login(email,password)
    .then(user => res.json(user))
    .catch((error) => this.handleError(error, res));
  }
}
