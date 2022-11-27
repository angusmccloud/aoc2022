import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day8Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    const rows = data.split('\n');
    const result = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].split(' | ');
      const input = row[0].split(' ');
      const output = row[1].split(' ');
      const sortedOutput = output.map((w) => w.split('').sort().join(''));
      result.push({
        input,
        output,
        sortedOutput
      });
    }
    setInputData(result);
    console.log(result);
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      let matches = 0;
      for(let i = 0; i < inputData.length; i++) {
        for(let ii = 0; ii < inputData[i].sortedOutput.length; ii++) {
          if(inputData[i].sortedOutput[ii].length === 2 || inputData[i].sortedOutput[ii].length === 3 || inputData[i].sortedOutput[ii].length === 4 || inputData[i].sortedOutput[ii].length === 7) {
            matches++;
          }
        }
      }
      setResult1(`Number of Matches: ${matches}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      setResult2('...Sure looks like I haven\'t done this one yet...');

      // setResult2(`Number of Summed Depth Increases: ${increasesCount}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 8, Task ${taskNumber}`}>
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
          Input Data {inputData.map((b) => `Input: ${b.input} and Output:n ${b.output}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day8Page;
