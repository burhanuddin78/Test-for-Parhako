import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import SomePics from './SomePics';
import Carts from './Carts';

import { GlobalProvider } from './context/GlobalState';

function App() {
  const [value, setValue] = useState(0);
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <Switch>
          <Route exact path='/' component={SomePics} />
          <Route exact path='/cart' component={Carts} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
