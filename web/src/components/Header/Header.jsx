import styles from "./Header.module.scss";

function Header() {
    return ( 
        <header className={styles.Header}>
            <img src="/img/logo.svg"/>
        </header>
     );
}

export default Header;