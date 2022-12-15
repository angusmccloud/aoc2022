import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day14Page = () => {
  const [inputData, setInputData] = useState([]);
  const [wallLocations, setWallLocations] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    if (inputData.length > 0) {
      const newLocations = [];
      inputData.forEach((input) => {
        const locationSet = input.split(' -> ');
        for(let i = 0; i < locationSet.length - 1; i++) {
          const [locationX, locationY] = locationSet[i].split(',');
          const [nextX, nextY] = locationSet[i + 1].split(',');
          if(locationX === nextX) {
            // Add locations along the X
            const x = parseInt(locationX, 10);
            const y1 = parseInt(locationY, 10);
            const y2 = parseInt(nextY, 10);
            const yMin = Math.min(y1, y2);
            const yMax = Math.max(y1, y2);
            for(let y = yMin; y <= yMax; y++) {
              newLocations.push({ x, y });
            }
          } else if(locationY === nextY) {
            // Add locations along the Y
            const y = parseInt(locationY, 10);
            const x1 = parseInt(locationX, 10);
            const x2 = parseInt(nextX, 10);
            const xMin = Math.min(x1, x2);
            const xMax = Math.max(x1, x2);
            for(let x = xMin; x <= xMax; x++) {
              newLocations.push({ x, y });
            }
          }
          // console.log('locationSet[i]', locationX, locationY, nextX, nextY);
        }
        // console.log('-- input --', input, locationSet);
        // console.log("-- newLocations --", newLocations);
      });

      setWallLocations(newLocations);
    }
  }, [inputData]);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && wallLocations.length > 0) {
      const filledLocations = [...wallLocations];
      const maxY = Math.max(...filledLocations.map((l) => l.y));
      console.log('-- Beginning Filled Locations --', filledLocations);
      
      let sandBags = 0;
      let y = 0;
      let x = 500;
      let landable = true;
      while(landable) {
        // Check if Y-1 space is empty
        const yPlus1 = filledLocations.find((l) => l.x === x && l.y === y + 1);
        const yPlus1XMinus1 = filledLocations.find((l) => l.x === x - 1 && l.y === y + 1);
        const yPlus1XPlus1 = filledLocations.find((l) => l.x === x + 1 && l.y === y + 1);
        // console.log(`-- Status at x: ${x} y: ${y} --`, yPlus1, yPlus1XMinus1, yPlus1XPlus1);
        if(y === maxY) {
          // No more ground, we've solved the puzzle??
          landable = false;
          break;
        } else if(!yPlus1) {
          // Move down
          y += 1;
          // continue;
        } else if (!yPlus1XMinus1) {
          // Move left and down
          x -= 1;
          y += 1;
          // continue;
        } else if (!yPlus1XPlus1) {
          // Move right and down
          x += 1;
          y += 1;
          // continue;
        } else {
          // Can't move any further, on to the next bag
          filledLocations.push({ x, y });
          // console.log(`-- Landing ${sandBags+1} at --`, x, y);
          sandBags++;
          // Reset for the next one;
          x = 500;
          y = 0;
          // continue;
        }
        // landable = false;
        // break;
      }
      setResult1(`Number of Bags: ${sandBags}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [wallLocations]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && wallLocations.length > 0) {      
      const filledLocations = [...wallLocations];
      let maxY = Math.max(...filledLocations.map((l) => l.y));
      const superFloor = maxY + 2;
      const superLeft = 500 - (superFloor * 2);
      const superRight = 500 + (superFloor * 2);
      console.log('-- Super Floor --', superFloor, superLeft, superRight);
      for(let i = superLeft; i <= superRight; i++) {
        filledLocations.push({ x: i, y: superFloor });
      }
      // And a new Max Y
      maxY = Math.max(...filledLocations.map((l) => l.y));
      console.log('-- Beginning Filled Locations --', filledLocations);
      console.log('-- Max Y --', maxY);
      
      let sandBags = 0;
      let y = 0;
      let x = 500;
      let landable = true;
      while(landable) {
        // if(sandBags > 100) {
        //   console.log('-- Breaking --', sandBags);
        //   break;
        // }
        // Check if Y-1 space is empty
        const yPlus1 = filledLocations.find((l) => l.x === x && l.y === y + 1);
        const yPlus1XMinus1 = filledLocations.find((l) => l.x === x - 1 && l.y === y + 1);
        const yPlus1XPlus1 = filledLocations.find((l) => l.x === x + 1 && l.y === y + 1);
        // console.log(`-- Status at x: ${x} y: ${y} --`, yPlus1, yPlus1XMinus1, yPlus1XPlus1);
        if(yPlus1 && yPlus1XMinus1 && yPlus1XPlus1 && y === 0 && x === 500) {
          // console.log('-- y === maxY, also x and sandbags --', y, maxY, x, sandBags);
          // console.log('-- All the checkers --', yPlus1, yPlus1XMinus1, yPlus1XPlus1);
          // Last bag lands at 500/0
          sandBags++;
          landable = false;
          break;
        } else if(!yPlus1) {
          // Move down
          y += 1;
          // continue;
        } else if (!yPlus1XMinus1) {
          // Move left and down
          x -= 1;
          y += 1;
          // continue;
        } else if (!yPlus1XPlus1) {
          // Move right and down
          x += 1;
          y += 1;
          // continue;
        } else {
          // Can't move any further, on to the next bag
          filledLocations.push({ x, y });
          // console.log(`-- Landing ${sandBags+1} at --`, x, y);
          sandBags++;
          // Reset for the next one;
          x = 500;
          y = 0;
          // continue;
        }
        // landable = false;
        // break;
      }
      setResult1(`Number of Bags, Super Floor!: ${sandBags}`);

    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [wallLocations]);

  return (
    <div>
      <Navigation pageName={`Day 14, Task ${taskNumber}`}>
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

export default Day14Page;
