import * as jsonData from '../contracts/Survey.json';
const helpers = {
    initDrizzle: function (drizzle) {
        return new Promise(function (resolve, reject) {
            const unsubscribe = drizzle.store.subscribe(() => {
                const drizzleState = drizzle.store.getState();
                if (drizzleState.drizzleStatus.initialized) {
                    resolve({ loading: false, drizzleState, unsubscribe });
                }
            })
        });
    },
    getDeployedNetworks: function () {
        return new Promise(function (resolve, reject) {
            var deployedNetworks = [];
            Object.keys(jsonData.networks).forEach(id => {
                if (Number(id) === 1) { deployedNetworks.push('main'); }
                else if (Number(id) === 42) { deployedNetworks.push('kovan'); }
                else if (Number(id) === 3) { deployedNetworks.push('ropsten'); }
                else if (Number(id) === 4) { deployedNetworks.push('rinkeby'); }
                else { deployedNetworks.push('ganache'); }
            });
            resolve(deployedNetworks);
        })
    },
    getJSONFromFile: async function (files) {
        if (files.length <= 0) {
            return false;
        }
        return new Promise(async function (resolve, reject) {
            var fr = new FileReader();
            fr.onload = function (e) {
                var data = JSON.parse(e.target.result);
                resolve(data);
            }
            await fr.readAsText(files[0]);
        });

    },
};

export default helpers;