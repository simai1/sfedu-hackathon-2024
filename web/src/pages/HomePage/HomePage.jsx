import { useContext, useEffect } from "react";
import DataContext from "../../context";
import Navigate from "../../components/Navigate/Navigate";
import { GetProfile } from "../../API/ApiRequest";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import HomePageProfileClicker from "../../components/HomePageProfileClicker/HomePageProfileClicker";
import styles from "./HomePage.module.scss";
import HomePageTopMenu from "../../ui/HomePageTopMenu/HomePageTopMenu";
import HomePageTableMenu from "../../components/HomePageTableMenu/HomePageTableMenu";
function HomePage() {
  const context = useContext(DataContext);
  console.log("context", context);
  return (
    <>
      {/* <Layout> */}
       <div className={styles.HomePageContainer}>
        <header>
          <HomePageProfileClicker/>
          <HomePageTopMenu/>
          <div className={styles.EditLink}>
            <p>Перейти в конструктор</p>
            <img src="/img/linkArrow.svg"/>
          </div>
        </header>
          
          
            <main>
              <HomePageTableMenu/>
            </main>
          </div>
      {/* </Layout> */}
      </>
  );
}

export default HomePage;
