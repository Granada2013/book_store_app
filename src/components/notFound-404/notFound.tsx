import React, {FunctionComponent} from 'react';
import img from './not_found.jpg';


const NotFound:FunctionComponent<{}> = () => {
  return (
    <img src={img} alt=""/>
  )
}

export default NotFound;
