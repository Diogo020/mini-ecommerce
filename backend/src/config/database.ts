import sqlite3 from "sqlite3";
import path from "path";

const sqlite = sqlite3.verbose();

const databasePath = path.resolve(__dirname, "../../database.sqlite");

export const database = new sqlite.Database(databasePath, (error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    return;
  }

  console.log("Banco de dados conectado com sucesso.");
});