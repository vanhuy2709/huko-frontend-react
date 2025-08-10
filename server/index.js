import express from 'express';
import path from 'path';

const app = express();

// Serve static files
app.use(express.static('../dist'));

// Handle all routes - make sure this comes after static files middleware
app.all(/.*/, (req, res) => {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.listen(3000, () => {
  console.log(`Server NodeJs listening on port 3000`);
});