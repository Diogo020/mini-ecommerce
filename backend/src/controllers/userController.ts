import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const user = await userService.create(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao criar usuário."
        }
      });
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const users = await userService.findAll();

      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        error: {
          message: "Erro ao listar usuários."
        }
      });
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const user = await userService.findById(id);

      if (!user) {
        return response.status(404).json({
          error: {
            message: "Usuário não encontrado."
          }
        });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao buscar usuário."
        }
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const user = await userService.update(id, request.body);

      if (!user) {
        return response.status(404).json({
          error: {
            message: "Usuário não encontrado."
          }
        });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao atualizar usuário."
        }
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const deleted = await userService.delete(id);

      if (!deleted) {
        return response.status(404).json({
          error: {
            message: "Usuário não encontrado."
          }
        });
      }

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao excluir usuário."
        }
      });
    }
  }
}
