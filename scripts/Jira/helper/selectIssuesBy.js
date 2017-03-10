var _ = require('lodash');
module.exports = function selectIssuesBy(params, data) {
    const selectedIssue = _.filter(data.issues, _.matches(params));
    data.issues = selectedIssue;
    return data;
}