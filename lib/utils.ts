import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBackendURL = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
  } else {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
}