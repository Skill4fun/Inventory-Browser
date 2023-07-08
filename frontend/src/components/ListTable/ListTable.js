import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Segment,
  Grid,
  Message,
  Label,
} from 'semantic-ui-react';
import { useLoggedInUserContext } from '../../helper/LoggedInUserContextProvider';
import {
  saveList, fetchWithAuth, removeAllItemsFromList, removeItemFromList,
} from '../../helper/utils';
import { useListItemsContext } from '../../helper/ListItemsContextProvider';
import ProductModal from './ProductModal';

export default function ListTable({ listItemsContextFn = useListItemsContext }) {
  const [quoteRequestStatus, setQuoteRequestStatus] = useState('');
  const { addToListClicked, listItems, setListItems } = listItemsContextFn();
  const [error, setError] = useState('');
  const { loggedInUser } = useLoggedInUserContext();
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

  const handleSave = async () => {
    setQuoteRequestStatus('processing');
    if (loggedInUser?.isVerified) {
      const result = await saveList(loggedInUser.userId);
      setQuoteRequestStatus('saved');
      if (result.status === 200) {
        setListItems([]);
        setError('');
      } else {
        setError(result);
      }
    } else {
      setError({ message: 'Kérjük, erősítse meg e-mail címét a lista mentése előtt.' });
      setQuoteRequestStatus('');
    }
  };

  const initialValue = 0;
  const fetchPendingListItems = async (id) => {
    try {
      const response = await fetchWithAuth(
        `${process.env.REACT_APP_BACKEND_URI}/list/${id}`,
      );
      const result = await response.json();
      if (response.status !== 200) {
        return setError(result);
      }
      return setListItems(result.listItems);
    } catch {
      const result = {
        message: 'Hálózati hiba, a szerver nem elérhető.',
      };
      setError(result);
      return result;
    }
  };

  const handleRemove = async (listItemId) => {
    const result = await removeItemFromList(listItemId);
    if (result.status === 200) {
      setListItems((prev) => prev.filter((listItem) => listItem.id !== listItemId));
    } else {
      setError(result);
    }
  };

  const handleRemoveAll = async () => {
    const result = await removeAllItemsFromList();
    if (result.status === 200) {
      setListItems([]);
    } else {
      setError(result);
    }
  };

  useEffect(() => {
    fetchPendingListItems(loggedInUser.userId);
    setQuoteRequestStatus('');
  }, [addToListClicked]);

  return (
    <>
      {listItems?.length === 0
        ? (
          <>
            <Label color="orange" size="large" attached="top right" pointing="below">Árajánlatkérő lista</Label>
            <Segment color="orange">
              {error.message ? error.message : 'A lista jelenleg üres'}
            </Segment>
          </>
        ) : (
          <>
            <Label color="orange" size="large" attached="top right" pointing="below">Árajánlatkérő lista</Label>
            <Table selectable compact="very" color="orange" key="teal" stackable size="small" collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Cikkszám</Table.HeaderCell>
                  <Table.HeaderCell singleLine>
                    Termék megnevezés
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan={2} textAlign="left" singleLine>Nettó Ár EUR</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listItems?.map((item) => (
                  <Table.Row key={item.id} style={{ cursor: 'zoom-in' }}>
                    <Table.Cell onClick={() => handleClick(item)}>
                      {item.factoryProductId}
                    </Table.Cell>
                    <Table.Cell onClick={() => handleClick(item)}>
                      {item.nameEn}
                    </Table.Cell>
                    <Table.Cell colSpan={2} textAlign="left">
                      {new Intl.NumberFormat('hu-HU', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 2,
                      }).format(
                        item.priceExpEur,
                      )}
                      <Button
                        floated="right"
                        compact
                        circular
                        negative
                        inverted
                        icon="delete"
                        color="orange"
                        onClick={() => handleRemove(item.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell style={{ color: 'darkorange', fontWeight: 'bold' }}>
                    Összesítés
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    textAlign="center"
                    style={{ color: 'darkorange', fontWeight: 'bold' }}
                  >
                    {listItems.length}
                    {' '}
                    tétel
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{ color: 'darkorange', fontWeight: 'bold' }}
                    textAlign="left"
                  >
                    {new Intl.NumberFormat('hu-HU', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 2,
                    }).format(
                      listItems?.map((item) => item.priceExpEur)
                        .reduce((prev, next) => prev + next, initialValue),
                    )}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Button.Group floated="right" fluid>
                      <Button icon="trash alternate" negative inverted onClick={handleRemoveAll} />
                      <Button.Or text="?" />
                      <Button
                        positive
                        icon="save"
                        disabled={!listItems?.length}
                        onClick={() => handleSave()}
                        loading={quoteRequestStatus === 'processing'}
                      />
                    </Button.Group>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </>
        )}
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
      <Grid>
        <Grid.Column textAlign="center">

          <Message
            hidden={quoteRequestStatus !== 'saved' && !error}
            {...(!error
              ? { success: true, content: 'Sikeres mentés!' }
              : { error: true, content: error.message })}
          />
        </Grid.Column>
      </Grid>
    </>
  );
}
