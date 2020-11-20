import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import  img from './error-img.gif';


const ErrorBlock = styled.div`
  width: 100%;
  img {
    width: 40%;
    min-width: 200px;
    margin-bottom: 10px;
  }
`;

const ErrorMessage: FunctionComponent<{}> = () => {
  return (
    <ErrorBlock>
      <img src={img} alt="error"/>
      <p>Все сломалось, но мы починим!</p>
    </ErrorBlock>
  );
};

export default ErrorMessage;
