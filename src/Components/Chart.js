import React, { useEffect, useState } from 'react';
import {Line} from "react-chartjs-2";
import endpoints from '../Utils/endpoints';

const Chart = (props) => {

    const [state,setState] = useState({
        label:[],
        values:[],
        error:""
    })

    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    }

    useEffect(()=>{
        async function getTrend(){
            let end = new Date();
            let start = new Date();
            start.setDate(start.getDate()-60);
            start = formatDate(start)
            end = formatDate(end);
            const url = `${endpoints.chartData}currency=${props.dropdownValue}&start=${start}&end=${end}`;
            const response = await fetch(url,{
                method:"GET"
            });

            const result = await response.json();
            if(response.ok){
            const bpi = result.bpi;
            const destructure = Object.entries(bpi);
            const label = []
            const value = []
            destructure.forEach(ele=>{
                label.push(ele[0]);
                value.push(ele[1])
            })
            setState(ps=>({...ps,label:label,values:value,error:""}))
            }else{
                setState(ps=>({...ps,error:"Something Went Wrong :("}))
            }
        }
        getTrend()
    },[props.dropdownValue])

    const options = {
        responsive: true,
        scales:{
            xAxes:[{
                ticks:{
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 11,
                    maxRotation: 0,
                    minRottaion: 0
                }
            }],
            yAxes:[{
                gridLines:{
                    display: false
                }
            }]
        },
        tooltips:{
            mode:'index'
        }
    }


    return <div>
        {state.error===""?<Line
        height={400}
        width={800}
        data={{
            labels:state.label,
            datasets:[
                {
                    data:state.values,
                    label: "Last 60 days trend ("+props.dropdownValue+")",
                    borderColor:"rgb(52, 168, 83)",
                    backgroundColor: "#e9ffdb"
                }
            ]
        }}
        options={options}
        />:<h1>{state.error}</h1>}
    </div>
}

export default Chart;