import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import {
  Card, Icon, Label, Image, Divider,
} from 'semantic-ui-react';
import parse from 'html-react-parser';
import ArticleModal from './ArticleModal';
import { useDeviceDetectContext } from '../../helper/DeviceDetectContext';

export default function Article({
  title,
  descEn,
  date,
  index,
  photoUrl,
  factoryProductId,
  eanCode,
  brand,
  priceExpEur,
  specialPrice,
  expirationDate,
}) {
  const colors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal',
    'blue', 'violet', 'purple', 'pink', 'brown', 'grey',
  ];
  const [isClicked, setIsClicked] = useState(false);
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
      maxHeight: '60vh',
      minHeight: '20vh',
      minWidth: '340px',
      maxWidth: '350px',
    };
  } else {
    responsiveStyle = {
      maxHeight: '60vh',
      minHeight: '20vh',
      minWidth: '340px',
      maxWidth: '30vw',
      cursor: 'zoom-in',
    };
  }

  return (
    <>
      <Card
        data-testid={`article-${index}`}
        onClick={() => setIsClicked(true)}
        fluid
        color={colors[index]}
        raised
        style={responsiveStyle}
      >
        <Card.Content>
          <Divider />
          <Image
            alt="product-image"
            src={photoUrl}
            rounded
            floated="right"
            size="small"
          />
          <Label
            attached="top"
            size="medium"
            color={colors[index]}
            content={title}
          />

          <Card.Content extra>
            {factoryProductId}
          </Card.Content>
          <Card.Meta>
            <table>
              <tbody>
                <tr>
                  <td>Márka:</td>
                  <td>{brand}</td>
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
          <Card.Content extra>
            <Icon name="calendar alternate" />
            {' '}
            Érvényes:
            {new Date(expirationDate).toLocaleDateString()}
          </Card.Content>
        </Card.Content>
      </Card>
      {!!parsedContent
        && (
          <ArticleModal
            index={index}
            open={isClicked}
            onClose={setIsClicked}
            title={title}
            eanCode={eanCode}
            priceExpEur={priceExpEur}
            specialPrice={specialPrice}
            factoryProductId={factoryProductId}
            photoUrl={photoUrl}
            brand={brand}
            descEn={parsedContent}
            date={date}
            expirationDate={expirationDate}
            color={colors[index]}
          />
        )}
    </>
  );
}
