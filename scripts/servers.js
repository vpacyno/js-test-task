window.servers = {
    rows: {
        available: [],
        current: "production",
        rows: {
            production: {
                url: "/data/production/",
                name: "Production Server",
                status: "enabled"
            },
            staging: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "enabled"
            },
            dev: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "disabled"
            }
        },
        getRow: function (whereKey = '') {

        },
        updateRow: function (object) {

        },
        deleteRow: function (whereKey = '') {

        }
    },

    getAvailableServers: function () {

        const obj = this.rows.rows;
        const array = this.rows.available;
        let key;

        for (key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]["status"] == "enabled") {
                if (array.indexOf(key) === -1) {
                    array.push(key);
                }
            }
        }

        logssystem.log("servers.getAvailableServers()", array);
        return array;
    }

};



