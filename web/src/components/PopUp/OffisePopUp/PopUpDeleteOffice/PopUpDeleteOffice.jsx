import { useContext } from "react";
import PopUpContainer from "../../../PopUpContainer/PopUpContainer";
import styles from "./PopUpDeleteOffice.module.scss";
import DataContext from "../../../../context";
import { DeleteOfisses } from "../../../../API/ApiRequest";
function PopUpDeleteOffice() {
    const context = useContext(DataContext);
    const FincDelete = () => {
        const data = {
            ids: context.selectedRows
        }

       DeleteOfisses(data).then((resp)=>{
            if(resp?.status === 200){
                context.getTableData(context.activeTable);
                context.setPopUp("");
            }
       })
    }
    return ( 
        <PopUpContainer width="640px" buttonCancel="false" height="280px">
            <div className={styles.PopUpDeleteContainer}>
                <div className={styles.PopUpDeleteTitle}><p>Удалить выбранные офисы?</p></div>
                <div>
                    <div className={styles.PopUpDeleteEqupmentContainerButton}>
                        <button onClick={()=>context.setPopUp("")}>Отмена</button>
                        <button onClick={()=>FincDelete()} >Удалить</button>
                    </div>
                </div>
            </div>
        </PopUpContainer>
     );
}

export default PopUpDeleteOffice;