import React, {FunctionComponent} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import { SelectedItem } from '../app/app';

const ListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background: #ded6d6;
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

interface Props {
  item: SelectedItem,
  onSelectItem: (item: SelectedItem) => void,
}

const CatalogListItem: FunctionComponent<Props> = ( {item, onSelectItem} ) => {
    return (
      <ListItem onClick={() => onSelectItem(item)}>
        <div className="main-info">
          <img src={item.image} alt="img"/>
          <span>{item.title}</span>
        </div>
        <span><strong>$ {item.price}</strong></span>
      </ListItem>
    );
};

export default CatalogListItem;
