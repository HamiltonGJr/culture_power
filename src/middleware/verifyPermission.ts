import { Request, Response, NextFunction } from 'express';
import { AdminRepository } from '../repository/admin.repository';
import { AdminService } from '../service/admin.service';


const repository = new AdminRepository();
const service = new AdminService(repository);

export const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.body.userId.sub;

    const userIdExist = await service.adminById(id)
    if (id === userIdExist?.id)
      next();
    else
      return response.status(403).send({ message: 'Forbidden: You do not have permission to perform this action.' });
};
