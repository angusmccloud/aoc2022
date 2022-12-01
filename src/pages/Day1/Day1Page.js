import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day1Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      let maxElf = 0;
      let currentElfWeight = 0;
      inputData.forEach((value, index) => {
        if(value.length > 0) { 
          currentElfWeight += parseInt(value);
          if (currentElfWeight > maxElf) {
            maxElf = currentElfWeight;
          }
        } else {
          currentElfWeight = 0;
        }
      });
      setResult1(`Heaviest Elf: ${maxElf}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      const elves = [];
      let currentElfWeight = 0;
      inputData.forEach((value, index) => {
        if(value.length > 0) { 
          currentElfWeight += parseInt(value);
        } else {
          elves.push(currentElfWeight);
          currentElfWeight = 0;
        }

        if(index === inputData.length - 1) {
          elves.push(currentElfWeight);
        }
      });
      const elvesSorted = elves.sort((a, b) => b - a);    
      const topThreeElves = elvesSorted[0] + elvesSorted[1] + elvesSorted[2];
      setResult1(`Top 3 Elves: ${topThreeElves}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 9, Task ${taskNumber}`}>
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

export default Day1Page;