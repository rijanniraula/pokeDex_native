import * as SQLite from "expo-sqlite";

// 1. Open the database using the modern Sync method
export const db = SQLite.openDatabaseSync("pokemon.db");

export const initDb = () => {
  // 2. Use execSync to run all your schema creation SQL at once
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      image TEXT,
      image_back TEXT
    );

    CREATE TABLE IF NOT EXISTS pokemon_types (
      pokemon_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      PRIMARY KEY (pokemon_id, type)
    );

    CREATE INDEX IF NOT EXISTS idx_pokemon_name ON pokemon(name);
    CREATE INDEX IF NOT EXISTS idx_pokemon_type ON pokemon_types(type);
  `);
};
