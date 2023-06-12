const express = require('express');
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.use('/', require('./routes/index'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
