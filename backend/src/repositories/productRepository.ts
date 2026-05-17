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
  price: number;
  stock_quantity: number;
  category: string;
  active: number;
  created_at: string;
  updated_at: string;
}

function mapProductRow(row: ProductDatabaseRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    stockQuantity: row.stock_quantity,
    category: row.category,
    active: Boolean(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export class ProductRepository {
  create(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO products (
          name,
          description,
          price,
          stock_quantity,
          category,
          active
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [
        product.name,
        product.description,
        product.price,
        product.stockQuantity,
        product.category,
        product.active ? 1 : 0
      ];

      database.run(sql, params, function (error) {
        if (error) {
          reject(error);
          return;
        }

        const createdProduct: Product = {
          id: this.lastID,
          ...product
        };

        resolve(createdProduct);
      });
    });
  }

  findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
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

      database.all(sql, [], (error, rows: ProductDatabaseRow[]) => {
        if (error) {
          reject(error);
          return;
        }

        const products = rows.map(mapProductRow);
        resolve(products);
      });
    });
  }

  findById(id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
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
        WHERE id = ?
      `;

      database.get(sql, [id], (error, row: ProductDatabaseRow | undefined) => {
        if (error) {
          reject(error);
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        resolve(mapProductRow(row));
      });
    });
  }

  update(id: number, product: Product): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE products
        SET
          name = ?,
          description = ?,
          price = ?,
          stock_quantity = ?,
          category = ?,
          active = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const params = [
        product.name,
        product.description,
        product.price,
        product.stockQuantity,
        product.category,
        product.active ? 1 : 0,
        id
      ];

      database.run(sql, params, function (error) {
        if (error) {
          reject(error);
          return;
        }

        if (this.changes === 0) {
          resolve(null);
          return;
        }

        resolve({
          id,
          ...product
        });
      });
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM products
        WHERE id = ?
      `;

      database.run(sql, [id], function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve(this.changes > 0);
      });
    });
  }
}