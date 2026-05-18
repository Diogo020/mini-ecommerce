import fs from "fs";
import path from "path";
import { database } from "../config/database";

export async function initDatabase(): Promise<void> {
  const schemaPath = path.resolve(process.cwd(), "src", "database", "schema.sql");

  try {
    const schema = fs.readFileSync(schemaPath, "utf-8");

    await database.query(schema);

    console.log("Tabelas verificadas/criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
    throw error;
  }
}