import React, { useState, useEffect } from "react";
import './App.css';
import Area from './components/Area';
import ChartItem from './components/ChartItem';

function App() {
  const getRandomNumber = () => {
   return Math.floor(Math.random() * 100 + 1);
  }
  const [bardata, setBarData] = useState([
    {
      id: 1,
      title: "Facebook",
      color: "#4267B2",
      value: getRandomNumber(),
    },
    {
      id: 2,
      title: "Amozan",
      color: "#ff9900",
      value: getRandomNumber(),
    },
    {
      id: 3,
      title: "YouTube",
      color: "#FF0000",
      value: getRandomNumber(),
    },
    {
      id: 4,
      title: "Google",
      color: "#34a853",
      value: getRandomNumber(),
    },
    {
      id: 5,
      title: "Microsoft",
      color: "#F25022",
      value: getRandomNumber(),
    },
  ]);

  const findBigBarItem = (data) => {
    return data.sort((val1, val2) => val2.value - val1.value)[0].value;
   
  }

  const [bigBarData, setBigBarData] = useState(findBigBarItem(bardata));

  const setBarDataWithRandom = () => {  
    let data = [...bardata]
    data.forEach((item) => {
      item.value += getRandomNumber();
    });
    setBigBarData(findBigBarItem(data));
    setBarData(data)
    }
 
   useEffect(() => {
    let timer;
    timer = setInterval(() => {
     setBarDataWithRandom();
    } ,500);
   } , []);

   const renderBarItem = (item, index) => {
    let rate = item.value/bigBarData;
    rate = rate * (1000 - 40)
    const percent = (rate * 100) / 1040
    return (
      <ChartItem
        key={item.id}
        backgroundColor={item.color}
        width={percent + "%"}
        text={item.title}
        count={item.value}
        top={(index === 0 ? 10 : (index * 40) + 20) + "px"}
      />
    );
   }

  return (
    <>
      <div className="app-title">
        Firmaların Müşteri Sayıları
        </div>
        
        <Area data={bardata}>
          {bardata.map((item, index) => renderBarItem(item, index))}
        </Area>
    </>
  );
}

export default App;
