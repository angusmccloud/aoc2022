import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Navigation } from '../../containers';
import data from './input';

const Day7Page = () => {
  const [inputData, setInputData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const { taskNumber } = useParams();

  useEffect(() => {
    setInputData(data.split('\n').map(v => v.trim()));
  }, []);

  useEffect(() => {
    if(inputData.length > 0) {
      // Parse Data
      const newParsedData = [];
      let currentDirectory = 'baseDir';
      let activeDirectory = {
        name: 'baseDir',
        children: [],
        files: [],
        totalFileSize: 0,
        totalFileSizeWithChildren: 0,
      };
      let currentPath = [];

      for(let i = 0; i < inputData.length; i++) {
        const line = inputData[i];
        const command = line.split(' ');
        if(command[0] === '$') {
          // We're listing or moving folders
          if(command[1] === 'cd') {
            // console.log('-- cd command --', command);
            if(command[2] === '/') {
              // We're moving to the root directory
              currentPath = [];
              currentPath.push('baseDir');
            } else if (command[2] === '..') {
              // We're moving up one directory
              currentPath.pop();
            } else {
              // We're moving to a child directory
              currentPath.push(command[2]);
              currentDirectory = currentPath.join('/');
              // currentDirectory = command[2];
            }
          } else if(command[1] === 'ls') {
            // console.log('-- ls command, push activeDirectory --', activeDirectory);
            if(currentDirectory !== activeDirectory.name) {
              newParsedData.push(activeDirectory);
            };
            activeDirectory = {
              name: currentDirectory,
              children: [],
              files: [],
              totalFileSize: 0,
              totalFileSizeWithChildren: 0,
            };
          }
        } else if (command[0] === 'dir') {
          // This is showing a folder that's a child in the current directory
          const childFolder = `${currentPath.join('/')}/${command[1]}`;
          activeDirectory.children.push(childFolder);
        } else {
          // This is showing a file that's a child in the current directory
          const fileSize = parseInt(command[0]);
          const fileName = command[1];
          activeDirectory.files.push({
            name: fileName,
            size: fileSize,
          });
          activeDirectory.totalFileSize += fileSize;
          activeDirectory.totalFileSizeWithChildren += fileSize;
        }

        // Don't miss the last row
        if(i === inputData.length - 1) {
          newParsedData.push(activeDirectory);
        }
      }
      setParsedData(newParsedData);
      console.log('-- newParsedData --', newParsedData);
    }
  }, [inputData])

  useEffect(() => {
    // Solve Task 1
    if (taskNumber === '1' && result1 === '' && parsedData.length > 0) {
      let updatedParsedData = [...parsedData];
      const folderWithChildrenSize = [];

      let moreRecords = true;
      while(moreRecords) {
        const noChildren = updatedParsedData.filter((d) => d.children.length === 0);
        if(noChildren.length === 0) {
          moreRecords = false;
          break;
        }

        for(let i = 0; i < noChildren.length; i++) {
          const { name, totalFileSizeWithChildren: size } = noChildren[i];
          folderWithChildrenSize.push({
            name: name,
            size: size,
          });
          // remove the folder so we don't see it again
          updatedParsedData = updatedParsedData.filter((f) => f.name !== name);
          // And then remove it as a child from its parent, AND add the size
          updatedParsedData = updatedParsedData.map((f) => {
            if(f.children.includes(name)) {
              return {
                name: f.name,
                files: f.files,
                totalFileSize: f.totalFileSize,
                children: f.children.filter(c => c !== name),
                totalFileSizeWithChildren: f.totalFileSizeWithChildren + size,
              }
            } else {
              return {
                ...f
              }
            }
          });
        };
      }

      // Sum size where size is <= 100000
      let size = 0;
      folderWithChildrenSize.forEach((folder) => {
        if(folder.size <= 100000) {
          size += folder.size;
        }
      });
      setResult1(`Size of folders with children <= 100000: ${size}`);

    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [parsedData]);

  useEffect(() => {
    // Solve Task 2
    if (taskNumber === '2' && result2 === '' && parsedData.length > 0) {
      let updatedParsedData = [...parsedData];
      const folderWithChildrenSize = [];

      let moreRecords = true;
      while(moreRecords) {
        const noChildren = updatedParsedData.filter((d) => d.children.length === 0);
        if(noChildren.length === 0) {
          moreRecords = false;
          break;
        }

        for(let i = 0; i < noChildren.length; i++) {
          const { name, totalFileSizeWithChildren: size } = noChildren[i];
          folderWithChildrenSize.push({
            name: name,
            size: size,
          });
          // remove the folder so we don't see it again
          updatedParsedData = updatedParsedData.filter((f) => f.name !== name);
          // And then remove it as a child from its parent, AND add the size
          updatedParsedData = updatedParsedData.map((f) => {
            if(f.children.includes(name)) {
              return {
                name: f.name,
                files: f.files,
                totalFileSize: f.totalFileSize,
                children: f.children.filter(c => c !== name),
                totalFileSizeWithChildren: f.totalFileSizeWithChildren + size,
              }
            } else {
              return {
                ...f
              }
            }
          });
        };
      };

      let totalFileSize = 0;
      for (let i = 0; i < parsedData.length; i++) {
        totalFileSize += parsedData[i].totalFileSize;
      }

      const spaceAvailable = 70000000 - totalFileSize;
      const targetDirectorySize = 30000000 - spaceAvailable;
      
      const bigEnoughFolders = folderWithChildrenSize.filter((f) => {
        return f.size >= targetDirectorySize
      });
      const smallestBigFolder = bigEnoughFolders.sort((a, b) => a.size - b.size)[0].size;

      setResult2(`Smallest Big Folder: ${smallestBigFolder}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [parsedData]);

  return (
    <div>
      <Navigation pageName={`Day 7, Task ${taskNumber}`}>
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

export default Day7Page;