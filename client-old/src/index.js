import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { hot } from 'react-hot-loader';

const rootEl = document.getElementById('root');

render(<App />, rootEl);

if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default
      render(
        <NextApp />,
        rootEl
      )
    })
  }