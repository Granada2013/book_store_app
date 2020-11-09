import React, {FunctionComponent} from 'react';
import {Alert} from 'reactstrap';

interface Props {
  success: boolean
};

const AlertMessage: FunctionComponent<Props> = ({success}) => {
  let alert = null;
  if (!success) {
    alert = <Alert color="danger">Недостаточно книг на складе. Максимум: 3</Alert>;
  }
  return (
    <>
      {alert}
    </>
  );
};

export default AlertMessage;
