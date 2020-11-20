import React, {FunctionComponent} from 'react';
import img from './success-img.png';
import styled from 'styled-components';

const SuccessPageBlock = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.3em;
  }
`;

const PurchaseCompletePage: FunctionComponent<{}> = () => {

  return (
    <SuccessPageBlock>
      <img src={img} alt="success"/>
      <span>Ваш заказ успешно оформлен!</span>
    </SuccessPageBlock>
  )
}

export default PurchaseCompletePage;
