import * as yup from "yup";
import { validatePhoneNumber } from "./validatePhoneNumber";

export const phoneSchema = yup.object({
  phone_number: yup
    .string()
    .required("Phone number is required")
    .transform((value, originalValue) => validatePhoneNumber(originalValue)),
});

export const otpSchema = yup.object({
  phone_number: yup
    .string()
    .required("Phone number is required")
    .transform((value, originalValue) => validatePhoneNumber(originalValue)),
  access_code: yup
    .string()
    .matches(/^\d{6}$/, "Access code must be a 6-digit number")
    .required(),
});
