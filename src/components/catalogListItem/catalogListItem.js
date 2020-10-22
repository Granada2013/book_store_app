import React from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const ListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background: #f1f1f1;
  }
  .main-info {
    display: flex;
    align-items: center;
    width: 80%;
    img {
      width: 100px;
    }
  }
`;

const CatalogListItem = (props) => {
  const {title, image, price} = props;
    return (
      <ListItem>
        <div className="main-info">
          <img src={image} alt="img"/>
          <span>{title}</span>
        </div>
        <span><strong>$ {price}</strong></span>
      </ListItem>
    );
};

export default CatalogListItem;
