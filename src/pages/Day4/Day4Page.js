import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day4Page = () => {
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
      let numberFullyCovered = 0;
      inputData.forEach(v => {
        // Split the row by the comma
        const splitRow = v.split(',');
        // Split the first row by the dash
        const firstRow = splitRow[0].split('-');
        // Split the second row by the dash
        const secondRow = splitRow[1].split('-');

        // Check if firstRow contained in secondRow
        if (parseInt(firstRow[0]) >= parseInt(secondRow[0]) && parseInt(firstRow[1]) <= parseInt(secondRow[1])) {
          numberFullyCovered++;
          console.log("-- One contained in two --", splitRow);
        } else if (parseInt(secondRow[0]) >= parseInt(firstRow[0]) && parseInt(secondRow[1]) <= parseInt(firstRow[1])) {
          // Need this in an Else so we don't double-count things that are the same
          numberFullyCovered++;
          console.log("-- Two contained in one --", splitRow);
        }
      });
      
      
      setResult1(`Number of Fully Covered Zones: ${numberFullyCovered}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      let numberOverlap = 0;
      inputData.forEach(v => {
        // Split the row by the comma
        const splitRow = v.split(',');
        // Split the first row by the dash
        const firstRow = splitRow[0].split('-');
        // Split the second row by the dash
        const secondRow = splitRow[1].split('-');

        // Check if rows overlap
        if ((parseInt(firstRow[0]) <= parseInt(secondRow[1]) && parseInt(firstRow[1]) >= parseInt(secondRow[0])) || (parseInt(firstRow[1]) <= parseInt(secondRow[1]) && parseInt(firstRow[0]) >= parseInt(secondRow[0]))) {
          numberOverlap++;
          console.log("-- One contained in two --", splitRow);
        }
      });
      
      
      setResult1(`Number of Overlapping Zones: ${numberOverlap}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 4, Task ${taskNumber}`}>
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

export default Day4Page;