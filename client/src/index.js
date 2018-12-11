import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { filetreeReducer } from './ducks/filetree.duck'
import { SnackBar } from './containers'
import './index.css'

const enhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(filetreeReducer, enhancer)

render(
  <Provider store={store}>
    <SnackBar />
  </Provider>,
  document.getElementById('root')
)
