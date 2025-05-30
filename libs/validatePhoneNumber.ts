// libs/validatePhoneNumber.ts
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

export const validatePhoneNumber = (value: string): string => {
  const phone = parsePhoneNumberFromString(value);

  if (!phone || !isValidPhoneNumber(phone.number)) {
    throw new Error("Invalid phone number format");
  }

  return phone.number.replace("+", ""); // return in international format without + (e.g., 84901234567)
};
