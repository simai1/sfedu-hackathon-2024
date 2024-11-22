import Layout from "../../components/Layout/Layout";
import Button from "../../ui/Button/Button";
import styles from "./HelloPage.module.scss";
function HelloPage() {
    return ( 
        <div className={styles.HelloPage}>
            <Layout>
                <div className={styles.HelloPageContainer}>
                    <img className={styles.HelloPageImgTop} src="/img/top.svg"/>
                    <img className={styles.HelloPageImgLeft} src="/img/left.svg"/>
                    <img className={styles.HelloPageImgRight} src="/img/right.svg"/>
                    <p className={styles.HelloPageTitle}>Добро пожаловать<br></br> на наш сервис!</p>
                    <Button text="Поехали!"/>
                </div>
            </Layout>

        </div>
     );
}

export default HelloPage;