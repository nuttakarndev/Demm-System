import Page from "@/component/Page";
import PrivateRoute from "@/component/PrivateRouter/PrivateRouter";

export default function Home() {
  return (
    <PrivateRoute>
      <Page>Welcome</Page>
    </PrivateRoute>
  );
}
