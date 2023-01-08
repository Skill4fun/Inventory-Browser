import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Message, Segment } from 'semantic-ui-react';
import { useLoggedInUserContext } from '../helper/LoggedInUserContextProvider';
import { getDataFromToken, verifyEmail } from '../helper/utils';

function EmailVerification() {
  const params = useParams();

  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();

  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    verifyEmail(params.userId, 'userId' in loggedInUser).then((result) => {
      if (result.status === 200) {
        setVerifiedSuccess(true);
        if (result.token) {
          setLoggedInUser(getDataFromToken(result.token));
          localStorage.setItem('foxTicketToken', result.token);
        }
      } else {
        setErrorMessage(result.message);
      }
    });
  }, []);

  return (
    <Segment basic loading={!errorMessage && !verifiedSuccess}>
      {verifiedSuccess
        && (
          <Message
            icon="check"
            header="Email cím sikeresen megerősítve!"
            color="teal"
          />
        )}
      {errorMessage
        && (
          <Message
            icon="times"
            header={errorMessage}
            color="red"
          />
        )}
    </Segment>
  );
}

export default EmailVerification;
