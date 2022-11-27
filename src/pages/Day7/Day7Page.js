import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day7Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split(',').map(v => parseInt(v.trim())));
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      const min = Math.min(...inputData);
      const max = Math.max(...inputData);
      let minFuel;
      let minPosition;
      for(let target = min; target <= max; target++) {
        let fuelNeeded = 0;
        for(let i = 0; i < inputData.length; i++) {
          fuelNeeded += Math.abs(inputData[i] - target);
        }
        if(!minFuel || fuelNeeded < minFuel) {
          minFuel = fuelNeeded;
          minPosition = target;
        }
      }
      // console.log('-- Min Fuel --', minFuel);
      // console.log('-- Min Position --', minPosition);
      // console.log('-- min, max --', min, max);
      setResult1(`Ideal Position: ${minPosition}, Fuel Burned: ${minFuel}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      const min = Math.min(...inputData);
      const max = Math.max(...inputData);
      const diffFuelBurns = [];
      for(let i = 0; i <= max; i++) {
        let diff = 0;
        for(let ii = 0; ii <= i; ii++) {
          diff += ii;
        }
        diffFuelBurns.push(diff);
      }
      // console.log('-- diffFuelBurns --', diffFuelBurns);
      let minFuel;
      let minPosition;
      for(let target = min; target <= max; target++) {
        let fuelNeeded = 0;
        for(let i = 0; i < inputData.length; i++) {
          fuelNeeded += diffFuelBurns[Math.abs(inputData[i] - target)];
        }
        if(!minFuel || fuelNeeded < minFuel) {
          minFuel = fuelNeeded;
          minPosition = target;
        }
      }
      // console.log('-- Min Fuel --', minFuel);
      // console.log('-- Min Position --', minPosition);
      // console.log('-- min, max --', min, max);
      setResult1(`Ideal Position: ${minPosition}, Fuel Burned: ${minFuel}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 7, Task ${taskNumber}`}>
        {result1 !== '' && (
          <Typography variant='h5'>
            Result 1: {result1}
          </Typography>
        )}
        {result2 !== '' && (
          <Typography variant='h5'>
            Result 2: {result2}
          </Typography>
        )}
        <Typography>
          Input Data {inputData.map((b) => `${b}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day7Page;

