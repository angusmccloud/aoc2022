import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day9Page = () => {
  const [inputData, setInputData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    if(inputData.length > 0) {
      const newDirections = [];
      for(let i = 0; i < inputData.length; i++) {
        const row = inputData[i].split(' ');
        newDirections.push({
          direction: row[0],
          numberSteps: parseInt(row[1]),
        });
      };
      setDirections(newDirections);
    }
  }, [inputData])

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && directions.length > 0) {
      console.log('-- directions --', directions);
      const tailLocations = ['0|0'];
      let headLocation = {x: 0, y: 0};
      let tailLocation = {x: 0, y: 0};
      for(let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        for(let ii = 0; ii < direction.numberSteps; ii++) {
          if(direction.direction === 'R') {
            headLocation.x += 1;
          } else if(direction.direction === 'L') {
            headLocation.x -= 1;
          } else if(direction.direction === 'U') {
            headLocation.y += 1;
          } else if(direction.direction === 'D') {
            headLocation.y -= 1;
          }
          // Check if they're within 1 of each other
          if(Math.abs(tailLocation.x - headLocation.x) <= 1 && Math.abs(tailLocation.y - headLocation.y) <= 1) {
            // Tail doesn't move if within 1 of head
            // console.log('-- No Movement --', headLocation, tailLocation);
            continue;
          }

          if(tailLocation.y === headLocation.y) {
            // We know same vertically, figure out if moving up or down
            if(tailLocation.x < headLocation.x) {
              tailLocation.x += 1;
            } else {
              tailLocation.x -= 1;
            }
            // console.log('-- Moved X --', headLocation, tailLocation);
            tailLocations.push(`${tailLocation.x}|${tailLocation.y}`);
            continue;
          }
          if(tailLocation.x === headLocation.x) {
            // We know same horizontally, figure out if moving up or down
            if(tailLocation.y < headLocation.y) {
              tailLocation.y += 1;
            } else {
              tailLocation.y -= 1;
            }
            // console.log('-- Moved Y --', headLocation, tailLocation);
            tailLocations.push(`${tailLocation.x}|${tailLocation.y}`);
            continue;
          }

          // Otherwise we have to move the tail's X and Y
          if(tailLocation.x < headLocation.x) {
            tailLocation.x += 1;
          } else {
            tailLocation.x -= 1;
          }
          if(tailLocation.y < headLocation.y) {
            tailLocation.y += 1;
          } else {
            tailLocation.y -= 1;
          }
          // console.log('-- Moved Both --', headLocation, tailLocation);
          tailLocations.push(`${tailLocation.x}|${tailLocation.y}`);
        }
      }
      console.log("-- tailLocations --", tailLocations);
      const numberOfSpots = new Set(tailLocations).size;
      setResult1(`Number of Spots covered by tail: ${numberOfSpots}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [directions]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && directions.length > 0) {
      // setResult2(`Number of Summed Depth Increases: ${increasesCount}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [directions]);

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

export default Day9Page;

