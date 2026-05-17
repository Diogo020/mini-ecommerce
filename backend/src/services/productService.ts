import { Product, ProductRepository } from "../repositories/productRepository";

interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  active?: boolean;
}

interface UpdateProductDTO {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  active?: boolean;
}

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(data: CreateProductDTO): Promise<Product> {
    this.validateProductData(data);

    const product: Product = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stockQuantity: Number(data.stockQuantity),
      category: data.category,
      active: data.active ?? true
    };

    return this.productRepository.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new Error("ID do produto inválido.");
    }

    return this.productRepository.findById(id);
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new Error("ID do produto inválido.");
    }

    this.validateProductData(data);

    const product: Product = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stockQuantity: Number(data.stockQuantity),
      category: data.category,
      active: data.active ?? true
    };

    return this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error("ID do produto inválido.");
    }

    return this.productRepository.delete(id);
  }

  private validateProductData(data: CreateProductDTO | UpdateProductDTO): void {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Nome do produto é obrigatório.");
    }

    if (!data.description || data.description.trim() === "") {
      throw new Error("Descrição do produto é obrigatória.");
    }

    if (data.price === undefined || data.price === null || Number(data.price) < 0) {
      throw new Error("Preço deve ser maior ou igual a zero.");
    }

    if (
      data.stockQuantity === undefined ||
      data.stockQuantity === null ||
      Number(data.stockQuantity) < 0
    ) {
      throw new Error("Quantidade em estoque deve ser maior ou igual a zero.");
    }

    if (!data.category || data.category.trim() === "") {
      throw new Error("Categoria do produto é obrigatória.");
    }
  }
}