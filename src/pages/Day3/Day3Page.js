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

  useEffect(() => {
    const rawData = data.split('\n').map(v => v.trim());
    const res = [];
    for(let i = 0; i < rawData.length; i++) {
      const row = [];
      for(let ii = 0; ii < rawData[i].length; ii++) {
        row.push(rawData[i].substr(ii, 1));
      }
      res.push(row);
    }
    setInputData(res);
  }, []);

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && inputData.length > 0) {
      let gamma = '';
      let epsilon = '';
      for(let i = 0; i < inputData[0].length; i++) {
        const count0 = inputData.filter((d) => d[i] === '0').length;
        const count1 = inputData.filter((d) => d[i] === '1').length;
        if(count0 > count1) {
          gamma = `${gamma}0`;
          epsilon = `${epsilon}1`;
        } else {
          gamma = `${gamma}1`;
          epsilon = `${epsilon}0`;
        }
      } 

      const res = parseInt(gamma, 2) * parseInt(epsilon, 2);
      setResult1(`Gamma: ${gamma} (${parseInt(gamma, 2)}), Epsilon: ${epsilon} (${parseInt(epsilon, 2)}), Result of ${res}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inputData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result1 === '' && inputData.length > 0) {
      let lifeSupport = [...inputData];
      let co2Rating = [...inputData];
      for(let i = 0; i < inputData[0].length; i++) {
        if(lifeSupport.length > 1) {
          const count0 = lifeSupport.filter((d) => d[i] === '0');
          const count1 = lifeSupport.filter((d) => d[i] === '1');
          if(count1.length >= count0.length) {
            lifeSupport = [...count1];
          } else {
            lifeSupport = [...count0];
          }
        }

        if(co2Rating.length > 1) {
          const count0 = co2Rating.filter((d) => d[i] === '0');
          const count1 = co2Rating.filter((d) => d[i] === '1');
          if(count0.length <= count1.length) {
            co2Rating = [...count0];
          } else {
            co2Rating = [...count1];
          }
        }
      } 

      let lifeSupportBinary = lifeSupport[0].join('');
      let co2Binary = co2Rating[0].join('');

      const res = parseInt(lifeSupportBinary, 2) * parseInt(co2Binary, 2);
      setResult2(`Life Support: ${lifeSupportBinary} (${parseInt(lifeSupportBinary, 2)}), CO2 Rating: ${co2Binary} (${parseInt(co2Binary, 2)}), Result of ${res}`);
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

