import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { filetreeReducer } from './ducks/filetree.duck'
import { Page } from './containers'
import './index.css'

const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]
const composeEnhancers = composeWithDevTools({})
const store = createStore(filetreeReducer, composeEnhancers(...enhancers))

// for testing, need to delete store later
window.store = store

render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
)
