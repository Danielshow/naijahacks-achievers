import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';

env.config();
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`App listening on Port ${process.env.PORT}`);
});

export default app;
