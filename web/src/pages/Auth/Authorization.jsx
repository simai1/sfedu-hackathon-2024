import { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AuthModule from "../../modules/AuthModule/AuthModule";
import RegisterModule from "../../modules/RegisterModule/RegisterModule";
import styles from "./Authorization.module.scss";
import DataContext from "../../context";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { GetProfile } from "../../API/ApiRequest";
import { useNavigate } from "react-router-dom";

function Authorization() {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
        // GetProfile().then((resp) => {
        //     if(resp?.status === 200){
        //     navigate("/helloPage")
        //     }else{
        //     navigate("/")
        //     }
        // });
        },[])
    return ( 
        <>
        <Header/>
            <Layout>
              <div className={styles.AuthContainer}>
                {
                    context.unauthorized ? <AuthModule/> : <RegisterModule/>
                }
              </div>
            </Layout>
            <Footer/>
        </>
     );
}

export default Authorization;