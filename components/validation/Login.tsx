"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

import PhoneNumberField from "../inputs/PhoneNumberField";
import { phoneSchema, otpSchema } from "@/libs/authValidation";
import { transformPhoneNumber } from "@/libs/transformPhoneNumber";

import { AuthAPI } from "@/types/api";
import { createAccessCode, validateAccessCode } from "@/libs/apiFunction";
import OTPInput from "../inputs/OTPInput";

export default function Login() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [parsedInfo, setParsedInfo] = useState<null | {
    nationalNumber: string;
    international: string;
    withoutPlus: string;
    country: string | undefined;
    countryCode: string;
  }>(null);

  //
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [codeExpiry, setCodeExpiry] = useState(0);

  // Access code expiration countdown
  useEffect(() => {
    if (codeExpiry > 0) {
      const timer = setTimeout(() => setCodeExpiry(codeExpiry - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [codeExpiry]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneSubmit = async () => {
    try {
      setIsLoading(true);
      // 1. first validate phone format
      await phoneSchema.validate({ phone_number: phone });
      // 2. then parse full metadata of phone number
      const phoneData = transformPhoneNumber(phone);
      setParsedInfo(phoneData);
      // 3.
      const payload: AuthAPI.CreateCodePayload = {
        phone_number: phoneData.withoutPlus,
      };
      await createAccessCode(payload);

      toast.success(`Code sent to ${phoneData.withoutPlus}`, {
        icon: "✅",
      });
      setMessage(
        `✅ Code sent to ${phoneData.withoutPlus} ! Please enter it below.`
      );

      setStep(2);
      setCodeExpiry(300); // 5 minutes
      setResendCooldown(60); // 60 seconds
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`, {
          icon: "❌",
        });
        setMessage(`❌ ${error.message}`);
      } else {
        toast.error(`Validation error`, {
          icon: "❌",
        });
        setMessage("❌ Validation error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      if (!parsedInfo?.withoutPlus) throw new Error("Missing phone number");

      setIsLoading(true);
      // 1. first validate phone and access code format
      const validated = await otpSchema.validate({
        phone_number: parsedInfo?.international || "",
        access_code: code,
      });
      // 2.
      const payload: AuthAPI.ValidateCodePayload = validated;
      await validateAccessCode(payload);

      localStorage.setItem("phone_number", validated.phone_number);
      localStorage.setItem("phone_data", JSON.stringify(parsedInfo));

      // Set authentication cookie
      setCookie("auth", "true");
      setCookie("phone_data", JSON.stringify(parsedInfo));

      toast.success("Validated! Redirecting...", {
        icon: "✅",
      });
      setMessage("✅ Validated! Redirecting...");

      router.push("/search");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`, {
          icon: "❌",
        });
        setMessage(`❌ ${error.message}`);
      } else {
        toast.error(`Validation error.`, {
          icon: "❌",
        });
        setMessage("❌ Validation error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (!parsedInfo?.withoutPlus) throw new Error("Missing phone number");

      setIsLoading(true);
      const payload: AuthAPI.CreateCodePayload = {
        phone_number: parsedInfo.withoutPlus,
      };
      await createAccessCode(payload);

      toast.success(`Code resent to ${parsedInfo.withoutPlus}`, {
        icon: "🔁",
      });
      setMessage(`🔁 New code sent to ${parsedInfo.withoutPlus}.`);

      setCodeExpiry(300);
      setResendCooldown(60);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`, {
          icon: "❌",
        });
        setMessage(`❌ ${error.message}`);
      } else {
        toast.error(`Validation error.`, {
          icon: "❌",
        });
        setMessage("❌ Failed to resend code.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <h1 className="text-lg mb-6 cursor-blink">
        C:\Users\Github&gt; OTP Terminal
      </h1> */}

      <label>Enter Phone Number:</label>

      <PhoneNumberField
        value={phone}
        onChange={setPhone}
        disabled={step === 2}
      />
      {step === 1 ? (
        <button
          onClick={handlePhoneSubmit}
          disabled={isLoading || !phone.trim()}
          className={`${
            !phone.trim() || isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {isLoading ? "Sending..." : "Generate Access Code"}
        </button>
      ) : (
        <>
          <label>Enter Access Code:</label>
          {/* <input
            className="w-full mt-1 mb-4"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          /> */}
          <OTPInput value={code} onChange={setCode} disabled={isLoading} />
          <div className="flex gap-4">
            <button
              onClick={handleCodeSubmit}
              disabled={!code.trim() || isLoading}
              className={`${
                !code.trim() || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isLoading ? "Validating..." : "Validate Code"}
            </button>
            <button
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isLoading}
              className={`${
                resendCooldown > 0 || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {resendCooldown > 0 ? `Wait (${resendCooldown}s)` : "Resend Code"}
            </button>
          </div>

          {codeExpiry > 0 && (
            <p className=" text-yellow-300 mt-4 mb-4">
              ⏳ Code expires in {Math.floor(codeExpiry / 60)}:
              {(codeExpiry % 60).toString().padStart(2, "0")}
            </p>
          )}
        </>
      )}

      {message && <p className="mt-4 text-[#00ffff]">{message}</p>}
    </div>
  );
}
