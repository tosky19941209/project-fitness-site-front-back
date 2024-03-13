import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


export default function SimpleLineChart({ history }) {

  const [resultCounter, setResultCounter] = useState([]);
  const [resultAccuracy, setResultAccuracy] = useState([])
  const [resultDurtime, setResultDurtime] = useState([])

  const today = new Date();
  const dayOfWeek = today.getDay();
  const date = []
  const month = []
  const year = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + i));
    date.push(futureDate.getDate())
    month.push(futureDate.getMonth() + 1)
    year.push(futureDate.getFullYear())
  }

  const hyear = []
  const hmonth = []
  const hdate = []
  const hcounter = []
  const haccuracy = []
  const hdurtime = []

  useEffect(() => {
    if (history === null) return
    history.map((item, index) => {
      hyear.push(Number(item._id.year))
      hmonth.push(Number(item._id.month))
      hdate.push(Number(item._id.date))
      hcounter.push(Number(item.averageCounter))
      haccuracy.push(Number(item.averageAccuracy))
      hdurtime.push(Number(item.averageDurtime))
      const counter = []
      const accuracy = []
      const durtime = []
      for (let i = 0; i < 7; i++) {
        let k = 0
        for (let j = 0; j < history.length; j++)
          if (year[i] === hyear[j] &&
            month[i] === hmonth[j] &&
            date[i] === hdate[j]) {
            counter[i] = hcounter[j]
            accuracy[i] = haccuracy[j]
            durtime[i] = hdurtime[j]
            k = 1
          }
        if (k === 0) {
          counter[i] = 0
          accuracy[i] = 0
          durtime[i] = 0
        }
      }
      setResultAccuracy(accuracy)
      setResultCounter(counter)
      setResultDurtime(durtime)
    })
  }, [history])



  const xLabels = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];

  return (
    <LineChart
      width={700}
      height={450}
      series={[
        { data: resultAccuracy, label: 'Accuracy' },
        { data: resultCounter, label: 'Counter' },
        { data: resultDurtime, label: 'Duration' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
