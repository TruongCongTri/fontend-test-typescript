import React from "react";

type LayoutWrapperProps = {
  children: React.ReactNode;
};
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <div className="p-6 max-w-xl mx-auto">{children}</div>;
}
