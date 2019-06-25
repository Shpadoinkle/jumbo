import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import reducers from './reducers';

/* Screens */

import HomeSearch from './screens/home/HomeSearch';
import Movie from './screens/movie/Movie';


class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyDyUuuEHZA8WfuC5PhwVftvw9fUfENa5tM",
      authDomain: "thoash-7b778.firebaseapp.com",
      databaseURL: "https://thoash-7b778.firebaseio.com",
      projectId: "thoash-7b778",
      storageBucket: "thoash-7b778.appspot.com",
      messagingSenderId: "213870389423",
      appId: "1:213870389423:web:b75405ac6dab3002"
    };
    firebase.initializeApp(config);
  }

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
