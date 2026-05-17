import { Request, Response } from "express";
import { ProductService } from "../services/productService";

const productService = new ProductService();

export class ProductController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const product = await productService.create(request.body);

      return response.status(201).json(product);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao criar produto."
        }
      });
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const products = await productService.findAll();

      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({
        error: {
          message: "Erro ao listar produtos."
        }
      });
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const product = await productService.findById(id);

      if (!product) {
        return response.status(404).json({
          error: {
            message: "Produto não encontrado."
          }
        });
      }

      return response.status(200).json(product);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao buscar produto."
        }
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const product = await productService.update(id, request.body);

      if (!product) {
        return response.status(404).json({
          error: {
            message: "Produto não encontrado."
          }
        });
      }

      return response.status(200).json(product);
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao atualizar produto."
        }
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = Number(request.params.id);
      const deleted = await productService.delete(id);

      if (!deleted) {
        return response.status(404).json({
          error: {
            message: "Produto não encontrado."
          }
        });
      }

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error instanceof Error ? error.message : "Erro ao excluir produto."
        }
      });
    }
  }
}