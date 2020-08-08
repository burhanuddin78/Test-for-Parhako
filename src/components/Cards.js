import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Tooltip, Snackbar } from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { GlobalContext } from '../context/GlobalState';
import PropTypes from 'prop-types';

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // minWidth: 200,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      margn: '0',
    },
  },
  image: {
    position: 'relative',
    height: 200,

    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '2px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.1,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function Cards(props) {
  const classes = useStyles();

  // parse data as props from  somepics component
  const { data } = props;

  // hovered
  const [isHovered, setHover] = useState(false);
  const [ihovered, setHovered] = useState(false);

  // Snacbar
  const [alert, setAlert] = useState({ open: false, color: '' });
  const [alertMessage, setAlertMesssage] = useState('');

  // set data in state
  const [getdata, setData] = useState(data);

  // context api
  const { AddToCart } = useContext(GlobalContext);
  const { cartItems } = useContext(GlobalContext);

  // handle favourite : photo  will add to favourite
  const handleFavourite = (id) => {
    data.isFavorite = !data.isFavorite;
    // console.log('handle Favourite', data);
    setData(data);

    setAlert({ open: true, color: '#4791db' });
    setAlertMesssage(
      data.isFavorite ? 'Add To Favourite successfully!' : 'Remove Favourite'
    );
  };

  // handle cart : set the data in the  cart
  const handlesendToCart = (id, url) => {
    const addtocart = {
      id,
      url,
      cost: 5.99,
    };
    // console.log(addtocart);

    AddToCart(addtocart);
    setAlert({ open: true, color: '#4BB543' });
    setAlertMesssage('Add To Cart successfully!');
  };

  useEffect(() => {}, []);

  return (
    <div
      className={classes.root}
      style={{ borderTop: '5px solid rgba(0, 0, 215, 0.5)' }}
    >
      <Grid
        // focusRipple
        key={getdata.id}
        className={classes.image}
        // focusVisibleClassName={classes.focusVisible}
        style={{
          width: '100%',
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${getdata.url})`,
          }}
        />

        <span className={classes.imageBackdrop} />

        <span className={classes.imageButton}>
          {isHovered && (
            <Grid
              component='span'
              variant='subtitle1'
              color='inherit'
              className={classes.imageTitle}
            >
              {/* find the data if  'isfavourite' is true */}
              {data.isFavorite ? (
                <Tooltip title='Favourite'>
                  <IconButton
                    aria-label='Favourite'
                    style={{ color: '#a73a38' }}
                    onClick={() => handleFavourite(data.id)}
                  >
                    <FavoriteIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Favourite'>
                  <IconButton
                    aria-label='favourite'
                    style={{ color: '#a73a38' }}
                    onClick={() => handleFavourite(data.id)}
                    onMouseOver={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {ihovered ? (
                      <FavoriteIcon fontSize='large' />
                    ) : (
                      <FavoriteBorderIcon fontSize='large' />
                    )}
                  </IconButton>
                </Tooltip>
              )}

              {/*  find the  data  the in the cart and if change the icon to the cart ion */}
              {!cartItems.find((item) => item.id === getdata.id) ? (
                <Tooltip title='Add to Cart'>
                  <IconButton
                    aria-label='plus'
                    color='primary'
                    onClick={() => handlesendToCart(data.id, data.url)}
                  >
                    <AddSharpIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Saved To Cart'>
                  <IconButton aria-label='plus' color='primary'>
                    <ShoppingCartIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          )}
        </span>
      </Grid>
      {/* Alert  */}
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
    </div>
  );
}

Cards.propTypes = {
  data: PropTypes.object,
};
