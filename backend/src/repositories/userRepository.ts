import { database } from "../config/database";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserDatabaseRow {
  id: number;
  name: string;
  email: string;
  password: string;
  active: number;
  created_at: string;
  updated_at: string;
}

function mapUserRow(row: UserDatabaseRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    active: Boolean(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export class UserRepository {
  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (
          name,
          email,
          password,
          active
        ) VALUES (?, ?, ?, ?)
      `;

      const params = [
        user.name,
        user.email,
        user.password,
        user.active ? 1 : 0
      ];

      database.run(sql, params, function (error) {
        if (error) {
          reject(error);
          return;
        }

        const createdUser: User = {
          id: this.lastID,
          ...user
        };

        resolve(createdUser);
      });
    });
  }

  findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          name,
          email,
          password,
          active,
          created_at,
          updated_at
        FROM users
        ORDER BY id DESC
      `;

      database.all(sql, [], (error, rows: UserDatabaseRow[]) => {
        if (error) {
          reject(error);
          return;
        }

        const users = rows.map(mapUserRow);
        resolve(users);
      });
    });
  }

  findById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          name,
          email,
          password,
          active,
          created_at,
          updated_at
        FROM users
        WHERE id = ?
      `;

      database.get(sql, [id], (error, row: UserDatabaseRow | undefined) => {
        if (error) {
          reject(error);
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        resolve(mapUserRow(row));
      });
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          name,
          email,
          password,
          active,
          created_at,
          updated_at
        FROM users
        WHERE email = ?
      `;

      database.get(sql, [email], (error, row: UserDatabaseRow | undefined) => {
        if (error) {
          reject(error);
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        resolve(mapUserRow(row));
      });
    });
  }

  update(id: number, user: User): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users
        SET
          name = ?,
          email = ?,
          password = ?,
          active = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const params = [
        user.name,
        user.email,
        user.password,
        user.active ? 1 : 0,
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
          ...user
        });
      });
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM users
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