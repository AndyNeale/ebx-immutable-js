import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      irrelevant: true,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`id: ${this.props.id} ${nextProps.id}`);
    console.log(`title: ${this.props.title} ${nextProps.title}`);
    console.log(`published: ${this.props.published} ${nextProps.published}`);
    console.log(`loading: ${this.props.loading} ${nextProps.loading}`);
    const unequal = {
      object: this.props !== nextProps,
      individual: this.props.id !== nextProps.id
                  || this.props.title !== nextProps.title
                  || this.props.published !== nextProps.published
                  || this.props.loading !== nextProps.loading
    };
    console.log(`unequal: object ${unequal.object} individual ${unequal.individual}`);
    return (unequal.individual);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="Item">
          Loading...
        </div>
      );
    }
    return (
      <div className="Item">
        <div>{this.props.id}</div>
        <div>{this.props.title}</div>
        <div>{this.props.published}</div>
      </div>
    );
  }
}

export default Item;
