module.exports = function getStatus(data) {
    const status = {
        total: 0,
        done: 0,
        inProgress: 0,
        toDo: 0
    }
    data.issues.forEach((currentIssue) => {

        status.total++;
        switch (currentIssue.status) {
            case "In Progress":
                status.inProgress++;
                break;
            case "To Do":
                status.toDo++;
                break;
            default:
                status.done++;
                break;
        }
    })
    const percents = {
        total: status.total,
        done: status.done / status.total * 100,
        inProgress: status.inProgress / status.total * 100,
        toDo: status.toDo / status.total * 100
    }
}
return percents;