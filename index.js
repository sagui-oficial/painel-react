const path = require('path');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

/**
 * Serve static files - React
 */
app.use(express.static(`${__dirname}/build`));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/**
 * Run server
 */
app.listen(port, () => {
  console.log(`Client listening on port ${port}, Ctrl+C to stop...`);
});
