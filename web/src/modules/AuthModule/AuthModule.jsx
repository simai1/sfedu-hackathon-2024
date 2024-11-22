import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import InputField from "../../ui/Input/Input";
import styles from "./AuthModule.module.scss";
import { useContext, useState } from "react";
import DataContext from "../../context";

function AuthModule() {
    const navigate = useNavigate()
    const context = useContext(DataContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log("formData", formData); // Выводим данные в консоль
        navigate("/helloPage")
    };

    return ( 
        <div className={styles.AuthModule}>
            <div className={styles.AuthModuleContainer}> 
                <div className={styles.AuthModuleContainerImg}>
                    <img src="/img/auth.svg" alt="Auth Illustration" />
                </div>
                <div>
                    <div className={styles.title}>
                        <p>Вход</p>
                        <p>Создавай свой офис легко!</p>
                    </div>
               
                   <InputField 
                       typelabel="Email" 
                       type="text" 
                       name="email" 
                       value={formData.email} 
                       handleChange={handleChange} 
                   />
                   <InputField 
                       typelabel="Пароль" 
                       type="password" 
                       name="password" 
                       value={formData.password} 
                       handleChange={handleChange} 
                   />
                   <Button text="Войти" onClick={handleSubmit} />
                   <div className={styles.NotAccount}>
                        <p>Нет аккаунта? <span onClick={() => context.setUnauthorized(!context.unauthorized)}>Зарегистрироваться</span></p>
                   </div>
                </div>
            </div>
        </div>
     );
}

export default AuthModule;