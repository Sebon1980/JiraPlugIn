var _ = require('lodash');
module.exports = function selectIssuesBy(params, data) {
    return _.filter(data, _.matches(params));
}