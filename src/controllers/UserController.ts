import { Request, Response, NextFunction } from 'express';

import UserService from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { users, totalCount } = await this.userService.getUsers();

      res.json({
        users,
        totalCount,
      });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);

      res.status(201).json({
        user,
      });
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.updateUser(+id, req.body);
      res.json(result);
    } catch  (err) {
      next(err);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.removeUser(+id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
