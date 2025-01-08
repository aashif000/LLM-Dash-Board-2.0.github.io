export const convertSizeToNumber = (size: string): number => {
  if (size === "N/A") return 0;
  
  const match = size.match(/(\d+(?:\.\d+)?)\s*([BMK])/i);
  if (!match) return 0;
  
  const [, number, unit] = match;
  const value = parseFloat(number);
  
  switch (unit.toUpperCase()) {
    case 'B': return value * 1000000000;
    case 'M': return value * 1000000;
    case 'K': return value * 1000;
    default: return value;
  }
};

export const convertPriceToNumber = (price: string): number => {
  if (!price || price === "N/A") return 0;
  const match = price.match(/\$(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
};