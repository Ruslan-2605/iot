import React, { useEffect, useState } from "react";
import styles from "../../../../styles/DeviceModalEditMode.module.css";
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CopyToClipboard from "react-copy-to-clipboard";
import { lastActive } from "../../../utils/lastActive";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { UpdateNameDeviceForm } from "../Forms/UpdateNameDeviceForm";

export const DeviceModalEditMode = (props) => {

    const { isModal, setModal, thing, setEditMode, states, children } = props;

    const id = thing.entity.id; //device id
    const name = thing.entity.name;
    const token = thing.entity.token

    const [deviceForm, setDeviceForm] = useState({ "states": states, "name": name })

    useEffect(() => setDeviceForm({ ...deviceForm, "states": states }), [states])

    const udpateDevice = () => {
        console.log(deviceForm)
    }

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>

                <button className={styles.arrowBackIcon} onClick={() => setEditMode(false)}><ArrowBackIcon /></button>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>

                <div className={styles.title}>
                    <UpdateNameDeviceForm name={name} deviceForm={deviceForm} setDeviceForm={setDeviceForm} />
                    <Icons id={id} setModal={setModal} token={token} setEditMode={setEditMode} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
                <button className={styles.submitBtn} onClick={udpateDevice}>Submit</button>
            </div>
        </div>
    );
};

export const Icons = ({ token }) => {

    const [isCopy, setCopy] = useState(false);

    const getTextIsCopied = () => {
        if (isCopy) {
            setTimeout(() => setCopy(false), [1500])
            return "token copied"
        } else {
            return "copy token"
        }
    }

    return (
        <div className={styles.icons}>
            <div>
                <CopyToClipboard text={token}
                    onCopy={() => setCopy(true)}>
                    <button><FileCopyOutlinedIcon /> {getTextIsCopied()}</button>
                </CopyToClipboard>
            </div>
        </div>
    );
}

export const LastActive = ({ activity }) => {

    const lastSeen = lastActive(activity)

    return (
        <div className={styles.lastSeen}>
            {lastSeen}
        </div>
    );
}