import { db } from "./db";

export const getPokemon = async (
  search: string,
  type: string,
): Promise<any[]> => {
  let query = `
    SELECT p.*, GROUP_CONCAT(pt.type) as types
    FROM pokemon p
    LEFT JOIN pokemon_types pt ON p.id = pt.pokemon_id
    WHERE p.name LIKE ?
  `;

  const params: any[] = [`%${search.toLowerCase()}%`];

  // If a specific type is selected, we filter by that type
  // We use a subquery/EXISTS to ensure we still get ALL types for that pokemon in the result
  if (type && type !== "all") {
    query += ` AND EXISTS (SELECT 1 FROM pokemon_types pt2 WHERE pt2.pokemon_id = p.id AND pt2.type = ?)`;
    params.push(type);
  }

  query += ` GROUP BY p.id ORDER BY p.id`;

  try {
    const results = (await db.getAllAsync(query, params)) as any[];

    // Map the results to the format expected by the UI
    return results.map((row) => ({
      ...row,
      types: row.types
        ? row.types.split(",").map((t: string) => ({
            type: { name: t },
          }))
        : [],
    }));
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    throw error;
  }
};
