import { useContext } from "react";
import DataContext from "../../context";
import Navigate from "../../components/Navigate/Navigate";

function HomePage() {
  const context = useContext(DataContext);
  console.log("context", context);
  return (
    <main>
      <Navigate />
      Page: {context.valueBasic}
    </main>
  );
}

export default HomePage;
