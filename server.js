const app = require('./app.js');

app.get('/', (req, res) => {
  res.send("Hello!!!")
});

app.listen(4000, () => {
  console.log("Chillin' on port 4k...")
});