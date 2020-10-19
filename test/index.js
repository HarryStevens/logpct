const logpct = require(`${__dirname}/../`);

const length = 1e5;
Array.from({ length }).forEach((d, i) => {
  logpct((i + 1) / length * 100);
});

console.log("");
Array.from({ length }).forEach((d, i) => {
  logpct((i + 1) / length * 100, 40, `\t${i + 1} of ${length}`);
});

console.log("");