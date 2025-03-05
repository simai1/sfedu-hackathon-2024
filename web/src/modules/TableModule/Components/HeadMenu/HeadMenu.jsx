import { useState } from "react";
import styles from "./HeadMenu.module.scss";
import lupaIcon from "@assets/img/headMenu/lupa.svg";
import exportIcon from "@assets/img/headMenu/export.svg";
import xIcon from "@assets/img/icon/x.svg";

function HeadMenu({ title, search, setSearch, handleExport }) {
  const [shearchOpen, setShearchOpen] = useState(false);

  const funOpenShearch = () => {
    setShearchOpen(true);
    document.getElementById("search").focus();
  };

  const funClouseShearch = () => {
    if (search === "") {
      setShearchOpen(false);
    }
  };

  const funReset = (e) => {
    setSearch("");
    setShearchOpen(false);
  };

  return (
    <div className={styles.HeadMenu}>
      <div className={styles.left}>
        <h1>{title}</h1>
      </div>
      <div className={styles.rigth}>
        <div
          className={`${styles.shearch} ${
            shearchOpen ? styles.shearch_open : ""
          }`}
        >
          <img src={lupaIcon} alt="🔍" onClick={funOpenShearch} />
          <input
            type="text"
            id="search"
            onBlur={funClouseShearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={xIcon} alt="x" onClick={funReset} />
        </div>
        <button className={styles.export} onClick={handleExport}>
          <span>Экспорт</span> <img src={exportIcon} alt="⬇️" />
        </button>
      </div>
    </div>
  );
}

export default HeadMenu;
