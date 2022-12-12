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
  }, [inputData]);
  // 6023

  const calcDistinctLocations = (directions, numberOfKnots) => {
    const tailLocations = ['0|0'];
    const locations = [];
    for(let i = 0; i < numberOfKnots; i++) {
      locations.push({x: 0, y: 0});
    };

    for(let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      for(let ii = 0; ii < direction.numberSteps; ii++) {
        // Move the Head first
        if(direction.direction === 'R') {
          locations[0].x += 1;
        } else if(direction.direction === 'L') {
          locations[0].x -= 1;
        } else if(direction.direction === 'U') {
          locations[0].y += 1;
        } else if(direction.direction === 'D') {
          locations[0].y -= 1;
        }

        // Then we loop through each knot in the tail
        for(let ii = 1; ii < numberOfKnots; ii++) {
          // Check if they're within 1 of each other
          if(Math.abs(locations[ii].x - locations[ii-1].x) <= 1 && Math.abs(locations[ii].y - locations[ii-1].y) <= 1) {
            // Tail doesn't move if within 1 of previous spot
            continue;
          }

          if(locations[ii].y === locations[0].y) {
            // We know same vertically, figure out if moving up or down
            if(locations[ii].x < locations[ii-1].x) {
              locations[ii].x += Math.abs(locations[ii].x - locations[ii-1].x) - 1;
            } else {
              locations[ii].x -= Math.abs(locations[ii].x - locations[ii-1].x) - 1;
            }
          } else if(locations[ii].x === locations[ii-1].x) {
            // We know same horizontally, figure out if moving left or right
            if(locations[ii].y < locations[ii-1].y) {
              locations[ii].y += Math.abs(locations[ii].y - locations[ii-1].y) - 1;
            } else {
              locations[ii].y -= Math.abs(locations[ii].y - locations[ii-1].y) - 1;
            }
          } else {
            // Otherwise we have to move the tail's X and Y
            if(Math.abs(locations[ii].x - locations[ii-1].x) >= 2) {
              locations[ii].y = locations[ii-1].y;
              if(locations[ii].x < locations[ii-1].x) {
                locations[ii].x += Math.abs(locations[ii].x - locations[ii-1].x) - 1;
              } else {
                locations[ii].x -= Math.abs(locations[ii].x - locations[ii-1].x) - 1;
              }
            } else if(Math.abs(locations[ii].y - locations[ii-1].y) >= 2) {
              locations[ii].x = locations[ii-1].x;
              if(locations[ii].y < locations[ii-1].y) {
                locations[ii].y += Math.abs(locations[ii].y - locations[ii-1].y) - 1;
              } else {
                locations[ii].y -= Math.abs(locations[ii].y - locations[ii-1].y) - 1;
              }
            }
          }

          if(ii === numberOfKnots - 1) {
            // Add the new location to the tail
            tailLocations.push(`${locations[ii].x}|${locations[ii].y}`);
          }
        }
      }
      console.log('-- End of loop --', locations, tailLocations);
    }

    console.log('-- tailLocations --', new Set(tailLocations));
    return new Set(tailLocations).size;
  }

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && directions.length > 0) {
      // console.log('-- directions --', directions);
      const numberOfSpots = calcDistinctLocations(directions, 2);
      setResult1(`Number of Spots covered by tail: ${numberOfSpots}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [directions]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && directions.length > 0) {
      // const numberOfSpots = calcDistinctLocations(directions, 10);
      // setResult2(`Number of Spots covered by tail: ${numberOfSpots}`);
      // Lower than 2575
      // CORRECT: 2533

    let body = new Array(10).fill(0).map(element => {
        return { x: 0, y: 0 };
    });

    let direction = {
        L: { x: -1, y:  0 },
        R: { x:  1, y:  0 },
        U: { x:  0, y: -1 },
        D: { x:  0, y:  1 }
    }

    let positions = new Set(['0,0']);

    directions.forEach(move => {
        for (let step = 0; step < move.numberSteps; step++) {
            body[0].x += direction[move.direction].x;
            body[0].y += direction[move.direction].y;

            for (let i = 1; i < body.length; i++) {
                let distX = body[i - 1].x - body[i].x;
                let distY = body[i - 1].y - body[i].y;

                if (Math.abs(distX) >= 2) {
                    body[i].x += Math.sign(distX);
                    if (Math.abs(distY) !== 0) body[i].y += Math.sign(distY);
                } else if (Math.abs(distY) >= 2) {
                    body[i].y += Math.sign(distY);
                    if (Math.abs(distX) !== 0) body[i].x += Math.sign(distX);
                }
            }

            positions.add(`${body[body.length - 1].x},${body[body.length - 1].y}`);
        }
    })

    // return positions.size;
    setResult2(`Number of Spots covered by tail: ${positions.size}`);
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

