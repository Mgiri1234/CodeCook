import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './database.js';

//routes
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import submissionRouter from './routes/submission.routes.js';
import testcaseRouter from './routes/testcase.routes.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
dotenv.config();
const port= process.env.PORT

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));



//using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/submissions', submissionRouter);
app.use('/api/v1/testcases', testcaseRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Backend of OJ!')
});

app.use((err, req, res, next) => {
    console.log("got error: ",err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running at port:${port}`)
})

export default app;