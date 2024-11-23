import express from 'express';
import corsMiddleware from './middlewares/cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
// import * as fs from 'fs';
import expressWs from 'express-ws';
import { errorHandler } from './middlewares/error-handler';

import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import employeeRoute from './routes/employee.route';
import elementRoute from './routes/element.route';
import buildingRoute from './routes/building.route';
import equipmentRoute from './routes/equipment.route';
import floorRoute from './routes/floor.route';

const { app, getWss } = expressWs(express());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(cookieParser());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY as string],
    })
);
// uploader section
// app.use('/uploads', express.static('./uploads'));
// const dir = './uploads';
// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
// }

// cron section
// cronService.setDays.start();

// routes section
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/employees', employeeRoute);
app.use('/elements', elementRoute);
app.use('/buildings', buildingRoute);
app.use('/equipments', equipmentRoute);
app.use('/floors', floorRoute);

// websocket section
app.ws('/', () => {
    console.log('Success');
});

// logger section
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     );
// }

// export const broadcastConnection = (ws: any, msg: any) => {
//     aWss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(msg);
//         }
//     });
// };

// error handler
app.use(errorHandler);

export const aWss = getWss();
export default app;
