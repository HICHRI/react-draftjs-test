/**
 * Created by hichri on 9/22/17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import data from './testData.json';
import axios from 'axios'

axios.get('api/status')
    .then(resp => {
        ReactDom.render(
            <App initialStatus={resp.data.data}/>,
            document.getElementById('text-edit-root')
        )
    })
    .catch(errr => {
            console.log('errr' +errr)
    })



