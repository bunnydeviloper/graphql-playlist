import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../query/queries';

class BookDetails extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <p>Output Book Details Here</p>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
