import React from 'react';
import {ListGroup} from 'reactstrap';
import CatalogListItem from '../catalogListItem/catalogListItem';
import Spinner from '../spinner/spinner';
import CatalogService from '../../services/catalogService';
import ErrorMessage from '../errorMessage/errorMessage';
import { SelectedItem } from '../app/app';


interface State {
  list: Array<SelectedItem>,
  loading: boolean,
  error: boolean
};

interface Props {
  onSelectItem: (item: SelectedItem) => void
}


export default class CatalogList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    list: [],
    loading: true,
    error: false
  };

  catalogService = new CatalogService();

  onLoadSuccess = (list: Array<SelectedItem>) => {
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

  renderItems = (arr: Array<SelectedItem>) => {
    return arr.map( (item: SelectedItem) => {
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
}
