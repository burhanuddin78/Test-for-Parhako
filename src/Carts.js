import React, { useContext, useState } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
} from '@material-ui/core';

import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { GlobalContext } from './context/GlobalState';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 800,
  },
}));

export default function Carts() {
  const classes = useStyles();

  // set hovered
  const [ishovered, setHover] = useState(false);
  // set loading
  const [loading, setLoading] = useState(false);

  // context api
  const { cartItems } = useContext(GlobalContext);
  const { DeleteFromCart } = useContext(GlobalContext);
  const { PlaceOrder } = useContext(GlobalContext);

  // console.log('Cart', cartItems);

  // Snacbar
  const [alert, setAlert] = useState({ open: false, color: '' });
  const [alertMessage, setAlertMesssage] = useState('');

  // handle place  order : placing the orders
  const hanldePlaceOrder = () => {
    setLoading(true);
    PlaceOrder(cartItems);
    setLoading(false);

    setAlert({ open: true, color: '#4BB543' });
    setAlertMesssage('Place order successfully!');
  };

  return (
    <Grid container>
      <Grid item>
        <Typography
          variant='h5'
          style={{ marginTop: '2em', marginLeft: '3em' }}
        >
          CartItems
        </Typography>
      </Grid>

      <Grid item container justify='center' style={{ marginTop: '3em' }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant='h5'> Shopping Cart</Typography>
          </CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell align='right'> Quantity</TableCell>
                  <TableCell align='right'> Price $</TableCell>

                  <TableCell align='right'> Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component='th' scope='row'>
                        <img
                          src={item.url}
                          alt='pics'
                          style={{
                            height: '5em',
                            width: '7em',
                            border: '1px solid rgb(105,105,105)',
                            margin: 'auto',
                          }}
                        />
                      </TableCell>
                      <TableCell align='right'>-</TableCell>
                      <TableCell align='right'>
                        {item.cost.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </TableCell>

                      <TableCell align='right'>
                        <Tooltip title='Delete'>
                          <IconButton
                            onClick={() => {
                              DeleteFromCart(item.id);
                            }}
                            onMouseOver={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            {ishovered ? (
                              <RemoveShoppingCartIcon />
                            ) : (
                              <RemoveShoppingCartOutlinedIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {cartItems.length === 0 ? null : (
            <Grid
              item
              container
              component={Paper}
              justify='flex-end'
              alignItems='center'
              style={{ height: 50 }}
            >
              <Grid item>
                <Typography variant='h6'>Total: </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h6' style={{ marginRight: '2.5em' }}>
                  {cartItems
                    .reduce((a, c) => a + c.cost, 0)
                    .toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid
            item
            container
            component={Paper}
            justify='flex-end'
            alignItems='center'
            style={{ height: 60 }}
          >
            <Button
              variant='contained'
              color='primary'
              style={{ height: 40, marginRight: '3em' }}
              disabled={cartItems.length === 0}
              onClick={hanldePlaceOrder}
            >
              {loading ? 'Ordering....' : 'Place Order'}
            </Button>
          </Grid>
        </Card>
      </Grid>
      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color,
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
      />
    </Grid>
  );
}
