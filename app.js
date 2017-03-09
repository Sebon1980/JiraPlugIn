const Jira = require('./Jira/Jira')
const config = require('./config');


const testJira = new Jira(config.jira);


/*testJira.getAllBoards()
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));
*/

/*testJira.getDetailsOfBoard(1)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));*/

/*testJira.getIssuesOfBoard(1)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));*/

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

testJira.selectIssuesBy(1, { sprintId: 4 })
    .then(result => {
        if (result.length === 0) {
            return console.log('Select parameter doesn´t exist')
        }
        console.log(result)
    })
    .catch(e => console.log(e));