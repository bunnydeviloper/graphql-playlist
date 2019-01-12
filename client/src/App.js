import React, { Component } from 'react';
import BookList from './components/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Bookshelf App With GraphQL</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
