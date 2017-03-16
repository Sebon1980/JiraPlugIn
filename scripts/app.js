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

app.use('/', require('../routes'))
app.set('views', __dirname + '/../server/resources/assets/views/');

app.engine('handlebars', exphbs({
    layoutsDir: 'server/resources/assets/views/layouts',
    partialsDir: 'server/resources/assets/views'
}));
app.set('view engine', 'handlebars');



app.get('/show/versions/:boardId', function(req, res) {

    var getDetailsOfVersions = function(versions) {
        let versionList = [];
        versions.values.forEach(version => {
            versionList.push(testJira.getDetailsOfVersion(version.id))
        });
        return Promise.all(versionList);
    }
    testJira.getVersions(req.params.boardId)
        .then((versions) => {
            return getDetailsOfVersions(versions);

        })
        .then((versionList) => {
            let issueList = [];
            versionList.forEach(version => {
                console.log(version)
                issueList.push(testJira.selectIssuesBy(req.params.boardId, { versionId: version.id }))
            });
            return Promise.all(issueList);
        })
        .then(issueList => {
            res.render('overview', {});
            issueList.forEach(issue => {
                console.log(testJira.getStatus(issue))
            });

        })
        .catch(err => { console.log(err) })
});

app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});