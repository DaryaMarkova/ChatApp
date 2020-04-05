export const stringToHslColor = (str, saturation=30, lightness=80) => {
  let hash = 0;
  
  for (let i =0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}