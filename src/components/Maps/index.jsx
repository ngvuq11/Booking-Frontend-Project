/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

function Maps() {
  return (
    <div>
      <iframe
        style={{ width: '100%', height: 350 }}
        frameborder='0'
        scrolling='no'
        marginheight='0'
        marginwidth='0'
        src='https://maps.google.com/maps?width=975&amp;height=431&amp;hl=en&amp;q=254 Nguyễn Văn Linh&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
      ></iframe>
    </div>
  );
}

export default Maps;
