const JiraClient = require('jira-connector');

const { parseIssue, selectIssuesBy, getStatus } = require('./helper');


class Jira {

    constructor(config) {
        this.connector = new JiraClient(config);
    }

    /**
     * function to get all Boards of specified Jira account
     * by using npm module "jira-connector"
     */
    getAllBoards() {
            var opts = {
                type: "",
                startAt: 0,
                maxResults: 25
            };
            return this.connector.board.getAllBoards(opts)
        }
        /**
         * 
         * @param {*} boardId 
         * GET method to return Details of named Board 
         */

    getDetailsOfBoard(boardId) {
            var opts = {
                boardId,
                type: "",
                startAt: 0,
                maxResults: 25
            };
            return this.connector.board.getBoard(opts)
        }
        /**
         * GET Method returns all Issues of named board
         * by using the boardId
         * @param {*} boardId 
         */

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
        /**
         * GET Method to return all Versions with details of named board
         * by using the boardId
         * @param {*} boardId 
         */

    getVersions(boardId) {
            var opts = {
                boardId,
                type: "",
                startAt: 0,
                maxResults: 25
            };

            return this.connector.version.getAllVersions(opts)
                .then(result => {
                    let versionList = [];
                    result.values.forEach(value => {
                        versionList.push(this.getDetailsOfVersion(value.id))
                    });
                    return Promise.all(versionList)
                })
        }
        /**
         * GET Method to return the details of named version 
         * by using the versionId
         * @param {*} versionId 
         */

    getDetailsOfVersion(versionId) {
        var opts = {
            versionId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.version.getVersion(opts)
    }

    /**
     * Get method to return all Issues 
     * which belongs to a named board
     * @param {*} boardId 
     * and be selected by specific key/value pair
     * @param {*} params 
     */

    selectIssuesBy(boardId, params) {

        return this.getIssuesOfBoard(boardId)
            .then(result => {
                return selectIssuesBy(params, result);
            })
            .catch(err => console.log(err))

    }

    /**
     * Function get calculate and return the progress 
     * of the given Isuues in @param {*} data
     */
    getStatus(data) {
        return getStatus(data)
    }

    getProgressOfVersionsInBoard(boardId) {
        return new Promise((resolve, reject) => {

            this.getVersions(boardId)
                .then((versions) => {
                    let versionList = [];
                    versions.forEach(version => {
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

    getVersionProgress(boardId, versionId) {
        return new Promise((resolve, reject) => {

                this.selectIssuesBy(boardId, { versionId: version.id })
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
    }
}



module.exports = Jira;