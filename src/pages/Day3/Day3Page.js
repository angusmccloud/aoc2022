import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day3Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  // Create array mapping letters to numbers (a-z = 1-26, A-Z = 27-52)
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetMap = {};
  for (let i = 0; i < alphabet.length; i++) {
    alphabetMap[alphabet[i]] = i + 1;
    alphabetMap[alphabet[i].toUpperCase()] = i + 27;
  }

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      console.log('-- STARTING ---');
      let sum = 0;
      for(let i = 0; i < inputData.length; i++) {
        const line = inputData[i];
        const len = line.length;
        const half = Math.floor(len / 2);
        // split line in half
        const firstHalf = line.slice(0, half);
        const secondHalf = line.slice(half);
        // Convert first half to array of mapped numbers
        const firstHalfMapped = firstHalf.split('').map(v => alphabetMap[v]);
        // Convert second half to array of mapped numbers
        const secondHalfMapped = secondHalf.split('').map(v => alphabetMap[v]);
        // See which items exist in both halves
        const intersection = firstHalfMapped.filter(v => secondHalfMapped.includes(v));
        // Reduce so an item is only counted once
        const uniqueIntersection = intersection.filter((v, i, a) => a.indexOf(v) === i);
        // Add values in array to the sum
        sum += uniqueIntersection.reduce((a, b) => a + b, 0);


        // console.log(line, firstHalf, secondHalf, firstHalfMapped, secondHalfMapped, intersection, sum);
        // console.log(uniqueIntersection);
      }

      setResult1(`Items that exist in both compartments: ${sum}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      console.log('-- STARTING ---');
      let sum = 0;
      // Loop through input data in batches of 3
      for(let i = 0; i < inputData.length; i += 3) {
        const line1 = inputData[i];
        const line2 = inputData[i + 1];
        const line3 = inputData[i + 2];
        // Convert each line to mapped numbers
        const line1Mapped = line1.split('').map(v => alphabetMap[v]);
        const line2Mapped = line2.split('').map(v => alphabetMap[v]);
        const line3Mapped = line3.split('').map(v => alphabetMap[v]);
        // Find number that exists in all 3 lines
        const intersection = line1Mapped.filter(v => line2Mapped.includes(v) && line3Mapped.includes(v));
        // Reduce so an item is only counted once
        const uniqueIntersection = intersection.filter((v, i, a) => a.indexOf(v) === i);
        // Add values in array to the sum
        sum += uniqueIntersection.reduce((a, b) => a + b, 0);
      }

      setResult2(`Sum of Badges: ${sum}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 3, Task ${taskNumber}`}>
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

export default Day3Page;