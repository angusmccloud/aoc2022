import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day8Page = () => {
  const [inputData, setInputData] = useState([]);
  const [dataGrid, setDataGrid] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    if(inputData.length > 0) {
      const grid = [];
      for (let i = 0; i < inputData.length; i++) {
        const row = inputData[i].split('');
        for(let ii = 0; ii < row.length; ii++) {
          grid.push({
            value: parseInt(row[ii]),
            row: i,
            column: ii,
          });
        }
      }
      setDataGrid(grid);
    }
  }, [inputData]);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && dataGrid.length > 0) {
      // console.log('-- Data Grid --', dataGrid);
      let visibleTreeCount = 0;
      const minColumn = 0;
      const minRow = 0;
      const maxColumn = Math.max(...dataGrid.map(o => o.column));
      const maxRow = Math.max(...dataGrid.map(o => o.row));

      for (let i = 0; i < dataGrid.length; i++) {
        const tree = dataGrid[i];
        const { row, column, value: treeHeight } = tree;
        if (row === minRow || row === maxRow || column === minColumn || column === maxColumn) {
          // It's on an edge
          visibleTreeCount++;
        } else {
          // Not on an edge, let's check the 4 directions
          const left = dataGrid.filter(t => t.row === row && t.column < column);
          const right = dataGrid.filter(t => t.row === row && t.column > column);
          const up = dataGrid.filter(t => t.column === column && t.row < row);
          const down = dataGrid.filter(t => t.column === column && t.row > row);
          const maxLeft = Math.max(...left.map(o => o.value));
          const maxRight = Math.max(...right.map(o => o.value));
          const maxUp = Math.max(...up.map(o => o.value));
          const maxDown = Math.max(...down.map(o => o.value));
          if(treeHeight > maxLeft || treeHeight > maxRight || treeHeight > maxUp || treeHeight > maxDown) {
            visibleTreeCount++;
          }
        }
      };

       setResult1(`Number of Visible Trees: ${visibleTreeCount}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dataGrid]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && dataGrid.length > 0) {
      // console.log('-- Data Grid --', dataGrid);
      let maxVisibleScore = 0;
      const minColumn = 0;
      const minRow = 0;
      const maxColumn = Math.max(...dataGrid.map(o => o.column));
      const maxRow = Math.max(...dataGrid.map(o => o.row));

      for (let i = 0; i < dataGrid.length; i++) {
        const tree = dataGrid[i];
        const { row, column, value: treeHeight } = tree;
        if (row === minRow || row === maxRow || column === minColumn || column === maxColumn) {
          // It's on an edge, one of the multipliers is 0, skip it
        } else {
          // Not on an edge, let's check the 4 directions
          const left = dataGrid.filter(t => t.row === row && t.column < column);
          const right = dataGrid.filter(t => t.row === row && t.column > column);
          const up = dataGrid.filter(t => t.column === column && t.row < row);
          const down = dataGrid.filter(t => t.column === column && t.row > row);

          let leftDistance = 0;
          for(let i = left.length - 1; i >= 0; i--) {
            const height = left[i].value;
            if(height < treeHeight) {
              leftDistance++
            } else {
              leftDistance++;
              break;
            }
          };

          let rightDistance = 0;
          for(let i = 0; i < right.length; i++) {
            const height = right[i].value;
            if(height < treeHeight) {
              rightDistance++
            } else {
              rightDistance++;
              break;
            }
          };

          let upDistance = 0;
          for(let i = up.length - 1; i >= 0; i--) {
            const height = up[i].value;
            if(height < treeHeight) {
              upDistance++
            } else {
              upDistance++;
              break;
            }
          };

          let downDistance = 0;
          for(let i = 0; i < down.length; i++) {
            const height = down[i].value;
            if(height < treeHeight) {
              downDistance++
            } else {
              downDistance++;
              break;
            }
          };
          const visibleScore = leftDistance * rightDistance * upDistance * downDistance;

          // console.log('-- Distances --', leftDistance, rightDistance, upDistance, downDistance, visibleScore);
          if(visibleScore > maxVisibleScore) { 
            maxVisibleScore = visibleScore
          }
        }
      };
      setResult2(`Max Visible Score: ${maxVisibleScore}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dataGrid]);

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
          Input Data {inputData.map((b) => `${b}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day8Page;