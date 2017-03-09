module.exports = function parseIssue(data) {
    var issues = []

    data.issues.forEach((currentIssue) => {

        var issue = {
            issueId: currentIssue.id,
            issueKey: currentIssue.key,
            summary: currentIssue.fields.summary,
            issueAdress: currentIssue.self,
            status: currentIssue.fields.status.name,
            isDone: currentIssue.fields.status.name == 'Done',
            versionId: currentIssue.fields.fixVersions ? currentIssue.fields.fixVersions[0].id : 'not signed to any version',
            versionName: currentIssue.fields.fixVersions ? currentIssue.fields.fixVersions[0].name : 'not signed to any version',
            versionAdress: currentIssue.fields.fixVersions ? currentIssue.fields.fixVersions[0].self : 'not signed to any version',
            epicId: currentIssue.fields.epic ? currentIssue.fields.epic.id : 'not listed in epic',
            epicName: currentIssue.fields.epic ? currentIssue.fields.epic.name : 'not listed in epic',
            sprintId: currentIssue.fields.sprint ? currentIssue.fields.sprint.id : 'not listed in sprint',
            sprintName: currentIssue.fields.sprint ? currentIssue.fields.sprint.name : 'not listed in sprint',
            sprintAdress: currentIssue.fields.sprint ? currentIssue.fields.sprint.self : 'not listed in sprint',
            assigneeName: currentIssue.fields.assignee ? currentIssue.fields.assignee.displayName : 'no assignee',
        }
        issues.push(issue);
    })
    return issues

}