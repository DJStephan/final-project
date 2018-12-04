import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' exact render={() => <div>Test</div>} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
