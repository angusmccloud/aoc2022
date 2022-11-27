import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day2Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    const rawData = data.split('\n').map(v => v.trim());
    const formatted = rawData.map((d) => {
      const split = d.split(' ');
      return{
        direction: split[0],
        value: parseInt(split[1])
      }
    });
    setInputData(formatted);
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      let horizontal = 0;
      let depth = 0;
      for(let i = 0; i < inputData.length; i++) {
        const row = inputData[i];
        if(row.direction === 'forward') {
          horizontal += row.value;
        } else if(row.direction === 'up') {
          depth -= row.value;
        } else if(row.direction === 'down') {
          depth += row.value;
        }
      }
      const res = horizontal * depth;
      setResult1(`Horizontal Movement: ${horizontal}, Depth of: ${depth}, Result of ${res}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      let horizontal = 0;
      let depth = 0;
      let aim = 0;
      for(let i = 0; i < inputData.length; i++) {
        const row = inputData[i];
        if(row.direction === 'forward') {
          horizontal += row.value;
          depth += (aim * row.value);
        } else if(row.direction === 'up') {
          aim -= row.value;
        } else if(row.direction === 'down') {
          aim += row.value;
        }
      }
      const res = horizontal * depth;
      setResult2(`Horizontal Movement: ${horizontal}, Depth of: ${depth}, Aim of: ${aim}, Result of ${res}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 2, Task ${taskNumber}`}>
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
          Input Data {inputData.map((b) => `${b.direction} ${b.value}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day2Page;

