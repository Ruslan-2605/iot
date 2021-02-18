import React from "react";
import styles from "../../styles/Modal.module.css"
import CloseIcon from '@material-ui/icons/Close';

export const Modal = (props) => {

    const { isModal, setModal, title, children } = props;

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>
                <div className={styles.title}>{title}</div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};


