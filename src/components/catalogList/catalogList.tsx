import React from 'react';
import {ListGroup} from 'reactstrap';
import CatalogListItem from '../catalogListItem/catalogListItem';
import Spinner from '../spinner/spinner';
import CatalogService from '../../services/catalogService';
import ErrorMessage from '../errorMessage/errorMessage';
import { Item } from '../app/app';
import withErrorBoundary from '../errorBoundary/errorBoundary';


interface State {
  list: Array<Item>,
  loading: boolean,
  error: boolean
};

interface Props {
  onSelectItem: (item: Item) => void
}


class CatalogList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    list: [],
    loading: true,
    error: false
  };

  catalogService = new CatalogService();

  onLoadSuccess = (list: Array<Item>) => {
      this.setState({
        list,
        loading: false
      });
  };

  onLoadError = () => {
    this.setState({
      error: true
    });
  };

  componentDidMount = () => {
    this.catalogService.getAllProducts()
      .then(this.onLoadSuccess)
      .catch(this.onLoadError);
  };

  componentDidCatch = () => {
    this.onLoadError();
  };

  renderItems = (arr: Array<Item>) => {
    return arr.map( (item: Item) => {
      const {isbn13} = item;
      return(
        <CatalogListItem key={isbn13}
          item={item}
          onSelectItem={this.props.onSelectItem}/>
        );
    });
  };

  render() {
    const {loading, error, list} = this.state;
    if (error) {
      return <ErrorMessage/>
    }
    const content = loading ? <Spinner/> : this.renderItems(list);
    return (
      <>
        <h2>Выберите книгу</h2>
        <ListGroup flush>
          {content}
        </ListGroup>
      </>
    );
  }
};

const WithErrorCatalogList = withErrorBoundary(CatalogList);
export default  WithErrorCatalogList;
