const Jira = require('./Jira/Jira')
const config = require('./config');
const express = require('express');
const exphbs = require('express-handlebars');
var expressJoi = require('express-joi');

const app = express();

app.use(require('body-parser').json()); // parse body params and attache them to req.body
app.use(require('body-parser').urlencoded({ extended: true }));

const hostname = '127.0.0.1';
const port = 3000;

const testJira = new Jira(config.jira);

var Joi = expressJoi.Joi;
var test = {
    versionId: Joi.types.Number(),
    sprintId: Joi.types.Number(),
    epicId: Joi.types.Number(),
    issueId: Joi.types.Number(),
    boardId: Joi.types.Number(),
    status: Joi.types.string()
};


/*app.set('views', __dirname + '/../server/resources/assets/views/');

app.engine('handlebars', exphbs({
    layoutsDir: 'server/resources/assets/views/layouts',
    partialsDir: 'server/resources/assets/views'
}));
app.set('view engine', 'handlebars');*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/show/BoardDetails', function(req, res) {
        testJira.getDetailsOfBoard(1)
            .then(result => {
                res.send(result);
            }).catch(e => console.log(e));
    })
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/show/allBoards', function(req, res) {
        testJira.getAllBoards()
            .then(result => {
                res.send(result);
            }).catch(e => console.log(e));
    })
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.post('/show/allIssues/:boardId', expressJoi.joiValidate(test), function(req, res) {
        testJira.selectIssuesBy(req.params.boardId, req.body)
            .then(result => {
                if (result.length === 0) {
                    console.log('Select parameter doesn´t exist')
                    return res.send('Select parameter doesn´t exist')
                }
                res.send(result);
                console.log(req.query)
            })
            .catch(e => console.log(e));
    })
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*testJira.getDetailsOfBoard(1)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));*/

/*testJira.getIssuesOfBoard(1)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));*/
/*
testJira.getAllVersions(10000)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));
*/

/*testJira.getDetailsOfVersion(10000)
    .then(result => {
        console.log(result);
    }).catch(e => console.log(e));

*/

app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});