const JiraClient = require('jira-connector');

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
}

module.exports = Jira;