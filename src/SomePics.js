import React, { useContext } from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';

import Cards from './components/Cards';

import { GlobalContext } from './context/GlobalState';

export default function SomePics() {
  const { getData } = useContext(GlobalContext);

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item container style={{ marginTop: '3em' }}>
      <Grid item xs={false} sm={2} md={1} />
      <Grid item xs={12} sm={8} md={10}>
        {/* Cards Component  */}
        <Grid container spacing={matchesSM ? 1 : 3} justify='center'>
          {getData.map((data) => (
            <Grid
              item
              xs={11}
              sm={6}
              md={4}
              key={data.id}
              style={{
                marginBottom: matchesSM ? '1em' : 0,
              }}
            >
              <Cards data={data} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2} md={1} />
    </Grid>
  );
}
