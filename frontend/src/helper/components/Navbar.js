import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, Icon, Label, Segment,
} from 'semantic-ui-react';
import { useListItemsContext } from '../ListItemsContextProvider';
import { useLoggedInUserContext } from '../LoggedInUserContextProvider';
import { useNavbarContext } from '../NavbarContextProvider';
import AdminDropdown from '../../components/Admin/AdminDropdown';
import { useDeviceDetectContext } from '../DeviceDetectContext';

export default function Navbar() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();
  const {
    isInventoryClicked, setIsInventoryClicked, isListClicked, setIsListClicked,
  } = useNavbarContext();
  const { listItems, setListItems } = useListItemsContext();
  const { currentDeviceTypes } = useDeviceDetectContext();
  (currentDeviceTypes.some((type) => { return type === 'isTabletOrMobile'; }));

  return (
    <Segment raised>
      <Menu stackable size="large" color="teal">
        <Menu.Item
          as={Link}
          name="home"
          to="/main"
          onClick={() => {
            setIsInventoryClicked(false);
            setIsListClicked(false);
          }}
          active
          position="left"
        >
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            Inventory Browser
          </span>
        </Menu.Item>
        {!!loggedInUser.isAdmin && (<AdminDropdown />)}
        {loggedInUser?.userId ? (
          <>
            <Menu.Item
              as={Link}
              name="inventory"
              to="/products"
              onClick={() => { setIsInventoryClicked((prev) => (!prev)); }}
              active={!!isInventoryClicked}
            >
              <Icon
                size="large"
                name="search plus"
              />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="list"
              to="/products"
              onClick={() => { setIsListClicked((prev) => (!prev)); }}
              active={!!isListClicked}
            >
              <Icon size="large" name="edit outline" />
              {listItems?.length > 0 && (
                <Label color="orange" size="large" floating>
                  {listItems.length}
                </Label>
              )}
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="quotation"
              to="/quotation"
              onClick={() => {
                setIsInventoryClicked(false);
                setIsListClicked(false);
              }}
              position="left"
            >
              <Icon size="large" name="check" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="profile"
              to="/profile"
              onClick={() => {
                setIsInventoryClicked(false);
                setIsListClicked(false);
              }}
            >
              <Icon size="large" name="user outline" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="signOut"
              to="/login"
              onClick={() => {
                setIsInventoryClicked(false);
                setIsListClicked(false);
                setLoggedInUser({});
                setListItems([]);
                localStorage.removeItem('browserTableToken');
              }}
            >
              <Icon size="large" name="log out" />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item as={Link} name="register" to="/register">
              <Icon size="large" name="add user" />
            </Menu.Item>
            <Menu.Item as={Link} name="register" to="/login">
              <Icon size="large" name="sign-in" />
            </Menu.Item>
          </>
        )}
      </Menu>
    </Segment>
  );
}
