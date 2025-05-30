import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/libs/apiFunction";
import { GithubAPI } from "@/types/api";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import LayoutWrapper from "../../components/layouts/LayoutWrapper";

import DashboardTabs from "@/components/layouts/DashboardTabs";

export default async function DashboardPage() {
  // 🔐 Get cookies directly
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");
  const phoneDataCookie = cookieStore.get("phone_data");

  // 🚫 Redirect if not authenticated
  if (!auth || auth.value !== "true" || !phoneDataCookie?.value) {
    redirect("/login");
  }

  const phoneData = JSON.parse(phoneDataCookie.value);

  // 📡 Fetch liked GitHub user profiles
  const res = await getUserProfile(phoneData.withoutPlus);
  const users: GithubAPI.GithubUser[] =
    res.data.data.user.favorite_github_users;

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <DashboardTabs users={users} />
    </LayoutWrapper>
  );
}
