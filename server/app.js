import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('express-validator')());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/payslip', upload.single('companyIcon'), payslipRouter);

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

    var orgMsg = err && err.message; // For debug

    // When node request library failed to connect to the URL.
    if (err && (err.code === 'ECONNREFUSED')) {
        err.message  = 'Oops, something breaks in our end. Try again!';
    }

    var message = err.message;
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

export default app;
