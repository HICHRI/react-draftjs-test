/**
 * Created by hichri on 8/18/17.
 */
import React from 'react';
import ReactDomServer from 'react-dom/server';


import App from './src/components/App';


import config from './config';
import axios from 'axios';


const serverRender = () =>
    axios.get(`${config.serverURL}/api/status`)
        .then(resp => {
            return ReactDomServer.renderToString(
                <App initialStatus={resp.data.data}/>
            )
        });

export default serverRender