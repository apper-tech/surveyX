import dbHelpers from '../_helpers/dbhelpers'


const SurveyHandler = {
    AddSurvey: async function (drizzle, values) {
        const { Survey } = drizzle.contracts;
        const { title, description, address, option1, option2, option3, surveyCode, prizeEth } = values;
        return await new Promise(function (resolve, reject) {
            let survey = {
                title: title,
                description: description,
                address: address,
                option1: option1,
                option2: option2,
                option3: option3,
                surveyCode: surveyCode,
                prizeEth: prizeEth,
                creationDate: new Date().toLocaleString()
            }
            SurveyHandler.signTransaction(drizzle, survey, 1).then(function (res) {
                survey['signiture'] = res.sign;
                survey['serverSigniture'] = res.serverSign;

                dbHelpers.Add(survey, 0).then(function (response) {
                    let data = response.data;
                    if (data.ok) {
                        //bytes12 _id,address _owner,string memory _data
                        Survey.methods.addSurvey(data.insertedId, survey.address, JSON.stringify(survey))
                            .send({ from: survey.address, value: SurveyHandler.EthToWei(drizzle, survey.prizeEth) })
                            .on('receipt', receipt => {
                                Survey.methods.getBalance().call().then((data) => {
                                    resolve({ receipt, survey });
                                })
                            });
                    }
                });
            })
        });
    },
    signTransaction: function (drizzle, data, type) {
        return new Promise(function (resolve, reject) {
            dbHelpers.config.getKey().then((key) => {
                let serverKey = key.data;
                let web3 = drizzle.web3.eth;
                web3.personal.sign(SurveyHandler.surveyString(data, type), data.address, function (error, result) {
                    if (!error) {
                        let serverSign = web3.accounts.sign(result.toString(), serverKey);
                        let sign = result;
                        resolve({ serverSign, sign })
                    }
                    else
                        reject(error);
                });
            });
        })
    },
    surveyString: function (data, type) {
        let msg = '';
        if (type === 1)
            msg = `
            Title: ${data.title}\n
            Description:${ data.description}\n
            Address: ${data.address}\n
            Option 1:${ data.option1}\n
            Option 2: ${data.option2}\n
            Option 3: ${data.option3}\n
            Survey Code: ${data.surveyCode}\n
            Prize in Eth: ${data.prizeEth}\n
            Creation Date: ${new Date().toLocaleString()}`;
        if (type === 2)
            msg = `
            Address: ${data.address}\n
            Selected Option:${ data.selectedOption}\n`;
        return msg;
    },
    EthToWei: function (drizzle, eth) {
        return drizzle.web3.utils.toWei(eth, 'ether')
    },
    WeiToEth: function (drizzle, wei) {
        return drizzle.web3.utils.fromWei(wei, 'ether')
    },
    GetSurveyList: async function (drizzle, address) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.getSurveyByAddress(address).call().then(function (Id) {
                if (Id != "done") {
                    dbHelpers.Find(Id, 0).then(function (res) {
                        if (!res.data) { reject('no data') }
                        let survey = res.data;
                        dbHelpers.Find(null, 1,
                            {
                                participant: true,
                                surveyId: survey["_id"]
                            }).then(function (part) {
                                survey["participants"] = part.data;
                                resolve(survey);
                            });

                    });
                }
            });
        });
    },

    //deparced
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
        return await new Promise(async function (resolve, reject) {
            resolve(await Survey.methods.surveyExsist(address).call());
        });
    },
    CastVote: async function (drizzle, address, Sid, option) {
        //const { Survey } = drizzle.contracts;
        let participant = {
            address: address,
            surveyId: Sid,
            selectedOption: option
        };
        return await new Promise(function (resolve, reject) {
            SurveyHandler.signTransaction(drizzle, participant, 2).then(function (res) {
                participant['signiture'] = res.sign;
                participant['serverSigniture'] = res.serverSign;
                dbHelpers.Add(participant, 1).then(function (res) {
                    if (!res.data) { reject('no data') }
                    let part = res.data.ops[0];
                    delete part["_id"];
                    delete part["surveyId"];
                    resolve(part)
                    //string memory _id,string memory _sid,address _owner
                    /* Survey.methods.addParticipation(res.data.insertedId, Sid, address).send()
                        .on('receipt', receipt => resolve(receipt)); */
                })
            })
        });
    },
    GetWinnerAddress: async function (drizzle, survey) {
        const { Survey } = drizzle.contracts;
        let rand = Math.random() * (survey.participants.length - 1) + 1;
        return await new Promise(function (resolve, reject) {
            let winner = survey.participants[rand - 1].address;
            Survey.methods.endSurvey(survey["_id"], winner, survey.prizeEth).send()
                .on('receipt', receipt => resolve(winner));
        });
    },
    ClaimPrize: async function (drizzle, address, sign) {
        //function claimPrize(address _winner,bytes32 msgHash, uint8 v, bytes32 r, bytes32 s)
        const { Survey } = drizzle.contracts;
        let signature = sign.signiture;
        let web3 = drizzle.web3;
        signature = signature.substr(2);
        let r = '0x' + signature.slice(0, 64);
        let s = '0x' + signature.slice(64, 128);
        let v = '0x' + signature.slice(128, 130);
        let v_decimal = web3.utils.toDecimal(v);
        let msg = web3.utils.sha3(SurveyHandler.surveyString(sign, 1));
        console.log(`'${address}','${msg}', ${v_decimal}, '${r}', '${s}'`);


        return await new Promise(function (resolve, reject) {
            console.log(address);

            Survey.methods.claimPrize(address, msg, v_decimal, r, s).call().then((done) => {
                resolve(done);
            })
        });
    },
    GetSurveyByCode: async function (drizzle, code) {
        return await new Promise(function (resolve, reject) {
            dbHelpers.Find(null, 0,
                {
                    code: true,
                    surveyCode: code
                }).then(function (res) {
                    if (!res.data) { reject('no ') }
                    resolve(res.data);
                })
        });
    },
    GetParticipantByAddress: async function (address, survey) {
        return new Promise(function (resolve, reject) {
            dbHelpers.Find(null, 1,
                {
                    participant: true,
                    surveyId: survey["_id"]
                }).then(function (part) {
                    part.data.forEach((item) => {
                        if (item.address === address) {
                            resolve(item);
                        }
                    })
                    resolve({});
                });
        })
    },
    CancelSurvey: async function (drizzle, owner) {
        const { Survey } = drizzle.contracts;
        return await new Promise(function (resolve, reject) {
            Survey.methods.cancelSurvey(owner).send()
                .on('receipt', receipt => resolve(receipt));
        });
    }
};

export default SurveyHandler;