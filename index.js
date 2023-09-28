const { CID } = require('./constant')
const axios = require('axios');
const basePath = process.cwd();
const fs = require("fs");
const path = require("path");
const {sleep} = require('./utils');

async function fetchPinata() {
    for (let i = 89; i <= 10000; i ++) {
        try {
            const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${CID}/${i}.json`);
            const text = response.data;

            fs.writeFileSync(
                `${basePath}/build/json/${i}.json`,
                JSON.stringify(text, null, 2)
            );
        } catch (err) {
            console.log('error: ', i);
            await sleep(60000); // sleep 1m
            i --;
        }
    }
}

fetchPinata()