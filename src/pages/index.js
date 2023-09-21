import RootLayout from "@/layouts/RootLayout";
import { useRouter } from "next/router";

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
      <h1>Hello World</h1>
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
