module.exports = function parseIssue(data) {

    const Issues = [];

    data.issues.forEach((currentIssue) => {
        var issue = {
            id: currentIssue.id,
            key: currentIssue.key,
            adress: currentIssue.self,
            summary: currentIssue.fields.summary,
            sprintId: currentIssue.fields.sprint ? currentIssue.fields.sprint.id : 'not listed in sprint',
            epicId: currentIssue.fields.epic ? currentIssue.fields.epic.id : 'not listed in epic',
            assigneeName: currentIssue.fields.assignee ? currentIssue.fields.assignee.displayName : 'no assignee',
            epicName: currentIssue.fields.epic.name,
            status: currentIssue.fields.status.name,
            isDone: currentIssue.fields.status.name == 'Done'
        }
        Issues.push(issue);
    })
    return Issues
}