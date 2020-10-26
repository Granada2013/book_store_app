import React from 'react';
import {Alert} from 'reactstrap';


const AlertMessage = (props) => {
  const {success} = props;
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
