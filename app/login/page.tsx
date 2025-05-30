import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import Login from "@/components/validation/Login";
import React from "react";

export default function LoginPage() {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <Login />
    </LayoutWrapper>
  );
}
