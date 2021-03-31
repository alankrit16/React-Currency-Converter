import React, { useState } from 'react';
import Chart from './Chart';
import DropdownComponent from "./DropdownComponent"

const CurrencyConverter = () => {

    const [dropdownValue,setDropdownValue] = useState("")

    const passValue = (fetchData) => {
        setDropdownValue(fetchData)
    }

    return <div class="row">
    <div class="column"> <DropdownComponent setDropdownValue={passValue}/></div>
    {dropdownValue!==""?<div class="column"><Chart dropdownValue={dropdownValue} /></div>:null}
  </div>
}

export default CurrencyConverter;