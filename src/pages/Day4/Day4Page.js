import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day4Page = () => {
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const [bingoBoards, setBingoBoards] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    const rawArray = data.split('\n').map(v => v.trim());
    setBingoNumbers(rawArray[0].split(',').map(v => parseInt(v)));
    const allBoards = [];
    let board = [];
    let rowNum = 0;
    for (let i = 2; i < rawArray.length; i++) {
      if (rawArray[i] !== '') {
        const cleanRow = rawArray[i].replace(/\s\s+/g, ' ');
        const numbers = cleanRow.split(' ');
        const row = [];
        for (let ii = 0; ii < numbers.length; ii++) {
          row.push(
            {
              rowNum,
              colNum: ii,
              number: parseInt(numbers[ii]),
              chosen: false
            }
          )
        }
        board.push(row);
        // console.log(rawArray[i]);
        rowNum++;
        if (i % 6 === 0) {
          rowNum = 0;
          allBoards.push(board);
          // console.log('-- End of Puzzle?!?! --', board);
          board = [];
        }
      }
    }
    setBingoBoards(allBoards);
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && bingoBoards.length > 0) {
      const newBoards = [...bingoBoards];
      let bingoFound = false;
      let winningBoard = [];
      for (let i = 0; i < bingoNumbers.length; i++) {
        const num = bingoNumbers[i];
        for (let ii = 0; ii < newBoards.length; ii++) {
          let changeFound = false;
          for (let iii = 0; iii < newBoards[ii].length; iii++) {
            for (let iiii = 0; iiii < newBoards[ii][iii].length; iiii++) {

              if (newBoards[ii][iii][iiii].number === num) {
                newBoards[ii][iii][iiii].chosen = true;
                break;
              }
            }
            if (changeFound) {
              break;
            }
          }
          if (changeFound) {
            break;
          }
        }
        // console.log(`-- Looped on ${num} --`, newBoards);
        // At the end of each number, check if there's a Bingo
        for (let ii = 0; ii < newBoards.length; ii++) {
          const board = newBoards[ii];
          // Check Rows
          for (let row = 0; row < board.length; row++) {
            if (board[row][0].chosen && board[row][1].chosen && board[row][2].chosen && board[row][3].chosen && board[row][4].chosen) {
              bingoFound = true;
              winningBoard = board;
              break;
            }
          }
          // Check Columns
          for (let col = 0; col < board.length; col++) {
            if (board[0][col].chosen && board[1][col].chosen && board[2][col].chosen && board[3][col].chosen && board[4][col].chosen) {
              bingoFound = true;
              winningBoard = board;
              break;
            }
          }
        }
        if (bingoFound) {
          // console.log('-- BINGO FOUND  --', i, winningBoard);
          let unmarkedSum = 0;
          for (let ii = 0; ii < winningBoard.length; ii++) {
            for (let iii = 0; iii < winningBoard[ii].length; iii++) {
              if (!winningBoard[ii][iii].chosen) {
                unmarkedSum += winningBoard[ii][iii].number;
              }
            }
          }
          const res = unmarkedSum * num;
          // console.log('-- WINNER --', unmarkedSum, num, res);
          setResult1(`Unmarked Sum: ${unmarkedSum} * Winning Number ${num} = ${res}`);
          break;
        }
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [bingoBoards]);


  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && bingoBoards.length > 0) {
      const winningBoards = [];
      const newBoards = bingoBoards.map((b, i) => {
        return {
          solved: false,
          numbers: b,
          boardNumber: i
        };
      });
      const solvedBoards = [];
      for (let i = 0; i < bingoNumbers.length; i++) {
        const num = bingoNumbers[i];
        const remainingBoards = newBoards.filter((b) => !solvedBoards.includes(b.boardNumber));
        for (let ii = 0; ii < remainingBoards.length; ii++) {
          let changeFound = false;
          for (let iii = 0; iii < remainingBoards[ii].numbers.length; iii++) {
            for (let iiii = 0; iiii < remainingBoards[ii].numbers[iii].length; iiii++) {
              // if(i === 0 && ii === 0 && iii === 0){
              //   console.log('-- Check First Row --', num, newBoards[ii].numbers[iii][iiii].number, newBoards.numbers[ii][iii]);
              // }

              if (remainingBoards[ii].numbers[iii][iiii].number === num) {
                remainingBoards[ii].numbers[iii][iiii].chosen = true;
                break;
              }
            }
            if (changeFound) {
              break;
            }
          }
          if (changeFound) {
            break;
          }
        }
        // console.log(`-- Looped on ${num} --`, remainingBoards);
        // At the end of each number, check for Bingos
        for (let ii = 0; ii < remainingBoards.length; ii++) {
          const board = remainingBoards[ii];
          // Check Rows
          for (let row = 0; row < board.numbers.length; row++) {
            if (board.numbers[row][0].chosen && board.numbers[row][1].chosen && board.numbers[row][2].chosen && board.numbers[row][3].chosen && board.numbers[row][4].chosen) {
              board.solved = true;
              winningBoards.push({
                board,
                lastNum: num
              });
              solvedBoards.push(board.boardNumber);
            }
          }
          // Check Columns
          for (let col = 0; col < board.numbers.length; col++) {
            if (board.numbers[0][col].chosen && board.numbers[1][col].chosen && board.numbers[2][col].chosen && board.numbers[3][col].chosen && board.numbers[4][col].chosen) {
              board.solved = true;
              winningBoards.push({
                board,
                lastNum: num
              });
              solvedBoards.push(board.boardNumber);
            }
          }
        }
      }
      // console.log('-- winningBoards --', winningBoards);
      if (winningBoards.length > 0) {
        const lastWinner = winningBoards[winningBoards.length - 1];
        // console.log('-- lastWinner --', lastWinner);
        if (lastWinner) {
          let unmarkedSum = 0;
          for (let ii = 0; ii < lastWinner.board.numbers.length; ii++) {
            for (let iii = 0; iii < lastWinner.board.numbers[ii].length; iii++) {
              if (!lastWinner.board.numbers[ii][iii].chosen) {
                unmarkedSum += lastWinner.board.numbers[ii][iii].number;
              }
            }
          }
          const res = unmarkedSum * lastWinner.lastNum;
          // console.log('-- Last Bingo! --', unmarkedSum, lastWinner.lastNum, res);
          setResult2(`Unmarked Sum: ${unmarkedSum} * Last Winning Number ${lastWinner.lastNum} = ${res}`);
        }
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [bingoBoards]);

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
          Bingo Numbers: {bingoNumbers.map((b) => `${b}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day4Page;

