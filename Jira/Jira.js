const JiraClient = require('jira-connector');
const { parseIssue, selectIssuesBy } = require('./helper');

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
                return selectIssuesBy(params, result)
            })
    }
}

module.exports = Jira;