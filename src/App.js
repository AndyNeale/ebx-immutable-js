import React, { Component } from 'react';
import { List, Map } from 'immutable';

import Item from './Item.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Map({
        id: 0,
        items: List(),
      })
    }
    this.addItem = this.addItem.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  addItem({data}) {
    const now = new Date().toLocaleTimeString();
    const item = {
      title: 'Andy Writes Terrible Code',
      published: `26 June 2017 at ${now}`,
      loading: true,
      id: data.get('id'),
    };
    return {
      data: data.update('items', items => items.push(item))
                .update('id', id => id + 1)
    };
  }

  setLoaded(index) {
    return function update({data}) {
      return {
        items: data.update('items', items => items.update(index, item => item.loading = false))
      };
    }
  }

  componentDidMount() {
    window.intervals = {};
    window.intervals.add = setInterval(() => {
      this.setState(this.addItem);
    }, 1000);

    window.intervals.load = setInterval(() => {
      const index = Math.floor(Math.random() * this.state.data.get('id'));
      this.setState(this.setLoaded(index));
    }, 2000);
  }

  onStop() {
    window.clearInterval(window.intervals.add);
    window.clearInterval(window.intervals.load);
  }

  render() {
    const items = this.state.data.get('items');
    return (
      <div className="App">
        {items.map(item => <Item {...item} />)}
        <div><a onClick={this.onStop}>STOP</a></div>
      </div>
    );
  }
}

export default App;
