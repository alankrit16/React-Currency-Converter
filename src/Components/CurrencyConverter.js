import React from 'react';
import Chart from './Chart';
import DropdownComponent from "./DropdownComponent"

const CurrencyConverter = () => {
    return <div class="row">
    <div class="column"> <DropdownComponent/></div>
    <div class="column"><Chart/></div>
  </div>
}

export default CurrencyConverter;