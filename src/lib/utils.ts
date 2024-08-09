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
