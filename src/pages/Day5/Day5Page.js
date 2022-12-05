import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day5Page = () => {
  const [inputData, setInputData] = useState([]);
  const [startingStacks, setStartingStacks] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v));
    
  }, []);

  useEffect(() => {
    if(inputData.length > 0) {
      let emptyRow = 0;
      for(let i = 0; i < inputData.length; i++) {
        if(inputData[i] === '') {
          emptyRow = i;
        }
      }
      console.log('-- Empty Row --', emptyRow);
      // Get number of stacks from row emptyRow-1
      const numStacks = inputData[emptyRow - 1].split('   ').length;
      console.log('-- Number of Stacks --', numStacks);
      const stacks = [];
      for(let i = 0; i < numStacks; i++) {
        stacks.push([]);
      }

      const cleanedRows = [];
      for(let i = 0; i <= emptyRow - 2; i++) {
        const row = inputData[i];
        let newRow = row
          .replace(/     /g, '|')
          .replace(/   /g, '|')
          .replace(/ /g, '')
          .replace(/[\[\]]/g, "");
        // console.log('-- Base Row, New Row --', row, newRow);
        cleanedRows.push(newRow);
      }

      // console.log('-- cleanedRows --', cleanedRows);

      for(let i = cleanedRows.length - 1; i >= 0; i--) {
        let characters = cleanedRows[i].split('');
        // console.log('-- Characters --', characters);
        for(let ii = 0; ii < characters.length; ii++) {
          if(characters[ii] !== '|') {
            stacks[ii].push(characters[ii]);
          }
        }
      }

      // console.log('-- Stacks when Done --', JSON.stringify(stacks));
      setStartingStacks(stacks);

      // Create instructions
      const newInstructions = [];
      for(let i = emptyRow + 1; i < inputData.length; i++) {
        const instruction = inputData[i].split(' ');
        newInstructions.push({
          quantity: parseInt(instruction[1]),
          from: parseInt(instruction[3]),
          to: parseInt(instruction[5]),
        });
      }
      setInstructions(newInstructions);
    }
  }, [inputData]);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && instructions.length > 0 && startingStacks.length > 0) {
      const newStacks = [...startingStacks];
      // console.log('-- newStacks --', JSON.stringify(newStacks));
      for(let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        const fromStack = newStacks[instruction.from - 1];
        const toStack = newStacks[instruction.to - 1];
        for(let j = 0; j < instruction.quantity; j++) {
          toStack.push(fromStack.pop());
        }
      }
      // console.log('-- Ending Stack --', JSON.stringify(newStacks));

      let result = '';
      for(let i = 0; i < newStacks.length; i++) {
        result += newStacks[i][newStacks[i].length - 1];
      }
      setResult1('-- Ending Tops of Stacks -- ' + result);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [instructions, startingStacks]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && instructions.length > 0 && startingStacks.length > 0) {
      const newStacks = [...startingStacks];

      console.log('-- newStacks --', JSON.stringify(newStacks));
      for(let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        const fromStack = newStacks[instruction.from - 1];
        const toStack = newStacks[instruction.to - 1];
        const quantity = instruction.quantity;
        const itemsToPush = fromStack.splice(-quantity, quantity);
        // Add items to push to toStack
        for(let j = 0; j < itemsToPush.length; j++) {
          toStack.push(itemsToPush[j]);
        }
      }
      // console.log('-- Ending Stack --', JSON.stringify(newStacks));

      let result = '';
      for(let i = 0; i < newStacks.length; i++) {
        result += newStacks[i][newStacks[i].length - 1];
      }
      setResult2('-- Ending Tops of Stacks, Multiple-Picks -- ' + result);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [instructions, startingStacks]);

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
          Input Data {inputData.map((b) => `${b}, `)}
        </Typography>
      </Navigation>
    </div>
  );
}

export default Day5Page;