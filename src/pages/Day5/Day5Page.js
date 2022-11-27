import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day5Page = () => {
  const [inputData, setInputData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    const rawArray = data.split('\n').map(v => v.trim());
    const directions = rawArray.map((r) => {
      const row = r.split(' -> ');
      const firstSplit = row[0].split(',');
      const secondSplit = row[1].split(',');
      return {
        x1: parseInt(firstSplit[0]),
        y1: parseInt(firstSplit[1]),
        x2: parseInt(secondSplit[0]),
        y2: parseInt(secondSplit[1]),
      }
    });
    setInputData(directions);
  }, []);

  const generateGrid = () => {
    const grid = [];
    const xSort1 = [...inputData];
    const xSort2 = [...inputData];
    const ySort1 = [...inputData];
    const ySort2 = [...inputData];
    xSort1.sort((a, b) => a.x1 - b.x1);
    xSort2.sort((a, b) => a.x2 - b.x2);
    ySort1.sort((a, b) => a.y1 - b.y1);
    ySort2.sort((a, b) => a.y2 - b.y2);
    const xMax = xSort1[xSort1.length - 1].x1 > xSort2[xSort2.length - 1].x2 ? xSort1[xSort1.length - 1].x1 : xSort2[xSort2.length - 1].x2;
    const yMax = ySort1[ySort1.length - 1].y1 > ySort2[ySort2.length - 1].y2 ? ySort1[ySort1.length - 1].y1 : ySort2[ySort2.length - 1].y2;
    for(let x = 0; x <= xMax; x++) {
      const xRow = [];
      for(let y = 0; y <= yMax; y++) {
        xRow.push(0);
      }
      grid.push(xRow);
    }
    return grid;
  }

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      const grid = generateGrid();
      // console.log('-- Empty Grid --', grid);
      for(let i = 0; i < inputData.length; i++) {
        const { x1, x2, y1, y2 } = inputData[i];
        if( x1 === x2 ) {
          const yStart = y1 < y2 ? y1 : y2;
          const yEnd = y1 < y2 ? y2 : y1;
          for(let ii = yStart; ii <= yEnd; ii++) {
            grid[ii][x1]++;
          }
        } else if ( y1 === y2 ) {
          const xStart = x1 < x2 ? x1 : x2;
          const xEnd = x1 < x2 ? x2 : x1;
          for(let ii = xStart; ii <= xEnd; ii++) {
            grid[y1][ii]++;
          }
        }
      }
      console.log('-- Grid after Changes --', grid);
      let overlap = 0;
      for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
          if(grid[x][y] >= 2) {
            overlap++;
          }
        }
      }
      setResult1(`Overlapping Grid Ponts : ${overlap}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);


  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      const grid = generateGrid();
      // console.log('-- Empty Grid --', grid);
      for(let i = 0; i < inputData.length; i++) {
        const { x1, x2, y1, y2 } = inputData[i];
        if( x1 === x2 ) {
          const yStart = y1 < y2 ? y1 : y2;
          const yEnd = y1 < y2 ? y2 : y1;
          for(let ii = yStart; ii <= yEnd; ii++) {
            grid[ii][x1]++;
          }
        } else if ( y1 === y2 ) {
          const xStart = x1 < x2 ? x1 : x2;
          const xEnd = x1 < x2 ? x2 : x1;
          for(let ii = xStart; ii <= xEnd; ii++) {
            grid[y1][ii]++;
          }
        } else if ( Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
          const length = Math.abs(x1 - x2) + 1;
          const xMultiplier = x1 < x2 ? 1 : -1;
          const yMultiplier = y1 < y2 ? 1 : -1;
          for(let ii = 0; ii < length; ii ++) {
            grid[y1 + (ii * yMultiplier)][x1 + (ii * xMultiplier)]++;
          }
        }
      }
      console.log('-- Grid after Changes --', grid);
      let overlap = 0;
      for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
          if(grid[x][y] >= 2) {
            overlap++;
          }
        }
      }
      setResult2(`Overlapping Grid Ponts : ${overlap}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 5, Task ${taskNumber}`}>
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
          Input Data: {inputData.map((b) => `${b.x1},${b.y1} --> ${b.x2},${b.y2}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day5Page;

