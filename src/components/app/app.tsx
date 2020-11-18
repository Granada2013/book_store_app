import React, { FunctionComponent } from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import WithErrorCatalogList from '../catalogList/catalogList';
import WithErrorCartList from '../cartList/cartList';
import ProductDetails from '../productDetails/productDetails';
import Navbar from '../navbar/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import withErrorBoundary from '../errorBoundary/errorBoundary';
import {IState} from '../../types';


const App: FunctionComponent<{isOpenModal: boolean}> = ({isOpenModal}) => {
  return (
    <Router>
      <>
        <Navbar/>
        <Container>
        <Row>
          <Col md="8" sm="12">
              <Route exact path="/">
                <WithErrorCatalogList/>
              </Route>
              <Route path="/cart">
                <WithErrorCartList/>
              </Route>
          </Col>
        </Row>
        {isOpenModal ? <ProductDetails/>: null}
        </Container>
      </>
    </Router>
  );
}

const mapStateToProps = (state: IState) => ({
    isOpenModal: state.isOpenModal
})

const WithErrorApp = withErrorBoundary(App);
export default connect(mapStateToProps)(WithErrorApp);
