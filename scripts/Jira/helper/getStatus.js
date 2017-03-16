module.exports = function getStatus(data) {
    const status = {
        total: 0,
        done: 0,
        inProgress: 0,
        toDo: 0
    }
    data.forEach((currentIssue) => {

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
        total: status.total + ' issues',
        done: Math.round(parseFloat(status.done / status.total * 100)) + ' %',
        inProgress: Math.round(parseFloat(status.inProgress / status.total * 100)) + ' %',
        toDo: Math.round(parseFloat(status.toDo / status.total * 100)) + ' %'
    }

    return percents;
}