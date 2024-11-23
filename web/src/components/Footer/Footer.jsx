import styles from "./Footer.module.scss";

function Footer() {
    return ( 
        <footer>
            <div className={styles.footerContainer}>
                <p>© 2024 ООО OFFICE<br></br>
                Политика конфиденциальности<br></br>
                Антикоррупционная политика</p>
            </div>
         
        </footer>
     );
}

export default Footer
