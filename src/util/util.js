import {useEffect} from 'react';

export const useEvent = (event, handler, passive = false) => {
    useEffect(() => {
      window.addEventListener(event, handler, passive);
  
      return function cleanup() {
        window.removeEventListener(event, handler);
      };
    });
};

export const getPosition = (len) => {
    const randCol = Math.floor(Math.random() * len);
    const randRow = Math.floor(Math.random() * len);
    return [randCol, randRow];
};

export const style = {
    squareStyle: {
        height: 80,
        width: 80,
        background: "lightgray",
        margin: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 45,
        fontWeight: "800",
        color: "white",
    },
    
};

export const colors = (num) => {
    switch (num) {
      case 2:
        return "#EBDCD0";
      case 4:
        return "#E9DBBA";
      case 8:
        return "#E9A067";
      case 16:
        return "#F08151";
      case 32:
        return "#F2654F";
      case 64:
        return "#F1462C";
      case 128:
        return "#E7C65E";
      case 256:
        return "#E8C350";
      case 512:
        return "#E8BE40";
      case 1024:
        return "#E8BB31";
      case 2048:
        return "#E7B723";
      default:
        return "#C2B3A3";
    }
};