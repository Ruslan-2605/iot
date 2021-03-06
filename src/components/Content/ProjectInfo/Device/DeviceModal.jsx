import React, { useState } from "react";
import styles from "../../../../styles/DeviceModal.module.css";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../../../../redux/selectors/thingsSelector";
import { getProjectViewed } from "../../../../redux/selectors/projectsSelector";
import { getUserToken } from "../../../../redux/selectors/authSelector";
import { deleteDeviceThunkCreator } from "../../../../redux/reducers/thingsReducer";
import CopyToClipboard from "react-copy-to-clipboard";
import { lastActive } from "../../../utils/lastActive";


export const DeviceModal = (props) => {

    const { isModal, setModal, thing, setEditMode, children } = props;

    const id = thing.entity.id; //device id
    const name = thing.entity.name;
    const token = thing.entity.token

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>
                <div className={styles.title}>
                    <p>{name}</p>
                    <Icons id={id} setModal={setModal} token={token} setEditMode={setEditMode} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
                <LastActive activity={thing.entity.activity} />
            </div>
        </div>
    );
};

export const Icons = ({ id, token, setModal, setEditMode }) => {

    const dispatch = useDispatch();

    const page = useSelector(getPage);
    const project = useSelector(getProjectViewed).id; //project id
    const userToken = useSelector(getUserToken);

    const [isCopy, setCopy] = useState(false);

    const deleteDevice = async () => {
        const status = await dispatch(deleteDeviceThunkCreator(id, page, project, userToken))
        if (status === 200) {
            setModal(false)
        }
    }

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
            <div>
                <button onClick={() => setEditMode(true)}><EditIcon /></button>
                <button onClick={deleteDevice}><DeleteIcon /></button>
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