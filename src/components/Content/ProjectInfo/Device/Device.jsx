import React, { useState } from "react";
import styles from "../../../../styles/Device.module.css";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { DeviceModal } from "./DeviceModal";
import { DeviceInfo } from "./DeviceInfo";

export const Device = React.memo(({ thing }) => {

    // Состояние модального окна
    const [isDeviceModal, setDeviceModal] = useState(false);

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

                <DeviceModal isModal={isDeviceModal} setModal={setDeviceModal} thing={thing}>
                    <DeviceInfo thing={thing} />
                </DeviceModal>
            </div>
        </div>
    );
});

