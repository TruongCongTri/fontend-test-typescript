import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function requireAuth() {
  const cookieStore = cookies(); // ✅ This is synchronous
  const auth = cookieStore.get("auth");
  const phoneDataCookie = cookieStore.get("phone_data");

  if (!auth || auth.value !== "true" || !phoneDataCookie?.value) {
    redirect("/login");
  }

  return JSON.parse(phoneDataCookie.value);
}
