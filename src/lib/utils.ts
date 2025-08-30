import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns an array of valid email domains
export function getValidEmailDomains() {
  const validDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    validDomains.push("example.com");
  }
  return validDomains;
}

// Returns a normalized name
export function getNormalizedName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
