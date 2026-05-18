import { database } from "../config/database";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductDatabaseRow {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  category: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

function mapProductRow(row: ProductDatabaseRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stockQuantity: row.stock_quantity,
    category: row.category,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export class ProductRepository {
  async create(product: Product): Promise<Product> {
    const sql = `
      INSERT INTO products (
        name,
        description,
        price,
        stock_quantity,
        category,
        active
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        name,
        description,
        price,
        stock_quantity,
        category,
        active,
        created_at,
        updated_at
    `;

    const params = [
      product.name,
      product.description,
      product.price,
      product.stockQuantity,
      product.category,
      product.active
    ];

    const result = await database.query<ProductDatabaseRow>(sql, params);
    return mapProductRow(result.rows[0]);
  }

  async findAll(): Promise<Product[]> {
    const sql = `
      SELECT
        id,
        name,
        description,
        price,
        stock_quantity,
        category,
        active,
        created_at,
        updated_at
      FROM products
      ORDER BY id DESC
    `;

    const result = await database.query<ProductDatabaseRow>(sql);
    return result.rows.map(mapProductRow);
  }

  async findById(id: number): Promise<Product | null> {
    const sql = `
      SELECT
        id,
        name,
        description,
        price,
        stock_quantity,
        category,
        active,
        created_at,
        updated_at
      FROM products
      WHERE id = $1
    `;

    const result = await database.query<ProductDatabaseRow>(sql, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapProductRow(result.rows[0]);
  }

  async update(id: number, product: Product): Promise<Product | null> {
    const sql = `
      UPDATE products
      SET
        name = $1,
        description = $2,
        price = $3,
        stock_quantity = $4,
        category = $5,
        active = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING
        id,
        name,
        description,
        price,
        stock_quantity,
        category,
        active,
        created_at,
        updated_at
    `;

    const params = [
      product.name,
      product.description,
      product.price,
      product.stockQuantity,
      product.category,
      product.active,
      id
    ];

    const result = await database.query<ProductDatabaseRow>(sql, params);

    if (result.rows.length === 0) {
      return null;
    }

    return mapProductRow(result.rows[0]);
  }

  async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM products
      WHERE id = $1
    `;

    const result = await database.query(sql, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}