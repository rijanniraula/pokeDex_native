export const extractEvolutionChain = (chain: any) => {
  const result: string[] = [];

  let current = chain;
  while (current) {
    result.push(current.species.name);
    current = current.evolves_to[0];
  }

  return result;
};
