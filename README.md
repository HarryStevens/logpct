# logpct
A percent status logger for Node.js.

## Installation
```bash
npm i logpct -S
```

## Usage
```js
const logpct = require("logpct");

const length = 1e6;
Array.from({ length }).forEach((d, i) => {
  
  const pct = (i + 1) / length * 100;

  logpct(
    pct, // The percentage to log (required; should be a number between 0 and 100)
    20, // The width of the status bar (optional; defaults to 20 characters)
    `\t${pct.toFixed(1)}%` // The message to display next to the status bar (optional; defaults to what you see here)
  );

});
```