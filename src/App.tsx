/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import './App.scss';
import { ErrorButton } from './components/ErrorButton/ErrorButton';

class App extends Component {
  render() {
    return (
      <>
        <h1>Pokemon</h1>
        <ErrorButton />
      </>
    );
  }
}

export default App;
