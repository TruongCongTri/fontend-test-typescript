import { parsePhoneNumberFromString } from "libphonenumber-js";

export const transformPhoneNumber = (value: string) => {
  const parsed = parsePhoneNumberFromString(value); // auto detect country

  if (!parsed || !parsed?.isValid) throw new Error(`Invalid phone number`);

  return {
    nationalNumber: parsed.nationalNumber,
    international: parsed.formatInternational(), // e.g. +84 90 123 4567
    withoutPlus: parsed.number.replace("+", ""), // e.g. 84901234567
    country: parsed.country,                    // e.g. 'VN'
    countryCode: parsed.countryCallingCode,     // e.g. '84'
  };
};
