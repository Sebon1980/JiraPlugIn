module.exports = {
    jira: {
        host: process.env.JIRA_HOST || 'neumannsebastian.atlassian.net',
        basic_auth: {
            username: process.env.JIRA_USER || 'sebon1980@outlook.de',
            password: process.env.JIRA_PASSWORD || 'Tiffy709'
        }
    }
};