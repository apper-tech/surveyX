const axios = require('axios');

const dbHelpers = {
    insertURL:
        [
            '/addSurvey',
            '/addParticipant'
        ],
    listURL:
        [
            '/getSurvey',
            '/getParticipant'
        ],
    configURL:
        [
            '/getKey'
        ],
    Add: async function (item, col) {
        return new Promise(function (resolve, reject) {
            axios
                .post(dbHelpers.insertURL[col], item)
                .then((res) => {
                    resolve(res);
                })
                .catch(err => {
                    console.error(err);
                });
        })
    },
    Find: async function (_Id, col, extra) {
        return new Promise(function (resolve, reject) {
            let params = {};
            if (_Id)
                params['Id'] = _Id;
            else {
                if (extra.participant)
                    params = {
                        "surveyId": extra.surveyId
                    };
                if (extra.code)
                    params = {
                        "surveyCode": extra.surveyCode
                    };
            }
            axios.get(dbHelpers.listURL[col], { params }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                console.error(err);
            })
        })
    },
    config: {
        getKey: function () {
            return new Promise(function (resolve, reject) {
                axios.get(dbHelpers.configURL[0]).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    console.error(err);
                })
            });
        }
    }
};
export default dbHelpers;