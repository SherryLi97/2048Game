import React from 'react';

export default function Header({ score, best, onClickNewGame }) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{color: '#787267', fontWeight: 'bold', fontSize: '70px', margin: '0'}}>2048</h1>
        <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', flex: 1, width: 'min-content'}}>
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#baaea0',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              padding: '5px 15px',
              borderRadius: '3px',
              marginLeft: '10px'
          }}>
            <span style={{color: '#eee4da'}}>SCORE</span>
            <span>{score}</span>
          </div>
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#baaea0',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              padding: '5px 15px',
              borderRadius: '3px',
              marginLeft: '10px'
          }}>
            <span style={{color: '#eee4da'}}>BEST</span>
            <span>{best}</span>
          </div>
          <button 
            style={{
                alignItems: 'center',
                background: '#8f7a66', 
                fontWeight: 'bold', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px', 
                height: '40px',
                margin: '10px',
                cursor: "pointer"
            }} 
            onClick={onClickNewGame}>
                
            New Game
          </button>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Join the number and get to the 2048 tile!</p>
      </div>
    </div>
  );
}