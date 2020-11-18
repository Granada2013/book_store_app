import React from 'react';
import {ListGroup} from 'reactstrap';
import CatalogListItem from '../catalogListItem/catalogListItem';
import Spinner from '../spinner/spinner';
import CatalogService from '../../services/catalogService';
import ErrorMessage from '../errorMessage/errorMessage';
import {Item, IState} from '../../types';
import {catalogLoaded, catalogError} from '../../actions';
import {connect} from 'react-redux';
import withErrorBoundary from '../errorBoundary/errorBoundary';


interface Props {
  catalog: Array<Item>,
  loading: boolean,
  error: boolean,
  onCatalogLoaded: (data: Array<Item>) => void,
  onCatalogError: () => void
};

class CatalogList extends React.Component<Props> {

  componentDidMount = () => {
    const catalogService = new CatalogService();
    catalogService.getAllProducts()
      .then(data => this.props.onCatalogLoaded(data))
      .catch(this.props.onCatalogError);
  };

  renderItems = (arr: Array<Item>) => {
    return arr.map( (item: Item) => {
      const {isbn13} = item;
      return(
        <CatalogListItem key={isbn13} item={item}/>
        );
    });
  };

  render() {
    const {loading, error, catalog} = this.props;
    if (error) {
      return <ErrorMessage/>
    }
    return (
      <>
        <h2>Выберите книгу</h2>
        <ListGroup flush>
          {loading ? <Spinner/>: this.renderItems(catalog) }
        </ListGroup>
      </>
    );
  }
};

const mapStateToProps = (state: IState) => ({
  catalog: state.catalog,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch: Function) => ({
  onCatalogLoaded(data: Array<Item>) {
    dispatch(catalogLoaded(data))
  },
  onCatalogError() {
    dispatch(catalogError())
  }
})

const WithErrorCatalogList = withErrorBoundary(CatalogList);
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorCatalogList);
