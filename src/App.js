import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import reducers from './reducers';

/* Screens */

import HomeSearch from './screens/home/HomeSearch';
import Movie from './screens/movie/Movie';


class App extends Component {
  // constructor(props) {
  //   super(props);
  //   var config = {
  //     apiKey: "sssss",
  //     authDomain: "ssss",
  //     databaseURL: "ssssss",
  //     projectId: "a",
  //     storageBucket: "a",
  //     messagingSenderId: ""
  //   };
  //   firebase.initializeApp(config);
  // }

  render() {
    const store = createStore(reducers, {});

    return (
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <ScrollToTop />
            <Route path="/" component={HomeSearch} />
            <Route path="/movie/:movieId" exact component={Movie} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
