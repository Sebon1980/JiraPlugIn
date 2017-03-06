const Jira = require('./Jira/Jira')
const config = require('./config');

const testJira = new Jira(config.jira);


/*testJira.getAllBoards()
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));
*/

testJira.getDetailsOfBoard(1)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));

/*testJira.getAllVersions(10000)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));
*/

/*testJira.getDetailsOfVersion(10000)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));
*/