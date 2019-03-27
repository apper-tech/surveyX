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
            const net = jsonData.networks;
            if (net[1]) { deployedNetworks.push('main'); }
            if (net[42]) { deployedNetworks.push('kovan'); }
            if (net[3]) { deployedNetworks.push('ropsten'); }
            if (net[4]) { deployedNetworks.push('rinkeby'); }
            resolve(deployedNetworks);
        })
    }
};

export default helpers;