import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles(() => ({
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    minWidth: 30,
    marginLeft: '5px',
    fontFamily: 'Arial',
    textTransform: 'none',
    fontWeight: 700,
    color: 'white',
    fontSize: '1rem',
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const { value, setValue } = props;

  const { cartItems } = useContext(GlobalContext);

  const handleChange = (e, value) => {
    setValue(value);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Test for Parhako</Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabContainer}
          indicatorColor='primary'
          aria-label='icon tabs example'
        >
          <Tab
            className={classes.tab}
            to='/'
            component={Link}
            label='Some Pics'
          />
          <Tab
            className={classes.tab}
            to='/cart'
            component={Link}
            icon={
              cartItems.length === 0 ? (
                <AddShoppingCartIcon fontSize='large' />
              ) : (
                <Badge
                  color='secondary'
                  badgeContent={cartItems.length}
                  showZero
                >
                  <ShoppingCartIcon fontSize='large' />
                </Badge>
              )
            }
            style={{ marginRight: '20px' }}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
