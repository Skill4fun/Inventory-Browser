import { useState, useEffect } from 'react';
import {
  Message, Table, Segment, Header,
} from 'semantic-ui-react';
import ProductModal from '../ListTable/ProductModal';

export default function QuotationTable() {
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [error, setError] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClick = (product) => {
    setModalData({
      nameEn: product.nameEn,
      descEn: product.descEn,
      lastUpdated: product.lastUpdated,
      photoUrl: product.photoUrl,
      factoryProductId: product.factoryProductId,
      eanCode: product.eanCode,
      brand: product.brand,
      weightKgBr: product.weightKgBr,
      weightKgNet: product.weightKgNet,
      priceExpEur: product.priceExpEur,
      qtyAllStock: product.qtyAllStock,
    });
    setIsClicked(true);
  };

  const getQuoteRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/quote-requests`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('browserTableToken')}`,
          },
        },
      );
      const result = await response.json();

      if (response.status !== 200) {
        return setError(result);
      }
      setError('');
      return setQuoteRequests(result.quoteRequests);
    } catch {
      const result = {
        message: 'Network error, server is not available.',
      };
      setError(result);
      return result;
    }
  };

  useEffect(() => {
    getQuoteRequests();
  }, []);

  return (
    <Segment raised color="teal" inverted>
      <Header>
        Elküldött árajánlat kérések:
      </Header>
      <Table compact="very" selectable color="teal" key="teal" stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cikkszám</Table.HeaderCell>
            <Table.HeaderCell>EAN kód</Table.HeaderCell>
            <Table.HeaderCell singleLine>
              Termék megnevezés
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" singleLine>Nettó listaár</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" singleLine>Utolsó árfrissítés</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" singleLine>Árajánlat bekérve:</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!error
            ? (quoteRequests?.map((item) => (
              <Table.Row onClick={() => handleClick(item.product)} key={item.id} style={{ cursor: 'zoom-in' }}>
                <Table.Cell>
                  {item.product.factoryProductId}
                </Table.Cell>
                <Table.Cell>
                  {item.product.eanCode}
                </Table.Cell>
                <Table.Cell>
                  {item.product.nameEn}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {new Intl.NumberFormat('hu-HU', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 2,
                  }).format(
                    item.product.priceExpEur,
                  )}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {new Date(item.product.lastUpdated)?.toLocaleDateString()}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {new Date(item.saveDate)?.toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            )))
            : (<Message error>{error.message}</Message>)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell style={{ color: 'darkorange', fontWeight: 'bold' }}>
              Összesítés
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ color: 'darkorange', fontWeight: 'bold' }}
              colSpan={6}
            >
              {quoteRequests.length}
              tétel
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      <ProductModal
        open={isClicked}
        onClose={setIsClicked}
        factoryProductId={modalData.factoryProductId}
        nameEn={modalData.nameEn}
        brand={modalData.brand}
        descEn={modalData.descEn}
        photoUrl={modalData.photoUrl}
        eanCode={modalData.eanCode}
        lastUpdated={modalData.lastUpdated}
        weightKgBr={modalData.weightKgBr}
        weightKgNet={modalData.weightKgNet}
        priceExpEur={modalData.priceExpEur}
        qtyAllStock={modalData.qtyAllStock}
        color="orange"
      />
    </Segment>
  );
}
