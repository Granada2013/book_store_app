import React, {FunctionComponent} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import {Item, ActionWIthPayload, Payload} from '../../types';
import {selectItem} from '../../actions';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';


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
  item: Item,
  onSelectItem: (isbn13: string) => void,
}

const CatalogListItem: FunctionComponent<Props> = ( {item, onSelectItem} ) => {
    return (
      <ListItem onClick={() => onSelectItem(item.isbn13)}>
        <div className="main-info">
          <img src={item.image} alt="img"/>
          <span>{item.title}</span>
        </div>
        <span><strong>$ {item.price}</strong></span>
      </ListItem>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionWIthPayload<Payload>>) => ({
  onSelectItem(isbn13: string) {
    dispatch(selectItem(isbn13))
  }
});

export default connect(null, mapDispatchToProps)(CatalogListItem);
