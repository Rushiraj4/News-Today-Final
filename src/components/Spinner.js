import React, { Component } from 'react';
import loading from '../loading.gif' // Ensure this path is correct

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt='loading' /> 
      </div>
    );
  }
}

export default Spinner;
