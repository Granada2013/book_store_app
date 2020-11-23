import React, {FunctionComponent} from 'react';
import img from './success-img.png';


const PurchaseCompletePage: FunctionComponent<{}> = () => {
  localStorage.removeItem('cart');
  return (
    <>
      <img src={img} alt="success"/>
      <h4>Ваш заказ успешно оформлен!</h4>
    </>
  )
}

export default PurchaseCompletePage;
