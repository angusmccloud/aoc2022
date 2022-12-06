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

  const checkIfDuplicateExists = (arr) => {
    return new Set(arr).size !== arr.length
  }

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      const lettersList = inputData[0].split('');
      const solveLength = 4;
      for(let i = solveLength - 1; i < lettersList.length; i++) {
        const checkArray = lettersList.slice(i-solveLength+1, i+1);
        const hasDuplicates = checkIfDuplicateExists(checkArray);
        if(!hasDuplicates) {
          setResult1(`First unique Letter: ${lettersList[i]} ${i+1}`);
          break;
        }
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result1 === '' && inputData.length > 0) {
      const lettersList = inputData[0].split('');
      const solveLength = 14;
      for(let i = solveLength - 1; i < lettersList.length; i++) {
        const checkArray = lettersList.slice(i-solveLength+1, i+1);
        const hasDuplicates = checkIfDuplicateExists(checkArray);
        if(!hasDuplicates) {
          setResult1(`First unique Letter: ${lettersList[i]} ${i+1}`);
          break;
        }
      }
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