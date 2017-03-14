const express = require('express');
const router = express.Router();
const config = require('../scripts/config');
const Jira = require('../scripts/Jira/Jira');
const testJira = new Jira(config.jira);

/* GET home page */
router.get('/show/allIssues/:boardId', function(req, res, next) {
    testJira.selectIssuesBy(req.params.boardId, req.query)
        .then(result => {
            if (result.length === 0) {
                console.log('Select parameter doesn´t exist')
                return res.send('Select parameter doesn´t exist')
            }
            res.render('overview', result);
            console.log(req.query)
        })
        .catch(e => console.log(e));
})

module.exports = router;