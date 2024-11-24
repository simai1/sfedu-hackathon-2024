import styles from "./FooterHomePage.module.scss";

function FooterHomePageComp() {
    return ( 
        <footer className={styles.Footer}>
            <div className={styles.FooterLogo}>
                <div>
                    <img src="/img/footerLogo.svg"/>
                </div>
               <p>  Email: office@mail.ru</p>
              
            
            </div>
            <div className={styles.FooterContact}>
                <div>
                    <p>+7 (888) 547-58-64</p>
                </div>
                <div className={styles.FooterIcons}>
                    <img src="/img/tg.svg"/>
                    <img src="/img/vk.svg"/>
                </div>
                
            </div>
            <div className={styles.footerList}>
                <ul>
                    <li>Офисы</li>
                    <li>Сотрудники</li>
                    <li>Список оборудования</li>
                </ul>
            </div>
            <div className={styles.FooterBottomOOO}>
                <p>© 2024 ООО OFFICE</p>
                <p>Политика конфиденциальности</p>
                <p>Антикоррупционная политика</p>
            </div>
        </footer>
     );
}

export default FooterHomePageComp;