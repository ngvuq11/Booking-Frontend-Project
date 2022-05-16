import React from 'react';
import { Container } from '../Container/Container.styles';
import { Section } from '../Secction/Section.styleds';
import Titles from '../Title';

function Maps(props) {
  const { address } = props;
  const url = `https://maps.google.com/maps?width=975&height=431&hl=en&q=${address}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
  return (
    <Section style={{ paddingTop: '60px' }}>
      <Container>
        <Titles level={2} style={{ textAlign: 'center' }} title='Locations' />
        <iframe
          style={{ width: '100%', height: 500 }}
          scrolling='no'
          src={url}
          title='map'
        />
      </Container>
    </Section>
  );
}

export default Maps;
