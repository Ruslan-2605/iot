import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { getIsAuth, getUserName } from "../../redux/selectors/authSelector";
import { useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import { SignIn } from "../Login/SignIn"
import { SignUp } from "../Login/SignUp"
import { Modal } from "../utils/Modal"

export const HeaderComponent = () => {

    return (
        <div className={styles.header}>

            <HeaderTitle />
            <HeaderContent />

        </div>
    );
};


export const HeaderTitle = () => {
    return (
        <div className={styles.title}>
            <div className={styles.logo}><HomeWorkIcon /></div>
            <div className={styles.text}>IOT</div>
        </div>
    )
}

export const HeaderContent = () => {
    const isAuth = useSelector(getIsAuth);
    return (
        <>
            {
                isAuth ?
                    <HeaderIfAuthTrue /> :
                    <HeaderIfAuthFalse />
            }
        </>
    )
}

export const HeaderIfAuthTrue = () => {
    const username = useSelector(getUserName);
    return (
        <div className={styles.content}>
            <div className={styles.username}>{username}</div>
            <GroupSharpIcon className={styles.profileLogo} />
        </div>
    )
}

export const HeaderIfAuthFalse = () => {

    // Состояние модального окна
    const [isSignIn, setSignIn] = useState(false);
    const [isSignUp, setSignUp] = useState(false);

    return (
        <div className={styles.content}>
            <button className={styles.login} onClick={() => setSignIn(true)}>Sign In</button>
            <button className={styles.login} onClick={() => setSignUp(true)}>Sign Up</button>
            <Modal isModal={isSignIn} setModal={setSignIn} title="Sign In"><SignIn setSignIn={setSignIn} /></Modal>
            <Modal isModal={isSignUp} setModal={setSignUp} title="Sign Up"><SignUp setSignIn={setSignIn} setSignUp={setSignUp} /></Modal>
            <ExitToAppIcon />
        </div>
    )
}