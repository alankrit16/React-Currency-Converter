import React, { useEffect, useState } from 'react';
import {Line} from "react-chartjs-2";

const Chart = (props) => {

    const [state,setState] = useState({
        label:[],
        values:[],
    })

    useEffect(()=>{



        const bpi = {"2013-09-01":97.0904,"2013-09-02":96.4906,"2013-09-03":96.8493,"2013-09-04":91.3508,"2013-09-05":91.8866,"2013-09-06":88.3304,"2013-09-07":90.3363,"2013-09-08":88.4926,"2013-09-09":90.6332,"2013-09-10":91.5685};
        const destructure = Object.entries(bpi);
        const label = []
        const value = []
        destructure.forEach(ele=>{
            label.push(ele[0]);
            value.push(ele[1])
        })
        setState(ps=>({...ps,label:label,values:value}))
    },[props.dropdownValue])




    return <div>
        {props.dropdownValue}
        <Line
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
        />
    </div>
}

export default Chart;