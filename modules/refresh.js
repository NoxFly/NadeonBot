const retrieveData = require('./retrieveData.js');
const sendData = require('./sendData.js');

const refresh = () => {
    retrieveData().then(() => {
		sendData().catch(error => console.log(error));
	}).catch(error => console.log(error));
};

module.exports = refresh;