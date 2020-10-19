module.exports = function(pct, width = 20, msg){
  const message = msg || `\t${pct.toFixed(1)}%`;
  process.stdout.write(`\r${Array.from({length: width}).map((d, i) => i < Math.floor(pct * width / 100) ? "|" : ".").join("")}${message}`)
}