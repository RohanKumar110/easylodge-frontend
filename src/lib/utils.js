import { Roles, SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(name) {
  return `${import.meta.env.BASE_URL}assets/${name}`;
}

export function formatCompactNumber(number) {
  if (number >= 1000) {
    return `${Math.floor(number / 1000)}k+`;
  }
  return `${number}+`;
}

export function getEncodedRedirecturl(next) {
  return `${SEARCH_PARAMS_KEYS.NEXT_REDIRECT}=${encodeURIComponent(next || "/")}`;
}

export function getDefaultProfile(initials) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${initials}`;
}

export function isAdmin(user) {
  return user?.roles.includes(Roles.HOTEL_MANAGER);
}

export function isDobValid(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);

  if (Number(day) > 31 || Number(month) > 12) {
    return false;
  }

  const date = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD", true);
  if (!date.isValid() || date.isAfter(dayjs())) {
    return false;
  }
  return true;
}
