import React from 'react';
import {
  Portal, Card, Label, Icon, Image, Divider,
} from 'semantic-ui-react';
import { useDeviceDetectContext } from '../../helper/DeviceDetectContext';

export default function PortalModal({
  open, onClose, title,
  descEn,
  index,
  color,
  photoUrl,
  factoryProductId,
  eanCode,
  brand,
  priceExpEur,
  specialPrice,
  expirationDate,
}) {
  const { currentDeviceTypes } = useDeviceDetectContext();
  let responsiveStyle;
  if (currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; })) {
    responsiveStyle = {
      overflow: 'auto',
      maxHeight: '90vh',
      position: 'fixed',
      left: '20%',
      top: '5%',
      transform: 'translate(-20%, -5%)',
      zIndex: 1000,
      minHeight: '20vh',
      minWidth: '340px',
      maxWidth: '600px',
    };
  } else {
    responsiveStyle = {
      overflow: 'auto',
      maxHeight: '90vh',
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      minHeight: '20vh',
      minWidth: '350px',
      maxWidth: '50vw',
    };
  }
  return (
    <Portal open={open} onClose={() => onClose(false)}>

      <Card
        data-testid={`modal-${index}`}
        onClick={() => onClose(false)}
        fluid
        color={color}
        raised
        style={responsiveStyle}
      >
        <Card.Content>
          <Divider hidden />
          <Image
            alt="product-image"
            src={photoUrl}
            rounded
            floated="right"
            size="large"
          />
          <Card.Header>
            <Label color={color} attached="top">
              {title}
            </Label>

          </Card.Header>

          <Card.Meta>
            <table>
              <tbody>
                <tr>
                  <td>Cikkszám:</td>
                  <td>{factoryProductId}</td>
                </tr>
                <tr>
                  <td>Márka:</td>
                  <td>{brand}</td>
                </tr>
                <tr>
                  <td>EAN: </td>
                  <td>{eanCode}</td>
                </tr>
                <tr>
                  <td>Listaár:</td>
                  <td>
                    {new Intl.NumberFormat('hu-HU', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 2,
                    }).format(
                      priceExpEur,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Meta>
          <Divider hidden />
          <Card.Header style={{ color: 'OrangeRed', fontSize: '1.2rem' }}>
            Akciós ár:
            {' '}
            {new Intl.NumberFormat('hu-HU', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 2,
            }).format(
              specialPrice,
            )}
          </Card.Header>
          <Divider />
          <Card.Content description={descEn} />
          <Divider />
          <Card.Content extra>
            <Icon name="calendar alternate" />
            {' '}
            Érvényes:
            {new Date(expirationDate).toLocaleDateString()}
          </Card.Content>
        </Card.Content>
      </Card>

    </Portal>
  );
}
