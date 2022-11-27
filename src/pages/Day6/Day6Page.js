import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day6Page = () => {
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
      const fish = [...inputData];
      for(let i = 0; i < 80; i++) {
        let newFish = 0;
        for(let ii = 0; ii < fish.length; ii++) {
          const num = fish[ii];
          if(num === 0) {
            fish[ii] = 6;
            newFish++;
          } else {
            fish[ii]--;
          }
        }
        for(let ii = 0; ii < newFish; ii++) {
          fish.push(8);
        }
      }
      setResult1(`There are ${fish.length} fish!`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      const days = 256;
      const fish = [...inputData];
      const fishCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(let i = 0; i < fish.length; i++) {
        fishCounts[fish[i]]++;
      }
      for(let i = 0; i < days; i++) {
        const resetFish = fishCounts[0];
        for (let ii = 0; ii < 8; ii++) {
          fishCounts[ii] = fishCounts[ii + 1]
        }
        fishCounts[8] = resetFish
        fishCounts[6] += resetFish
      }

      setResult2(`There are ${fishCounts.reduce((a,b) => a+b, 0)} fish!`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 6, Task ${taskNumber}`}>
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

export default Day6Page;