module.exports = function(pct, width = 20, msg){
  process.stdout.write(`\r${Array.from({ length: width }).map((d, i) => i < Math.floor(pct * width / 100) ? "|" : ".").join("")}${msg || `\t${pct.toFixed(1)}%`}`);
}