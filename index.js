const express = require('express')

const PORT = 3000

const app = express()
app.use(express.json())

const players = []
const teams = []

app.route('/teams').post((req, res) => {
    const { body } = req

    const nextId = teams[teams.length - 1]?.id + 1 || 1;
    teams.push({
        id: nextId,
        ...body
    })

    res.status(201).setHeader('Location', `http://localhost:3000/teams/${nextId}`).send()
}).get((_, res) => {
    res.json(teams)
})

app.route('/players').post((req, res) => {
    const { body } = req

    const nextId = players[players.length - 1]?.id + 1 || 1;
    teams.push({
        id: nextId,
        ...body
    })

    res.status(201).setHeader('Location', `http://localhost:3000/players/${nextId}`).send()
}).get((_, res) => {
    res.json(players)
})

app.route('/teams/:id').get((req, res) => {
    const { params } = req

    const teams = teams.find(teams => teams.id === +params.id)
    if (!teams) {
        res.sendStatus(404)
        return;
    }

    res.json(teams)
}).delete((req, res) => {
    const { params } = req

    const teamsIndex = teams.findIndex(teams => teams.id === +params.id)
    if (teamsIndex < 0) {
        res.sendStatus(404)
        return;
    }

    teams.splice(teamsIndex, 1)
    res.send()
}).put((req, res) => {
    const { params, body } = req

    const teamsIndex = teams.findIndex(teams => teams.id === +params.id)
    if (teamsIndex < 0) {
        res.sendStatus(404)
        return;
    }

    teams[teamsIndex] = {
        id: +params.id,
        ...body
    }

    res.send()
})


app.listen(PORT, () => {
    console.log(`Servidor iniciou na porta ${PORT}`)
})
