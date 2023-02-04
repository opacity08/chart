import React from 'react';
import DatePicker from './DatePicker';
import { PickerData } from '../Data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperature',
    },
  },
};

export default function LineChart() {    

  const [datePick, setDatePick] = React.useState({

    datePickerFrom: 1,
    datePickerTo: 12,
    curentDateMin: "2022-01",
    curentDateMax: "2022-12"

  });

  function dateChange(e) {    

    if (e.target.id === "from") {
      setDatePick(prevDate => ({
        ...prevDate,
        datePickerFrom: e.target.value.split('-')[1],
        curentDateMin: e.target.value
      }))
    } else {
      setDatePick(prevDate => ({
        ...prevDate,
        datePickerTo: e.target.value.split('-')[1],
        curentDateMax: e.target.value        
      }))
    }

    
  }

  const dataPickers = PickerData.map(item => {

    return <DatePicker handleChange={dateChange}
            key={item.id} 
            curentDateMin = {item.id === "from" ? item.min : datePick.curentDateMin}
            curentDateMax = {item.id === "to" ? item.max : datePick.curentDateMax}
            {...item}
            />    

  })

  const mounth = ['January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'];

  const dataGrad = [-15, -25, -5, 0, 15, 20, 27, 18, 5, -15, 0, -5];

  const labels = (fromMounth, toMounth, arrayIn) => {

    return arrayIn.filter(function(item, index){

      return (index > fromMounth-2 && index < toMounth);

    });

  }

  const data = {
    labels: labels(datePick.datePickerFrom, datePick.datePickerTo, mounth),
    datasets: [
      {
        label: 'Degrees',
        data: labels(datePick.datePickerFrom, datePick.datePickerTo, dataGrad),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  
  return(

    <div className="row">
      <div className="datepicker">
          {dataPickers}                 
      </div>
      <div className="chart" style={{maxHeight: "800px", maxWidth: "600px"}}>
        <Line
          options={options} data={data}
        />
      </div>
    </div>

  )

}