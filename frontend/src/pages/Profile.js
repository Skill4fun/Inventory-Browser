import React from 'react';
import { Message } from 'semantic-ui-react';
import { getDataFromToken, updateUser } from '../helper/utils';
import { useLoggedInUserContext } from '../helper/LoggedInUserContextProvider';
import ProfileForm from '../components/Profile/ProfileForm';
import Wrapper from '../helper/components/Wrapper';

function Profile() {
  return (
    <>
      <Wrapper minWidthPx={350} computer={6} textAlign="center">
        <ProfileForm
          fetchFn={updateUser}
          getDataFromTokenFn={getDataFromToken}
          loggedInUserContextFn={useLoggedInUserContext}
          color="orange"
          title="Felhasználói adatok frissítése"
          button="Mentés!"
        />
        <Message data-testid="message" size="small">
          <a data-testid="message-link" href="/main">
            Hmm inkább megnézem az aktuális promóciókat!
          </a>
        </Message>
      </Wrapper>
    </>
  );
}
export default Profile;
