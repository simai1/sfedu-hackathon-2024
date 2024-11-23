import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../ui/Button/Button";
import styles from "./HelloPage.module.scss";
import { useEffect } from "react";
import { GetProfile } from "../../API/ApiRequest";
function HelloPage() {
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate("/homePage")
    }

    return ( 
        <div className={styles.HelloPage}>
            <Layout>
                <div className={styles.HelloPageContainer}>
                    <img className={styles.HelloPageImgTop} src="/img/top.svg"/>
                    <img className={styles.HelloPageImgLeft} src="/img/left.svg"/>
                    <img className={styles.HelloPageImgRight} src="/img/right.svg"/>
                    <p className={styles.HelloPageTitle}>Добро пожаловать<br></br> на наш сервис!</p>
                    <Button text="Поехали!" onClick={handleClick}/>
                </div>
            </Layout>

        </div>
     );
}

export default HelloPage;