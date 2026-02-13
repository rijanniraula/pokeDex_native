import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./db";

export const seedPokemonIfNeeded = async () => {
  const seeded = await AsyncStorage.getItem("pokemon_seeded");
  if (seeded) return;

  try {
    // 1. Fetch the list first
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1310",
    );
    const data = await response.json();
    const allResults = data.results;

    // 2. Fetch details in BATCHES (e.g., 50 at a time) to prevent network crash
    const BATCH_SIZE = 50;
    const details: any[] = [];

    for (let i = 0; i < allResults.length; i += BATCH_SIZE) {
      const batch = allResults.slice(i, i + BATCH_SIZE);
      const batchDetails = await Promise.all(
        batch.map((p: any) => fetch(p.url).then((r) => r.json())),
      );
      details.push(...batchDetails);
      console.log(`Fetched ${details.length} / ${allResults.length}`);
    }

    // 3. Database Transaction
    db.withTransactionSync(() => {
      // PREPARE STATEMENTS (Compile SQL once, run many times)
      const insertPokemonStmt = db.prepareSync(
        `INSERT OR REPLACE INTO pokemon (id, name, image, image_back) VALUES (?, ?, ?, ?)`,
      );

      const insertTypeStmt = db.prepareSync(
        `INSERT OR REPLACE INTO pokemon_types (pokemon_id, type) VALUES (?, ?)`,
      );

      try {
        details.forEach((p) => {
          // Execute prepared statement
          insertPokemonStmt.executeSync([
            p.id,
            p.name,
            p.sprites.other?.showdown?.front_default ?? p.sprites.front_default, // Fallback if showdown is null
            p.sprites.back_default,
          ]);

          p.types.forEach((t: any) => {
            insertTypeStmt.executeSync([p.id, t.type.name]);
          });
        });
      } finally {
        // Always finalize statements to prevent memory leaks
        insertPokemonStmt.finalizeSync();
        insertTypeStmt.finalizeSync();
      }
    });

    await AsyncStorage.setItem("pokemon_seeded", "true");
    console.log("Seeding complete!");
  } catch (e) {
    console.error("Error seeding database:", e);
    // Don't set 'seeded' to true so it retries next time
  }
};
