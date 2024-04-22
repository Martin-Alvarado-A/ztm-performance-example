const express = require('express');
const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR;

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // The event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

console.log(`🔎 | SERVER | Runing server.js...`);

console.log(`🔎 | SERVER | Worker process has started...`);
app.listen(3000, () => {
  console.log(`🔎 | SERVER | listening to port 3000...`);
});
