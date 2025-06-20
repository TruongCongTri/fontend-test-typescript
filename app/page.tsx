import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import Main from "@/components/validation/Main";

export default function Home() {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <Main />
    </LayoutWrapper>
  );
}
