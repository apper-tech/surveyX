const SurveyHandler = {
    AddSurvey: async function (drizzle, values) {
        const { Survey } = drizzle.contracts;
        const { title, description, address, option1, option2, option3, surveyCode } = values;
        return await new Promise(function (resolve, reject) {
            Survey.methods.addSurvey(title, description, address, option1, option2, option3, surveyCode).send()
                .on('receipt', receipt => resolve(receipt));
        });
    },
    GetSurveyList: async function (drizzle, address) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyByAddress(address).call().then(function (rows) {
                Survey.methods.getSurveyResultsByCode(rows[7]).call().then(function (res) {
                    rows[9] = res[0];
                    rows[10] = res[1];
                    rows[11] = res[2];
                    resolve(rows);
                });
            });
        });
    },
    GetSurveyResult: async function (drizzle, code) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyResultsByCode(code).call().then(function (res) {
                resolve(res);
            });
        });
    },
    CheckSurveyExsist: async function (drizzle, address) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.surveyExsist(address).call().then(function (res) {
                resolve(res);
            });
        });
    },
    CastVote: async function (drizzle, address, code, option) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.castVote(address, option, code).send()
                .on('receipt', receipt => resolve(receipt));
        });
    },
    GetWinnerAddress: async function (drizzle, code, numOfPart) {
        const { Survey } = drizzle.contracts;
        let rand = Math.random() * (numOfPart - 1) + 1;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyWinnerCode(code, rand).call().then(function (res) {
                resolve(res);
            });
        });
    },
    CheckSurveyExsistByCode: async function (drizzle, code) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyAddressByCode(code).call().then(function (res) {
                if (res.toString() === "0x0000000000000000000000000000000000000000")
                    resolve(false);
                else
                    resolve(true);
            });
        });
    },
    GetSurveyByCode: async function (drizzle, code) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyAddressByCode(code).call().then(function (res) {
                Survey.methods.getSurveyByAddress(res).call().then(function (data) {
                    resolve(data);
                });
            });
        });
    }
};

export default SurveyHandler;