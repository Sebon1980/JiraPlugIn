const getDetailsOfVersion = require('')
module.exports = function(versions) {
    let versionList = [];
    versions.values.forEach(version => {
        versionList.push(getDetailsOfVersion(version.id))
    });
    return Promise.all(versionList);
}