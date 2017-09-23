/**
 * Created by hichri on 9/22/17.
 */
import express from 'express';
const router = express.Router();
import data from '../src/testData.json';


router.get('/status',(req, res) => {
    res.send({data: data.status})
})

export default router ;