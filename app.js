import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import { CronJob } from 'cron';
import http from 'http';
import https from 'https';

import payslipRouter from './routes/payslip';

const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + path.extname(file.originalname))
//   }
// })

const upload = multer({ // If dest and storage property doesn't specify in multer, file will send a Buffer Object to req.file
    // dest: '/tmp/',
    // storage: storage,
    limits: {
      fileSize: 52428800, // max file size (in bytes) 50 MB
      files: 1  // max number of file fields
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.enable('trust proxy');
app.disable('x-powered-by');

// Support allow access cross origin
app.use(cors());

// app.use(upload.single('companyIcon'));

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/payslip', upload.single('companyIcon'), payslipRouter);


app.use('/health', (req, res, next) => {
    res.send('Ok');
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {

    res.locals.year = (new Date()).getFullYear();
    res.locals.title = '';

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    var status = err.status || 400;
    res.status(status);

    // When node request library failed to connect to the URL.
    if (err && (err.code === 'ECONNREFUSED')) {
        err.message  = 'Oops, something breaks in our end. Try again!';
    }

    var message = err && err.message;
    if (!message) {
        if (status === 404) {
            message = 'Not found!';
        } else if (status === 401) {
            message = 'Unauthorized!';
        } else if (status === 403) {
            message = 'Not allowed!';
        } else {
            message = 'Oops, there was a problem!';
        }
    }

    // var accepted = req.accepts(['html', 'json']);

    // if (accepted === 'json') {
    //     // if (status === 401) {
    //     //     console.log('Unauthorized User')
    //     // }

    //     res.json({
    //         status: status,
    //         message: message
    //     });

    // } else if (accepted === 'html') {
    //     // if (status === 401) {
    //     //      console.log('Unauthorized User')
    //     // }

    //     // render the error page
    //     //res.render('error');

    //     res.json({
    //         status: status,
    //         message: message
    //     });

    // }  else {
    //     res.type('txt').send(message + '\n');
    // }

    res.json({
        status: status,
        message: message
    });

});

let doActivity = () => {
    const service  = process.env.NODE_ENV === 'production' ? https : http;
    const req = service.get(`${process.env.SITE_URL}/health`);
    req.end();
    req.once('response', (res) => {
        // const ip = req.socket.localAddress;
        // const port = req.socket.localPort;
        // console.log(`Your IP address is ${ip} and your source port is ${port}.`);
        // console.log("SITE_URL", process.env.SITE_URL)
    });
}

let thiryMinJob = new CronJob({
    cronTime: '*/15 * * * *',
    onTick: doActivity,
    start: false,
    timeZone: 'UTC'
});
thiryMinJob.start();

export default app;
