import React, { useState, useEffect } from 'react'
import { Bubble } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';

import axios from 'axios';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function BubbleChart () {


const [datas, setDatas] = useState([]);
const [value, setValue] =useState([]);

useEffect( () => {

  async function  fetchData(){
  var response = await axios.get(
      'https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77'
  );
  console.log(response.data);
  var data = response.data;
  data.map((ele) => {
    // console.log(ele.title, ele.salary)

    setDatas((prev) => [...prev,ele.title]);
    setValue((prev) => [...prev,ele.salary])
   
  })
}
fetchData()

  
}, [])

  const data = {
    labels: datas,
    datasets: [
      {
        label: 'Salary of Employee',
        data: value,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  const options = {
    title: {
      display: true,
      text: 'Bubble Chart'
    },
    scales: {
        y: {
          beginAtZero: true,
        },
      },
  }


  return(
  <Bubble data={data} options={options} /> 

  ) 
}

export default BubbleChart;