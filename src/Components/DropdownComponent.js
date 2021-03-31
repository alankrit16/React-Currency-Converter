import React, { useEffect, useState } from 'react';
import {
    Select,
    FormControl,
    makeStyles
} from "@material-ui/core";
import endpoints from '../Utils/endpoints';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width:320,
      maxWidth:460
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DropdownComponent = (props) => {

    useEffect(()=>{
        async function fetchData(){
            const url = `${endpoints.currentPrice}`;
            const response = await fetch(url,{
                method:"GET"
            });
            const result = await response.json();
            if(response.ok){
                setState(ps=>({...ps,bpi:result.bpi}))
            }
        }
        fetchData();
    },[])

    const [state,setState] = useState({
        dropdown:"",
        bpi:"",
        bitCoinRate:"",
        description:""
    })

    const styles = useStyles();

    const handleChange = (e) => {
        setState(ps=>({...ps,
            dropdown:e.target.values,
            bitCoinRate:state.bpi[e.target.value].rate,
            description:state.bpi[e.target.value].description
        }))
        props.setDropdownValue(e.target.value);
    }
    return (
        <div style={{width:350}}>
            <div style={{width:350}}>
        <div style={{color:"#707371"}}>1 Bitcoin Equals</div>
        <FormControl variant="outlined" className={styles.formControl}>
        <Select
          native
          value={state.dropdown}
          onChange={(e)=>{handleChange(e)}}
        >
          <option value={""} disabled>Currency</option>  
          <option value={"USD"}>United States Dollar (USD)</option>
          <option value={"GBP"}>British Pound Sterling (GBP)</option>
          <option value={"EUR"}>Euro (EUR)</option>
        </Select>
        </FormControl>
        <div style={{marginLeft:"8px",fontWeight:"bold",fontSize:"2.2rem"}}>{`${state.bitCoinRate} ${state.description}`}</div>
    </div>
    </div>)
    
}

export default DropdownComponent;