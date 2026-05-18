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
  active: boolean;
  created_at: string;
  updated_at: string;
}

function mapUserRow(row: UserDatabaseRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export class UserRepository {
  async create(user: User): Promise<User> {
    const sql = `
      INSERT INTO users (
        name,
        email,
        password,
        active
      ) VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        email,
        password,
        active,
        created_at,
        updated_at
    `;

    const params = [
      user.name,
      user.email,
      user.password,
      user.active
    ];

    const result = await database.query<UserDatabaseRow>(sql, params);
    return mapUserRow(result.rows[0]);
  }

  async findAll(): Promise<User[]> {
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

    const result = await database.query<UserDatabaseRow>(sql);
    return result.rows.map(mapUserRow);
  }

  async findById(id: number): Promise<User | null> {
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
      WHERE id = $1
    `;

    const result = await database.query<UserDatabaseRow>(sql, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserRow(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
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
      WHERE email = $1
    `;

    const result = await database.query<UserDatabaseRow>(sql, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserRow(result.rows[0]);
  }

  async update(id: number, user: User): Promise<User | null> {
    const sql = `
      UPDATE users
      SET
        name = $1,
        email = $2,
        password = $3,
        active = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING
        id,
        name,
        email,
        password,
        active,
        created_at,
        updated_at
    `;

    const params = [
      user.name,
      user.email,
      user.password,
      user.active,
      id
    ];

    const result = await database.query<UserDatabaseRow>(sql, params);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserRow(result.rows[0]);
  }

  async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM users
      WHERE id = $1
    `;

    const result = await database.query(sql, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}