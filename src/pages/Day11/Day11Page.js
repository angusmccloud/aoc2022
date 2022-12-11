import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day11Page = () => {
  const [inputData, setInputData] = useState([]);
  const [startingMonkeys, setStartingMonkeys] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    if(inputData.length > 0) {
      const monkeys = [];
      for (let i = 0; i < inputData.length; i += 7) {
        const operation = inputData[i+2].split('Operation: new = old ')[1];
        const operationType = operation.split(' ')[0];
        const operationValue = operation.split(' ')[1];
        monkeys.push({
          id: parseInt(inputData[i].split(' ')[1].split(':')[0]),
          items: inputData[i+1].split(': ')[1].split(', ').map(v => parseInt(v)),
          operation: {
            type: operationType,
            value: operationValue,
          },
          testDivisibleBy: parseInt(inputData[i+3].split('Test: divisible by ')[1]),
          ifTrueMonkey: parseInt(inputData[i+4].split('If true: throw to monkey ')[1]),
          ifFalseMonkey: parseInt(inputData[i+5].split('If false: throw to monkey ')[1]),
        });
      }
      setStartingMonkeys(monkeys);
      console.log('-- Starting Monkeys --', monkeys);
    }
  }, [inputData]);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && startingMonkeys.length > 0) {
      const newMonkeys = [...startingMonkeys];
      const timesInspecting = [];
      for(let i = 0; i < newMonkeys.length; i++) {
        timesInspecting.push(0);
      }

      const numRuns = 20;
      for(let i = 0; i < numRuns; i++) {
        for (let m = 0; m < startingMonkeys.length; m++) {
          const monkey = newMonkeys[m];
          const items = monkey.items;
          while(items.length > 0) {
            timesInspecting[m]++;
            let item = items.shift();
            // First we increase worry level according to rule
            if(monkey.operation.type === '*') {
              if(monkey.operation.value === 'old') {
                item = item * item;
              } else {
                item = item * parseInt(monkey.operation.value);
              }
            } else if(monkey.operation.type === '+') {
              if(monkey.operation.value === 'old') {
                item = item + item;
              } else {
                item = item + parseInt(monkey.operation.value);
              }
            }

            // Inspection is done, divide by 3
            item = Math.floor((item / 3));

            // Does it pass the test?
            const passesTest = item % monkey.testDivisibleBy === 0;

            // Now throw to a different monkey
            if(passesTest) {
              newMonkeys[monkey.ifTrueMonkey].items.push(item);
            } else {
              newMonkeys[monkey.ifFalseMonkey].items.push(item);
            }
          }
        }
      }
      timesInspecting.sort((a, b) => b - a);
      const monkeyBusiness = timesInspecting[0] * timesInspecting[1];
      setResult1(`Monkey Business: ${monkeyBusiness}`);
      // console.log('-- New Monkeys --', newMonkeys);
      // console.log('-- Times Inspecting --', timesInspecting);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [startingMonkeys]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && startingMonkeys.length > 0) {
      
      const newMonkeys = [...startingMonkeys];
      const superModulo = startingMonkeys.reduce((a,b) => a * b.testDivisibleBy, 1);
      console.log('-- superModulo --', superModulo);
      const timesInspecting = [];
      for(let i = 0; i < newMonkeys.length; i++) {
        timesInspecting.push(0);
      }

      const numRuns = 10000;
      for(let i = 0; i < numRuns; i++) {
        for (let m = 0; m < startingMonkeys.length; m++) {
          const monkey = newMonkeys[m];
          const items = monkey.items;
          while(items.length > 0) {
            timesInspecting[m]++;
            let item = items.shift();
            // First we increase worry level according to rule
            if(monkey.operation.type === '*') {
              if(monkey.operation.value === 'old') {
                item = item * item;
              } else {
                item = item * parseInt(monkey.operation.value);
              }
            } else if(monkey.operation.type === '+') {
              if(monkey.operation.value === 'old') {
                item = item + item;
              } else {
                item = item + parseInt(monkey.operation.value);
              }
            }

            // Do some magic?!?!
            item = item % superModulo;

            // Does it pass the test?
            const passesTest = item % monkey.testDivisibleBy === 0;

            // Now throw to a different monkey
            if(passesTest) {
              newMonkeys[monkey.ifTrueMonkey].items.push(item);
            } else {
              newMonkeys[monkey.ifFalseMonkey].items.push(item);
            }
          }
        }
      }
      timesInspecting.sort((a, b) => b - a);
      const monkeyBusiness = timesInspecting[0] * timesInspecting[1];
      setResult2(`Monkey Business, Very Worried: ${monkeyBusiness}`);
      // console.log('-- New Monkeys --', newMonkeys);
      // console.log('-- Times Inspecting --', timesInspecting);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [startingMonkeys]);

  return (
    <div>
      <Navigation pageName={`Day 11, Task ${taskNumber}`}>
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

export default Day11Page;

