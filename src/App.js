import React, {useState, useEffect} from 'react';
import cloneDeep from 'lodash.clonedeep';
import {useEvent, style, colors} from '../src/util/util';
import { getPosition } from './util/util';
import Header from './Header';

function App() {
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  const EMPTY = 0;
  const initialData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  const [data, setData] = useState(initialData);
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(true);
  const [best, setBest] = useState(0);
  const [scoreHistroy, setScoreHistory] = useState([]);

  useEffect(() => {
    if (newGame) {
      initialize();
    }
  }, [newGame]);

  useEffect(() => {
    setBest(Math.max(...scoreHistroy, score));
  },[score]);

  useEffect(() => {
    if (checkGameOver(data)) {
      alert("Game Over");
    }
    if (checkWin(data)) {
      alert("Congratulations!");
    }
  },[data]);

  // initialize
  const initialize = () => {
    let newGrid = cloneDeep(data);

    addNum(newGrid);
    addNum(newGrid);

    setData(newGrid);
    setNewGame(false);
  }

  // generate random number to the grid
  const addNum = (newGrid) => {
    let pos = getPosition(newGrid.length);
    while (newGrid[pos[0]][pos[1]] !== 0) {
      pos = getPosition(newGrid.length);
    }

    newGrid[pos[0]][pos[1]] = Math.random() > 0.5 ? 2 : 4;
  }

  const swipeHorizontal = (array, xDir, start, end) => {
    let originalData = data;
    let arr = cloneDeep(data);
    for (let j = 0; j < arr.length; j++) {
      let startIdx = -1;
      for (let i = start; xDir === 1 ? i < arr[0].length : i >= 0; i = i + xDir) {
        if (startIdx === -1) {
            if (arr[j][i] === EMPTY) {
                startIdx = i;
            }
            continue;
        }
        if (arr[j][i] !== EMPTY) {
            arr[j][startIdx] = arr[j][i];
            startIdx += xDir;
            arr[j][i] = EMPTY;
        }
      }
      
      let insertIdx = start;
      for (let i = start; xDir === 1 ? i < arr[0].length : i >= 0;) {
        if (i === end) {
            arr[j][insertIdx] = arr[j][i];
            insertIdx += xDir;
            break;
        }
        if (arr[j][i] === arr[j][i + xDir] && arr[j][i] !== 0) {
            arr[j][insertIdx] = arr[j][i] * 2;
            setScore(score + arr[j][insertIdx]);
            insertIdx += xDir;
            i += 2 * xDir;
        } else {
            arr[j][insertIdx] = arr[j][i];
            insertIdx += xDir;
            i += 1 * xDir;
        }
      }
      
      if (xDir === 1) {
        while (insertIdx < arr.length) {
            arr[j][insertIdx] = EMPTY;
            insertIdx += xDir;
        }
      } else if (xDir === -1) {
        while (insertIdx >= 0) {
            arr[j][insertIdx] = EMPTY;
            insertIdx += xDir;
        }
      }
    }
    if (JSON.stringify(arr) !== JSON.stringify(originalData)) {
      addNum(arr);
    }
    setData(arr);
    
  }

  const swipeVertical = (array, xDir, start, end) => {
    let originalData = data;
    let arr = cloneDeep(data);
    for (let j = 0; j < arr.length; j++) {
      let startIdx = -1;
      for (let i = start; xDir === 1 ? i < arr[0].length : i >= 0; i = i + xDir) {
        if (startIdx === -1) {
            if (arr[i][j] === EMPTY) {
                startIdx = i;
            }
            continue;
        }
        if (arr[i][j] !== EMPTY) {
            arr[startIdx][j] = arr[i][j];
            startIdx += xDir;
            arr[i][j] = EMPTY;
        }
      }
      
      let insertIdx = start;
      for (let i = start; xDir === 1 ? i < arr[0].length : i >= 0;) {
        if (i === end) {
            arr[insertIdx][j] = arr[i][j];
            insertIdx += xDir;
            break;
        }
        if (arr[i][j] === arr[i + xDir][j] && arr[i][j] !== 0) {
            arr[insertIdx][j] = arr[i][j] * 2;
            setScore(score + arr[insertIdx][j]);
            insertIdx += xDir;
            i += 2 * xDir;

        } else {
            arr[insertIdx][j] = arr[i][j];
            insertIdx += xDir;
            i += 1 * xDir;
        }
      }
      
      if (xDir === 1) {
        while (insertIdx < arr.length) {
            arr[insertIdx][j] = EMPTY;
            insertIdx += xDir;
        }
      } else if (xDir === -1) {
        while (insertIdx >= 0) {
            arr[insertIdx][j] = EMPTY;
            insertIdx += xDir;
        }
      }
    }

    if (JSON.stringify(arr) !== JSON.stringify(originalData)) {
      addNum(arr);
    }
    setData(arr);
  }

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP:
        swipeVertical(data,1,0,3);
        break;
      case DOWN:
        swipeVertical(data,-1,3,0);
        break;
      case LEFT:
        swipeHorizontal(data,1,0,3);
        break;
      case RIGHT:
        swipeHorizontal(data,-1,3,0);
        break;
      default:
        break;
    }
  };

  useEvent('keydown', handleKeyDown);

  const checkInBound = (arr, i, j) => {
    return i >= 0 && i < arr.length && j >= 0 && j < arr.length;
  }
  const checkGameOver = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === 0) return false;
        let newCol1 = i + 1;
        let newCol2 = i;
        let newRow1 = j;
        let newRow2 = j + 1;
        if (checkInBound(arr,newCol1,newRow1)) {
          if (arr[i][j] === arr[newCol1][newRow1]) {
            return false;
          }
        }
        if (checkInBound(arr,newCol2,newRow2)) {
          if (arr[i][j] === arr[newCol2][newRow2]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const checkWin = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === 2048) return true;
      }
    }
    return false;
  };

  const onClickNewGame = () => {
    setScoreHistory([...scoreHistroy, score]);
    setNewGame(true);
    setScore(0);
    setData(initialData);
  };

  return (
    <div style={{
      background: '#fcfaeb',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}>
      <div style={{background: '#e6e4d1', padding: '20px'}}>
        <Header score={score} best={best} onClickNewGame={onClickNewGame}/>
        <div style={{
          background: '#f0eddd',
          width: 'max-content',
          padding: '5px',
          borderRadius: '5px',
          marginTop: '10px'
          }}>
          {
            data.map((e, idx) => {
              return (
                <div style={{ display: "flex" }} key={idx}>
                  {e.map((element, index) => (
                    <Square num={element} key={index} />
                  ))}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

const Square = ({num}) => {
  const {squareStyle} = style;
  return (
    <div style={{
      ...squareStyle, 
      background: colors(num), 
      color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
    }}>
      {num === 0 ? "" : num}
    </div>
  );
}

export default App;
