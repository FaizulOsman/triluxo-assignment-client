import RootLayout from "@/layouts/RootLayout";
import { useRouter } from "next/router";
import Blog from "./blog";

const HomePage = () => {
  const router = useRouter();
  const isReload =
    router?.components?.["/login"] ||
    router?.components?.["/be-a-premium-user"];

  if (isReload) {
    window.location.reload();
  }

  return (
    <>
      <Blog />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
