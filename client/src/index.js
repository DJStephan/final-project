import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { filetreeReducer } from './ducks/filetree.duck'
import { Page } from './containers'
import './index.css'

const store = createStore(filetreeReducer, devToolsEnhancer())

render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
)
