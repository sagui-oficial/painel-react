import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Dashboard = () => (
  <header>
    <img src={logo} alt="logo" />
    <p>Dashboard</p>
    <NavLink to="/">Voltar</NavLink>
  </header>
);

export default Dashboard;
