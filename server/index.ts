
import express, { Request, Response } from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import multer, { FileFilterCallback } from 'multer';
// Constants
const app = express()
const PORT = 3000;
const cors = require('cors');

// App Config
// app.options('*', cors())
app.use(bodyParser.json()); // middleware для парсинга json-объектов
app.use(bodyParser.urlencoded({ extended: false })); // middleware для парсинга тел из URL
app.use(routes);
app.use(cors());
// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));


// Serves images

// app.use(express.static('public'));
app.use("/public", express.static("public"));

// Server start

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'API is running on /api' });
});

app.listen(PORT, () => {
    console.info(`Server up on port ${PORT}`);
});