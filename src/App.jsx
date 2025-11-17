import React, { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

const App = () => {
  const [display, setDisplay] = useState('0');

  const handleDigitClick = (digit) => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === '0' || prevDisplay === 'Error') {
        return String(digit);
      }
      // After a calculation, if a number is pressed, start a new calculation
      if (prevDisplay.includes('=')) {
        return String(digit);
      }
      return prevDisplay + digit;
    });
  };

  const handleOperatorClick = (operator) => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === 'Error') return '0';
      // Replace result with new expression
      if (prevDisplay.includes('=')) {
        const result = prevDisplay.split('=')[1];
        return result + ` ${operator} `;
      }
      // Prevent adding multiple operators
      const lastChar = prevDisplay.trim().slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        return prevDisplay.slice(0, -2) + ` ${operator} `;
      }
      return prevDisplay + ` ${operator} `;
    });
  };

  const handleEqualClick = () => {
    setDisplay((prevDisplay) => {
      if (prevDisplay.includes('=')) return prevDisplay;
      try {
        // Replace textual operators with evaluatable ones if needed, though we use symbols.
        // The core of the logic is to evaluate the expression string.
        // Using a function constructor for safer evaluation than direct eval().
        const calculate = new Function('return ' + prevDisplay.replace(/--/g, '+'));
        const result = calculate();
        return `${prevDisplay} = ${result}`;
      } catch (error) {
        return 'Error';
      }
    });
  };

  const handleClearClick = () => {
    setDisplay('0');
  };

  const handlePlusMinusClick = () => {
    // This is a simplified implementation. A more robust solution would parse the expression.
    setDisplay((prevDisplay) => {
        if (prevDisplay.includes('=')) {
            const result = prevDisplay.split('=')[1];
            return String(parseFloat(result) * -1);
        }
        const parts = prevDisplay.split(' ');
        const lastPart = parts[parts.length - 1];
        if (!isNaN(lastPart)) {
            parts[parts.length - 1] = String(parseFloat(lastPart) * -1);
            return parts.join(' ');
        }
        return prevDisplay;
    });
  };

  const handlePercentageClick = () => {
    // This is a simplified implementation.
     setDisplay((prevDisplay) => {
        if (prevDisplay.includes('=')) {
            const result = prevDisplay.split('=')[1];
            return String(parseFloat(result) / 100);
        }
        const parts = prevDisplay.split(' ');
        const lastPart = parts[parts.length - 1];
        if (!isNaN(lastPart)) {
            parts[parts.length - 1] = String(parseFloat(lastPart) / 100);
            return parts.join(' ');
        }
        return prevDisplay;
    });
  };

  const handleDecimalClick = () => {
    setDisplay((prevDisplay) => {
      const parts = prevDisplay.split(' ');
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes('.')) {
        return prevDisplay + '.';
      }
      return prevDisplay;
    });
  };

  const buttonLayout = [
    { value: 'AC', onClick: handleClearClick, className: 'function' },
    { value: '+/-', onClick: handlePlusMinusClick, className: 'function' },
    { value: '%', onClick: handlePercentageClick, className: 'function' },
    { value: '/', onClick: () => handleOperatorClick('/'), className: 'operator' },
    { value: '7', onClick: () => handleDigitClick('7') },
    { value: '8', onClick: () => handleDigitClick('8') },
    { value: '9', onClick: () => handleDigitClick('9') },
    { value: '*', onClick: () => handleOperatorClick('*'), className: 'operator' },
    { value: '4', onClick: () => handleDigitClick('4') },
    { value: '5', onClick: () => handleDigitClick('5') },
    { value: '6', onClick: () => handleDigitClick('6') },
    { value: '-', onClick: () => handleOperatorClick('-'), className: 'operator' },
    { value: '1', onClick: () => handleDigitClick('1') },
    { value: '2', onClick: () => handleDigitClick('2') },
    { value: '3', onClick: () => handleDigitClick('3') },
    { value: '+', onClick: () => handleOperatorClick('+'), className: 'operator' },
    { value: '0', onClick: () => handleDigitClick('0'), className: 'zero' },
    { value: '.', onClick: handleDecimalClick },
    { value: '=', onClick: handleEqualClick, className: 'operator' },
  ];

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        {buttonLayout.map((btn) => (
          <Button
            key={btn.value}
            value={btn.value}
            onClick={btn.onClick}
            className={btn.className}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
