import React from 'react';
import './Title.scss';

function Title(props) {
  const title = props.title;
  return (
    <div className='section__title'>
      <h2>{title}</h2>
    </div>
  );
}

export default Title;
