import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const navbarStyle= {
    backgroundColor:'lightblue'
};

const Header = ({titulo}) => {

    return (
        <Navbar style={navbarStyle}  variant="light">
            <Container>
                <Navbar.Brand href="/">{titulo}</Navbar.Brand>
            </Container>
      </Navbar>
    );
};

export default Header;
