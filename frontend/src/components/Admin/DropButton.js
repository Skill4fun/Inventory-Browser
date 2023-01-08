import { Button, Icon } from 'semantic-ui-react';

function DropButton({ icon, title }) {
  return (
    <Button basic color="orange" animated="vertical">
      <Button.Content hidden>{title}</Button.Content>
      <Button.Content visible>
        <Icon style={{ margin: '0 auto' }} name={icon} />
      </Button.Content>
    </Button>
  );
}

export default DropButton;
