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

app.get('/show/versions/:boardId', function(req, res) {

    testJira.getProgressOfVersionsInBoard(req.params.boardId)
        .then(progress => {
            console.log(progress)
            res.send(progress)
        })
        .catch(err => {

        })

})

app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});