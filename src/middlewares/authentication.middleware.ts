import { Response, NextFunction } from 'express';

import { authController } from '../controllers/AuthController';
import { IRequest } from '../shared/types/base.types';

export const authenticate = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers as any;

    if (authorization) {
      return authController.verifyJWT(req, res, next);
    } else {
      return res.status(401).send();
    }
  } catch (e) {
    next(e);
  }
};
