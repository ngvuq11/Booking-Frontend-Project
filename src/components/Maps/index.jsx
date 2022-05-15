import React from 'react';
import { Container } from '../Container/Container.styles';
import { Section } from '../Secction/Section.styleds';
import Titles from '../Title';

function Maps() {
  return (
    <Section style={{ paddingTop: '60px' }}>
      <Container>
        <Titles level={2} style={{ textAlign: 'center' }} title='Locations' />
        <iframe
          style={{ width: '100%', height: 500 }}
          scrolling='no'
          src='https://maps.google.com/maps?width=975&amp;height=431&amp;hl=en&amp;q=254 Nguyễn Văn Linh&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
          title='map'
        ></iframe>
      </Container>
    </Section>
  );
}

export default Maps;
