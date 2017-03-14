var _ = require('lodash');
module.exports = function selectIssuesBy(params, data) {
    const selectedIssue = _.filter(data, _.matches(params));
    data = selectedIssue;
    return data;
}