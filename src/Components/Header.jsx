import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Example = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark"  variant="dark" expand="lg">
        <NavbarBrand href="/"  className="mr-auto">
          Restaurantes
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem >
              <NavLink className="nav-link" to="/">
                <span className="fa fa-home fa-lg" /> Inicio
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/map">
                <span className="fa fa-home fa-lg" /> Mapas
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
