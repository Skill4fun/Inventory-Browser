import React, { useState, useEffect } from 'react';
import {
  Icon, Table, Image, Pagination, Form, Button, Input,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useDeviceDetectContext } from '../../helper/DeviceDetectContext';
import { useLoggedInUserContext } from '../../helper/LoggedInUserContextProvider';
import { useListItemsContext } from '../../helper/ListItemsContextProvider';
import { fetchWithAuth, getProducts } from '../../helper/utils';
import {
  brands, minQtys, renderLimits, filters, translateUnit,
} from './utils';
import ImgModal from './ImgModal';

export default function BrowserTable({ getProductsFn = getProducts }) {
  const { currentDeviceTypes } = useDeviceDetectContext();
  const { loggedInUser } = useLoggedInUserContext();
  const { addToListClicked, setAddToListClicked, setListItems } = useListItemsContext();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(filters);
  const [renderStatus, setRenderStatus] = useState({ pending: true, filteredProductCount: null });
  const [isImgClicked, setIsImgClicked] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOnImgClick = (product) => {
    setModalData({
      photoUrl: product.photoUrl,
      factoryProductId: product.factoryProductId,
    });
    setIsImgClicked(true);
  };

  const {
    register, watch, setError, formState: {
      dirtyFields,
    },
  } = useForm(
    {
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      shouldFocusError: true,
      mode: 'onChange',
      defaultValues: {
        brand: '',
        minQty: '0',
        renderLimit: '12',
        srchRegex: '',
      },
    },
  );

  const turnPage = async (pageNr) => {
    await setFilter((prev) => ({ ...prev, renderPageNr: pageNr }));
  };

  async function getData() {
    const {
      totalPages, currentPage, products, filteredProductCount,
    } = await getProductsFn(filter);
    setRenderStatus((prev) => ({
      ...prev, pending: false, filteredProductCount, totalPages, currentPage,
    }));
    setData(await products);
  }

  useEffect(() => {
    setRenderStatus((prev) => ({ ...prev, pending: true }));
    getData();
  }, [filter]);

  watch((value, { name }) => setFilter((prev) => ({ ...prev, renderPageNr: 1, [name]: value[name] })));

  const handleOnProductClick = async (productId, userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/list/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('browserTableToken')}`,
          },
          body: JSON.stringify({ productId }),
        },
      );
      const result = await response.json();
      if (response.status !== 200) {
        return setError(result);
      }
      setAddToListClicked((prev) => !prev);
      return {};
    } catch {
      const result = {
        message: 'Hálózati hiba, a szerver nem elérhető.',
      };
      setError(result);
      return result;
    }
  };

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

  useEffect(() => {
    fetchPendingListItems(loggedInUser.userId);
  }, [addToListClicked]);

  const ControlledSelect = ({ fieldName, options }) => {
    return (
      <>
        <select
          data-testid={fieldName}
          {...register(fieldName)}
          value={watch(fieldName)}
          id={fieldName}
          name={fieldName}
          style={{ color: 'teal', fontWeight: (dirtyFields[fieldName] ? 'bold' : 'normal') }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
      </>
    );
  };

  return (
    <>
      <Table definition celled color={renderStatus?.pending ? 'orange' : 'teal'} selectable striped>
        <Table.Header fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan={5}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    fluid
                    control={() => <ControlledSelect fieldName="brand" options={brands} />}
                  />
                  <Form.Field
                    fluid
                    control={() => <ControlledSelect fieldName="minQty" options={minQtys} />}
                  />
                  <Form.Field
                    fluid
                    loading
                    control={() => <ControlledSelect fieldName="renderLimit" options={renderLimits} />}
                  />
                  <Form.Field>
                    <Input
                      fluid
                      loading={renderStatus?.pending && true}
                      iconPosition="left"
                      size={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; })
                        ? 'huge'
                        : undefined}
                    >
                      <input
                        color="blue"
                        data-testid="srchRegex"
                        type="text"
                        name="srchRegex"
                        placeholder="Keresés..."
                        id="srchRegex"
                        {...register('srchRegex')}
                      />
                      <Icon
                        name="search"
                        color={dirtyFields.srchRegex ? 'orange' : 'teal'}
                      />
                    </Input>
                  </Form.Field>
                </Form.Group>
              </Form>

              <Pagination
                color="teal"
                secondary
                pointing
                boundaryRange={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 0 : 3}
                siblingRange={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 1 : 2}
                activePage={renderStatus.currentPage}
                ellipsisItem={currentDeviceTypes.some((type) => {
                  return type === 'isTabletOrMobile';
                })
                  ? false
                  : { content: <Icon name="ellipsis horizontal" />, icon: true }}
                size={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 'small' : 'large'}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={renderStatus.totalPages || 15}
                onPageChange={(event, data2) => (turnPage(data2.activePage))}
              />
            </Table.HeaderCell>

          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Cikkszám</Table.HeaderCell>
            <Table.HeaderCell singleLine>
              Termék megnevezés
              <span style={{ marginLeft: '25px', color: 'orange' }}>
                (
                {renderStatus?.filteredProductCount}
                {' '}
                termék)
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Nettó listaár EUR</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" singleLine>Elérhető készlet</Table.HeaderCell>
            <Table.HeaderCell>Kép</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            data?.map((product) => (
              <Table.Row key={product.factoryProductId}>
                <Table.Cell
                  onClick={() => { handleOnProductClick(product._id, loggedInUser.userId); }}
                >
                  {product.factoryProductId}
                </Table.Cell>
                <Table.Cell
                  onClick={() => { handleOnProductClick(product._id, loggedInUser.userId); }}
                >
                  {product.nameEn}
                </Table.Cell>
                <Table.Cell textAlign="right" singleLine>
                  {new Intl.NumberFormat('hu-HU', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 2,
                  }).format(product.priceExpEur)}
                  /
                  {translateUnit(product.unit)}
                </Table.Cell>
                <Table.Cell
                  textAlign="right"
                  singleLine
                  onClick={() => { handleOnProductClick(product._id, loggedInUser.userId); }}
                >
                  {product.qtyAvailable}
                  {' '}
                  {translateUnit(product.unit)}
                </Table.Cell>
                <Table.Cell>
                  <Image
                    src={product.photoUrl}
                    onClick={() => handleOnImgClick(product)}
                    rounded
                    size={currentDeviceTypes.some((type) => { return type === 'isMobile'; }) ? 'small' : 'mini'}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan={5}>
              <Pagination
                color="teal"
                secondary
                pointing
                boundaryRange={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 0 : 3}
                siblingRange={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 1 : 2}
                activePage={renderStatus.currentPage}
                ellipsisItem={
                  currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; })
                    ? false
                    : { content: <Icon name="ellipsis horizontal" />, icon: true }
                }
                size={currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }) ? 'small' : 'large'}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={renderStatus.totalPages || 15}
                onPageChange={(event, data2) => (turnPage(data2.activePage))}
              />

              <Button
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                floated="right"
                circular
                color="teal"
                icon="angle double up"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <ImgModal
        open={isImgClicked}
        onClose={setIsImgClicked}
        factoryProductId={modalData.factoryProductId}
        photoUrl={modalData.photoUrl}
        color="teal"
      />
    </>
  );
}
