import fs from "fs";
import path from "path";
import { database } from "../config/database";

export function initDatabase(): void {
  const schemaPath = path.resolve(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  database.exec(schema, (error) => {
    if (error) {
      console.error("Erro ao criar tabelas:", error.message);
      return;
    }

    console.log("Tabelas verificadas/criadas com sucesso.");
  });
}