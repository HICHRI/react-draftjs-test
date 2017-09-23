/**
 * Created by hichri on 9/22/17.
 */
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import apiRouter from './api'; //to be replaced by graphQL server // data feeder
import config from './config';
const server = express();



server.use(express.static('public'))
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}))

server.use('/api', apiRouter);
// view engine setup
server.set('views', __dirname + '/views')
server.set('view engine', 'ejs');



import serverRender from './serverRender';

server.get('/moneyG.test',(req, res) => {
    serverRender()
        .then(content => {
            res.render('default')
        })
        .catch()
})


server.listen(config.port, config.host,  () => {
    console.log('listen on port 3000')
})