import React, {FunctionComponent} from 'react';
import {Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import CartWidget from '../cartWidget/cartWidget';
import styled from 'styled-components';


const NavBlock = styled.div`
  background: #292828;
  height: 60px;
  width: 100%;
  margin-bottom: 30px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  a {
    text-decoration: none;

  }
  .home {
    color: #cbcbcb;
    font-size: 1.3em;
    :hover {
      color: #fff;
    }
  }`

const Navbar: FunctionComponent<{number: number}> = ({number}) => {
  return (
    <NavBlock>
      <Container>
        <Link to="/"><span className='home'>Home</span></Link>
        <Link to="/cart">
          <CartWidget
            number={number}/>
        </Link>
      </Container>
    </NavBlock>
  );
};

export default Navbar;
