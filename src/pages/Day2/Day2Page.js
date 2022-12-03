import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day2Page = () => {
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
      let points = 0;
      const myPlayPoints = [
        { letter: 'X', points: 1 },
        { letter: 'Y', points: 2 },
        { letter: 'Z', points: 3 },
      ];
      for(let i = 0; i < inputData.length; i++) {
        const [opponentPlay, myPlay] = inputData[i].split(' ');
        const myPlayPoint = myPlayPoints.find(v => v.letter === myPlay);
        points += myPlayPoint.points;
        // CHeck for Ties
        if((opponentPlay === 'A' && myPlay === 'X') || (opponentPlay === 'B' && myPlay === 'Y') || (opponentPlay === 'C' && myPlay === 'Z')) {
          points += 3;
        }
        // Check for Wins
        if((opponentPlay === 'A' && myPlay === 'Y') || (opponentPlay === 'B' && myPlay === 'Z') || (opponentPlay === 'C' && myPlay === 'X')) {
          points += 6;
        }
      }
      setResult1(`Total Points: ${points}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && inputData.length > 0) {
      let points = 0;
      const resultPoints = [
        { letter: 'X', points: 0 },
        { letter: 'Y', points: 3 },
        { letter: 'Z', points: 6 },
      ];
      const letterPlayedPoints = [
        { letter: 'A', points: 1 },
        { letter: 'B', points: 2 },
        { letter: 'C', points: 3 },
      ];

      for(let i = 0; i < inputData.length; i++) {
        const [opponentPlay, targetResult] = inputData[i].split(' ');
        const resultPoint = resultPoints.find(v => v.letter === targetResult);
        points += resultPoint.points;

        let myLetter = '';
        if(targetResult === 'Y') { 
          myLetter = opponentPlay
        } else if(targetResult === 'Z') {
          myLetter = opponentPlay === 'A' ? 'B' : opponentPlay === 'B' ? 'C' : 'A';
        } else {
          myLetter = opponentPlay === 'A' ? 'C' : opponentPlay === 'B' ? 'A' : 'B';
        }
        const letterPlayedPoint = letterPlayedPoints.find(v => v.letter === myLetter);  
        points += letterPlayedPoint.points;
      }
      setResult2(`Total Points: ${points}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  return (
    <div>
      <Navigation pageName={`Day 2, Task ${taskNumber}`}>
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

export default Day2Page;