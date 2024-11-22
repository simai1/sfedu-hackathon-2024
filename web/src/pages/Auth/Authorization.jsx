import { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AuthModule from "../../modules/AuthModule/AuthModule";
import RegisterModule from "../../modules/RegisterModule/RegisterModule";
import styles from "./Authorization.module.scss";
import DataContext from "../../context";

function Authorization() {
    const context = useContext(DataContext);
    return ( 
        <>
            <Layout>
              <div className={styles.AuthContainer}>
                {
                    context.unauthorized ? <AuthModule/> : <RegisterModule/>
                }
              </div>
            </Layout>
        </>
     );
}

export default Authorization;