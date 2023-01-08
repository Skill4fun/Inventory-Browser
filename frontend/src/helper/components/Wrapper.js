import React from 'react';
import { Grid } from 'semantic-ui-react';

export default function Wrapper({
  centered = true,
  minHeightVh,
  minWidthPx,
  backgroundColor,
  marginTopVh,
  textAlign,
  verticalAlign,
  mobile,
  tablet,
  computer,
  children,
}) {
  return (
    <Grid
      centered={centered}
      style={{ minHeight: `${minHeightVh}vh`, paddingTop: `${marginTopVh}vh`, backgroundColor }}
    >
      <Grid.Row>
        <Grid.Column
          mobile={mobile}
          tablet={tablet}
          computer={computer}
          style={{
            minWidth: `${minWidthPx}px`,
          }}
          textAlign={textAlign}
          verticalAlign={verticalAlign}
        >
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
