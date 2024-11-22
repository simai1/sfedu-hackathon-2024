import React, { useContext, useState } from "react";
import styles from "./RegisterModule.module.scss";
import InputField from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import DataContext from "../../context";

function RegisterModule() {
    const context = useContext(DataContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log('formData', formData); // Выводим данные в консоль
    };

    return ( 
        <div className={styles.RegisterModule}>
            <div className={styles.AuthModuleContainer}> 
                <div className={styles.AuthModuleContainerImg}>
                    <img src="/img/auth.svg" alt="Auth Illustration" />
                </div>
                <div>
                    <div className={styles.title}>
                        <p>Регистрация</p>
                        <p>Создавай свой офис легко!</p>
                    </div>
                    <InputField 
                        typelabel="Имя" 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                       handleChange={handleChange} 
                    />
                    <InputField 
                        typelabel="Email" 
                        type="text" 
                        name="email" 
                        value={formData.email} 
                        handleChange={handleChange} 
                    />
                    <InputField 
                        typelabel="Придумайте пароль" 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        handleChange={handleChange} 
                    />
                    <InputField 
                        typelabel="Повторите пароль" 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        handleChange={handleChange} 
                    />
                    <Button text="Зарегистрироваться" onClick={handleSubmit} />
                    <div className={styles.NotAccount}>
                        <p>Уже есть аккаунт? <span onClick={() => context.setUnauthorized(!context.unauthorized)}>Войти</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterModule;