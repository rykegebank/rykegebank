export const hexToRgba = (hex: string, opacity: number): string => {
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Ensure the hex color is valid
  if (!/^([A-Fa-f0-9]{6})$/.test(cleanHex)) {
      throw new Error('Invalid hex color format');
  }

  // Validate opacity
  if (opacity < 0 || opacity > 1) {
      throw new Error('Opacity must be between 0 and 1');
  }

  // Convert hex to RGB
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  // Validate input values
  if (
      !Number.isInteger(r) || r < 0 || r > 255 ||
      !Number.isInteger(g) || g < 0 || g > 255 ||
      !Number.isInteger(b) || b < 0 || b > 255
  ) {
      throw new Error('RGB values must be integers between 0 and 255');
  }

  // Convert RGB to Hex
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};
