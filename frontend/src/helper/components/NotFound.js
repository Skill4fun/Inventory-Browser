import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Icon, Header, Message, Divider,
} from 'semantic-ui-react';
import Wrapper from './Wrapper';

const NotFound = ({ redirectTo }) => (
  <Wrapper minWidthPx={350} textAlign="center">
    <Message data-testid="not-found" compact warning size="huge">
      <Header>404 - Fejlesztés alatt!</Header>
      <Divider horizontal />
      <Button size="huge" compact attached as={Link} to={redirectTo} animated="vertical" color="teal">
        <Button.Content visible>Főoldal!</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </Message>
  </Wrapper>

);

export default NotFound;
