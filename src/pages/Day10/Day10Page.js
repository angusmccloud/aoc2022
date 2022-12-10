import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography, Box } from '@material-ui/core';
import { Navigation } from '../../containers';
import data from './input';

const Day10Page = () => {
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
      const cycleLog = [];
      let cycle = 1;
      let xRegister = 1;
      for(let i = 0; i < inputData.length; i++) {
        const line = inputData[i];
        const instruction = line.split(' ');
        if(instruction.length === 1) {
          // Noop Line Just Cycle
          cycle++;
          if(cycle === 20 || (cycle - 20) % 40 === 0) {
            cycleLog.push({cycle, xRegister});
          }
        } else {
          cycle++;
          if(cycle === 20 || (cycle - 20) % 40 === 0) {
            cycleLog.push({cycle, xRegister});
          }
          xRegister += parseInt(instruction[1]);
          cycle++;
          if(cycle === 20 || (cycle - 20) % 40 === 0) {
            cycleLog.push({cycle, xRegister});
          }
        }
      }
      let value = 0;
      for (let i = 0; i < cycleLog.length; i++) {
        const cycle = cycleLog[i];
        value += cycle.xRegister * cycle.cycle;
      }
      setResult1(`Signal Strength: ${value}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      const cycleLog = [];
      let cycle = 1;
      let xRegister = 1;
      cycleLog.push({cycle, xRegister});
      for(let i = 0; i < inputData.length; i++) {
        const line = inputData[i];
        const instruction = line.split(' ');
        if(instruction.length === 1) {
          // Noop Line Just Cycle
          cycle++;
          cycleLog.push({cycle, xRegister});
        } else {
          cycle++;
          cycleLog.push({cycle, xRegister});
          xRegister += parseInt(instruction[1]);
          cycle++;
          cycleLog.push({cycle, xRegister});
        }
      }
      console.log('-- cycleLog --', cycleLog);

      // let result = '';
      const result = ['', '', '', '', '', ''];
      const numRows = 6;
      for (let row = 0; row < numRows; row++) {
        console.log('-- row --', row);
        for(let column = 1; column <= 40; column++) {
          const cycle = cycleLog[(row * 40) + column - 1];
          if(Math.abs(column - cycle.xRegister) <= 2) {
            result[row] += '#';
          } else {
            result[row] += '.';
          }
        }
      }
      setResult2(result);

    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 10, Task ${taskNumber}`}>
        {result1 !== '' && (
          <Typography variant='h5'>
            Result 1: {result1}
          </Typography>
        )}
        {result2 !== '' && (
          <>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[0]}
            </Box>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[1]}
            </Box>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[2]}
            </Box>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[3]}
            </Box>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[4]}
            </Box>
            <Box fontFamily="Monospace" letterSpacing={10}>
              {result2[5]}
            </Box>
          </>
        )}
        {/* <Typography>
          Input Data {inputData.map((b) => `${b}, `)}
        </Typography> */}
      </Navigation>
    </div>
  );
}

export default Day10Page;

