import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import NSFW_LINKS from "./nsfw_domains";
import { Hub } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractHubFromURL(url: string): string {
  const regex = /hub\/([^/]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isNSFWDomain(text: string): boolean {
    // Helper function to strip TLD from a domain
    const stripTLD = (domain: string): string => {
      const parts = domain.split('.');
      if (parts.length > 2) {
          return parts.slice(0, -1).join('.');
      } else if (parts.length === 2) {
          return parts[0];
      }
      return domain;
  };

  // Helper function to strip prefixes from the text
  const stripPrefixes = (url: string): string => {
      return url.replace(/^(https?:\/\/)?(www\.)?/, '');
  };

  // Strip prefixes from the text
  const cleanedText = stripPrefixes(text);

  return NSFW_LINKS.some(domain => {
      const strippedDomain = stripTLD(domain);
      return cleanedText.includes(strippedDomain);
  });
}

export function removeKeys<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const newObj = { ...obj };
  keys.forEach(key => {
    delete newObj[key];
  });
  return newObj;
}

export function organizeHubContentOrder(arr: HubContent[], orderString: string): HubContent[] {
  // Split the order string into an array of IDs
  const orderArray = orderString.split('|');
  
  // Create a map to store the index of each ID
  const orderMap = new Map<string, number>();
  orderArray.forEach((id, index) => {
      orderMap.set(id, index);
  });

  // Sort the array based on the indices in the orderMap
  return arr.sort((a, b) => {
      const indexA = orderMap.get(a.id);
      const indexB = orderMap.get(b.id);
      if (indexA === undefined || indexB === undefined) {
          return 0; // If the ID is not found in the orderString, keep the original order
      }
      return indexA - indexB;
  });
}


/**
 * Converts a hex color to a lighter version.
 * @param hex - The hex color code.
 * @param amount - The amount to lighten the color by (0 to 1).
 * @returns The lighter hex color code.
 */
export function lightenHex(hex: string, amount: number): string {
  let usePound = false;

  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }

  const num = parseInt(hex, 16);
  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * amount);
  let b = (num & 0x0000FF) + Math.round(255 * amount);

  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;

  const newColor = (r << 16) | (g << 8) | b;
  return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
}

/**
 * Generates a CSS linear gradient from a hex color.
 * @param hex - The hex color code.
 * @param direction - The direction of the gradient ('top-to-bottom' or 'bottom-to-top').
 * @returns The CSS linear gradient string.
 */
export function generateLinearGradient(hex: string, direction: 'top-to-bottom' | 'bottom-to-top'): string {
  const lighterHex = lightenHex(hex, 0.1); // Adjust the amount to lighten as needed
  const gradientDirection = direction === 'top-to-bottom' ? 'to bottom' : 'to top';
  return `linear-gradient(${gradientDirection}, ${lighterHex}, ${hex})`;
}

export function getNormalizedLinkStyleName(dbName: string): string {
   switch(dbName) {
    case 'fill_rounded':
      return 'fillRounded';
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}