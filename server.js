const express = require('express');
const cluster = require('cluster');
const os = require('os');

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
if (cluster.isMaster) {
  console.log(`🔎 | SERVER | Master has started...`);
  const NUM_WORKERS = os.cpus().length;
  console.log(`🔎 | SERVER | NUM_WORKERS: `, NUM_WORKERS);

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log(`🔎 | SERVER | Worker process has started...`);
  app.listen(3000, () => {
    console.log(`🔎 | SERVER | listening to port 3000...`);
  });
}
