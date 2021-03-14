import React, { useState } from "react";
import styles from "../../../../styles/Device.module.css";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { DeviceModal } from "./DeviceModal";
import { DeviceModalEditMode } from "./DeviceModalEditMode";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceInfoEditMode } from "./DeviceInfoEditMode";


export const Device = React.memo(({ thing }) => {

    // Состояние модального окна
    const [isDeviceModal, setDeviceModal] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [states, setStates] = useState(thing.entity.states)

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>

                <button className={styles.openInModal} onClick={() => setDeviceModal(true)}>
                    <OpenInNewIcon />
                </button>

                <div className={styles.name}>
                    {thing.entity.name}
                </div><hr />

                <div>
                    <div>{thing.entity.state}</div>
                </div>

                {!editMode
                    ?
                    <DeviceModal isModal={isDeviceModal} setModal={setDeviceModal} thing={thing} setEditMode={setEditMode}>
                        <DeviceInfo thing={thing} />
                    </DeviceModal>
                    :
                    <DeviceModalEditMode
                        isModal={isDeviceModal}
                        setModal={setDeviceModal} thing={thing}
                        setEditMode={setEditMode}
                        states={states}
                    >
                        <DeviceInfoEditMode thing={thing} states={states} setStates={setStates} />
                    </DeviceModalEditMode>
                }
            </div>
        </div>
    );
});

