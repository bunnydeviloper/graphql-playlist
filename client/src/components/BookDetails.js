import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../query/queries';

class BookDetails extends Component {

  render() {
    return (
      <div>
        <p>Output Book Details Here</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails);
