import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ({titulo}) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">{titulo}</Navbar.Brand>
      </Navbar>
    )
};

export default Header;
