window.players = {
    rows: {
        current: null,
        rows: [],
        getRow: function (whereKey = '') {

        },
        updateRow: function (playerLogin, serverName) {

            const data = [];

            players.fetch(serverName).forEach(object => {
                if (object.login == playerLogin) {

                    object.device_os = prompt("Type device OS and press OK:");
                    object.login = prompt("Type login and press OK:");
                    object.name = prompt("Type name and press OK:");
                    object.status = prompt("Type status and press OK:");
                    object.level = prompt("Type level and press OK:");
                    object.coins = prompt("Type amount of coins and press OK:");

                    logssystem.log(`players.rows.updateRow(${playerLogin}, ${serverName})`, object);
                }
                data.push(object);
            });

            requests.post(serverName.toString(), 'players.json', data);
        },
        deleteRow: function (whereKey = '') {

        }
    },

    fetch: function (servers) {
        const objectsArray = players.rows.rows;

        servers.forEach(serverName => {

            let data = requests.get(serverName, 'players.json');

            data.forEach(object => {

                objectsArray.push(object);
            });
        });

        logssystem.log("players.fetch()", objectsArray);
        return objectsArray;
    },

    getActivePlayers: function (servers) {
        const playersArray = [];

        this.fetch(servers).forEach(object => {
            if (object.status == "active" && playersArray.indexOf(object.name) === -1) {
                playersArray.push(object.name);
            }
        });

        logssystem.log("players.getActivePlayers()", playersArray);
        return playersArray;
    },

    getBannedPlayers: function (servers) {
        const playersArray = [];

        this.fetch(servers).forEach(object => {
            if (object.status == "banned" && playersArray.indexOf(object.name) === -1) {
                playersArray.push(object.name);
            }
        });

        logssystem.log("players.getBannedPlayers()", playersArray);
        return playersArray;
    },

    getNegativeCoinPlayers: function (servers) {
        const playersArray = [];

        this.fetch(servers).forEach(object => {
            if (object.coins < 0 && playersArray.indexOf(object.name) === -1) {
                playersArray.push(object.name);
            }
        });

        logssystem.log("players.getNegativeCoinPlayers()", playersArray);
        return playersArray;
    },

    setCoinsToZero: function (playerLogin, serverName) {

        const data = [];

        this.fetch(serverName).forEach(object => {
            if (object.coins < 0 && object.login == playerLogin) {
                object.coins = 0;

                logssystem.log(`players.setCoinsToZero(${playerLogin}, ${serverName})`, object.coins);
            }

            data.push(object);
        });

        requests.post(serverName.toString(), 'players.json', data);
    },

}