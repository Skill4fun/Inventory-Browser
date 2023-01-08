import React from 'react';
import {
  Portal, Card, Icon, Image, Divider,
} from 'semantic-ui-react';
import parse from 'html-react-parser';
import { useDeviceDetectContext } from '../../helper/DeviceDetectContext';

export default function ProductModal({
  open,
  onClose,
  color,
  factoryProductId,
  eanCode,
  nameEn,
  brand,
  descEn,
  photoUrl,
  lastUpdated,
  weightKgBr,
  weightKgNet,
  priceExpEur,
  qtyAllStock,
}) {
  let parsedContent;
  if (descEn !== undefined) {
    parsedContent = parse(descEn.toString());
  } else {
    parsedContent = 'feltöltés alatt...';
  }
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
        onClick={() => onClose(false)}
        raised
        fluid
        className="scrolling content"
        color={color}
        style={responsiveStyle}
      >
        <Card.Content>
          <Image
            alt="product-image"
            src={photoUrl}
            rounded
            floated="right"
            size="medium"
          />
          <Card.Header>{nameEn}</Card.Header>
          <Divider />
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
                  <td>Net Súly:</td>
                  <td>
                    {weightKgNet}
                    {' '}
                    Kg
                  </td>
                </tr>
                <tr>
                  <td>Br súly:</td>
                  <td>
                    {weightKgBr}
                    {' '}
                    Kg
                  </td>
                </tr>
                <tr>
                  <td>Akt. készlet:</td>
                  <td>{qtyAllStock}</td>
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
                <tr>
                  <td>
                    <Icon name="calendar alternate" />
                    {' '}
                    Utolsó árfrissítés:
                  </td>
                  <td>{new Date(lastUpdated).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
            <Divider />
          </Card.Meta>
          <Card.Content description={parsedContent} />
        </Card.Content>
      </Card>
    </Portal>
  );
}
