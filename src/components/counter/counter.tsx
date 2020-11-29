import React, {ChangeEvent, FunctionComponent} from 'react';
import {Input} from 'reactstrap';
import styled from 'styled-components';

const CustomInput = styled(Input)`
  display: inline-block;
  padding-right: 0;
  width: 60px;
  margin-left: 7px;
  margin-right: 7px;
`;

interface Props {
  amount: number,
  onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void
}

const Counter: FunctionComponent<Props> = ({amount, onChangeAmount}) => {
  return (
    <CustomInput id="amount" type="number" value={amount}
           min="1" max="50" required
           onChange={onChangeAmount}/>
  );
};
export default Counter;
