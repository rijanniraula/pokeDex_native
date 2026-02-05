export const heightToCm = (dm: number) => dm * 10;

export const heightToFeetInches = (dm: number) => {
  const totalInches = dm * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}' ${inches}"`;
};

export const weightToKg = (hg: number) => hg / 10;

export const weightToLbs = (hg: number) => {
  const kg = hg / 10;
  return (kg * 2.20462).toFixed(1);
};
