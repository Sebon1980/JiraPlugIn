module.exports = function(versions) {
    let versionList = [];
    versions.values.forEach(version => {
        versionList.push(testJira.getDetailsOfVersion(version.id))
    });
    return Promise.all(versionList);
}
