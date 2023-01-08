import React from 'react';
import {
  Portal, Card, Image, Modal,
} from 'semantic-ui-react';
import { useDeviceDetectContext } from '../../helper/DeviceDetectContext';

export default function ImgModal({
  open,
  onClose,
  color,
  factoryProductId,
  photoUrl,
}) {
  const { currentDeviceTypes } = useDeviceDetectContext();
  let responsiveStyle;
  let centered;
  if (currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; })) {
    responsiveStyle = {
      overflow: 'auto',
      margin: '0',
      position: 'fixed',
      left: '0%',
      top: '5%',
      transform: 'translate(-0%, -5%)',
      zIndex: 1000,
      maxWidth: '60vw',
      minWidth: '320px',
    };
    centered = false;
  } else {
    responsiveStyle = {
      overflow: 'auto',
      margin: '0',
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      minHeight: '50vh',
      minWidth: '350px',
      maxWidth: '50vw',
    };
    centered = true;
  }

  return (
    <Portal open={open} onClose={() => onClose(false)}>
      <Modal
        centered={centered}
        onClose={() => onClose(false)}
        onOpen={() => onClose(true)}
        open={open}
        size="tiny"
        dimmer="inverted"
      >
        <Card
          style={responsiveStyle}
          onClick={() => onClose(false)}
          color={color}
          fluid
        >
          <Card.Content header={factoryProductId} />
          <Card.Content>
            <Image
              alt="product-image"
              src={photoUrl}
              rounded
              centered
            />
          </Card.Content>
        </Card>

      </Modal>

    </Portal>
  );
}
