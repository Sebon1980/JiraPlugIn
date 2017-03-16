const JiraClient = require('jira-connector');

const { parseIssue, selectIssuesBy, getStatus } = require('./helper');


class Jira {

    constructor(config) {
        this.connector = new JiraClient(config);
    }

    getAllBoards() {
        var opts = {
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.board.getAllBoards(opts)
    }

    getDetailsOfBoard(boardId) {
        var opts = {
            boardId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.board.getBoard(opts)
    }

    getIssuesOfBoard(boardId) {
        var opts = {
            boardId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.board.getIssuesForBoard(opts)
            .then(result => parseIssue(result))
    }

    getAllVersions(projectIdOrKey) {
        var opts = {
            projectIdOrKey,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.project.getVersions(opts)
    }

    getDetailsOfVersion(versionId) {
        var opts = {
            versionId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.version.getVersion(opts)
    }

    selectIssuesBy(boardId, params) {

        return this.getIssuesOfBoard(boardId)
            .then(result => {
                return selectIssuesBy(params, result);
            })
            .catch(err => console.log(err))

    }
    getStatus(data) {
        return getStatus(data)
    }

    getVersions(boardId) {
        var opts = {
            boardId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.version.getAllVersions(opts)
    }

    getProgressOfVersionsInBoard(boardId) {
        return new Promise((resolve, reject) => {

            this.getVersions(boardId)
                .then((versions) => {
                    let versionList = [];
                    versions.values.forEach(version => {
                        versionList.push(this.getDetailsOfVersion(version.id))
                    });

                    return Promise.all(versionList);
                })
                .then((versionList) => {
                    let issueList = [];
                    versionList.forEach(version => {
                        issueList.push(this.selectIssuesBy(boardId, { versionId: version.id }))
                    });
                    return Promise.all(issueList);
                })
                .then(issueList => {
                    let progressList = [];
                    issueList.forEach(issue => {
                        progressList.push(this.getStatus(issue))
                    });
                    resolve(progressList)
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                })
        })

    }
}


module.exports = Jira;