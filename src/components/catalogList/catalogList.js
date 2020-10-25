import React from 'react';
import {ListGroup} from 'reactstrap';
import CatalogListItem from '../catalogListItem';
import Spinner from '../spinner';
import CatalogService from '../../services/catalogService';
import ErrorMessage from '../errorMessage';


export default class CatalogList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    list: null,
    loading: true,
    error: false
  };

  catalogService = new CatalogService();

  onLoadSuccess = (list) => {
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

  renderItems = (arr) => {
    return arr.map( (item) => {
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
    if (error) return <ErrorMessage/>;

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
