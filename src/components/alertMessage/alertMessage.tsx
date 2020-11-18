import React, {FunctionComponent} from 'react';
import {Alert} from 'reactstrap';


const AlertMessage: FunctionComponent<{isValidAmount: boolean}> = ({isValidAmount}) => {
  return (
    <>
      {isValidAmount ? null:
      <Alert color="danger">Недостаточно книг на складе. Максимум: 3</Alert>}
    </>
  );
};

export default (AlertMessage);
