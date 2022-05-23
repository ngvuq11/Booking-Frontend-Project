import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  let newPrice = props.newPrice;

  console.log(props);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Cool looking table',
                amount: {
                  currency_code: 'USD',
                  value: +newPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Successfull order: ', order);
          //  props.handleSearchDoctor();
          //  let res = await
          toast.success('Payment success !');
        },
        onError: (err) => {
          console.log(err);
          toast.error('Payment error !');
        },
        style: {
          layout: 'horizontal',
        },
      })
      .render('.payment-root');
  }, []);

  return (
    <div>
      {/* <div ref={paypal}></div> */}
      <div className='payment-root'></div>
    </div>
  );
}
