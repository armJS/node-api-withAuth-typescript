import app from './App';
const PORT = 3200;

app.listen(process.env.PORT || PORT, () => {
  console.log('Server listening on port ' + PORT);
});
