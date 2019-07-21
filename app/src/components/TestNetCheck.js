import React from 'react';
import helpers from '../_helpers/helpers';
import TestNetLayout from '../_layout/TestNet';
import HomeScreen from '../components/Home';

class TestNetCheck extends React.Component {
    state = {
        loading: true, drizzleState: null, networks: null, currentNetwork: null
    }
    componentDidMount() {
        const { drizzle } = this.props;
        helpers.initDrizzle(drizzle).then((state) => {
            this.setState(state);
        }).then(() => {
            this.checkWeb3(drizzle);
        });
        helpers.getDeployedNetworks().then((networks) => {
            const dNet = [];
            if (networks.some(v => v === 'main')) {
                dNet.push({ id: 1, title: 'Ethereum', subtitle: 'Ethereum main network', body: ' NET Ethereum (ETH) Blockchain' });
            }
            if (networks.some(v => v === 'kovan')) {
                dNet.push({ id: 42, title: 'Kovan', subtitle: 'Kovan Testnet', body: 'TESTNET Kovan (ETH) Blockchain' });
            }
            if (networks.some(v => v === 'ropsten')) {
                dNet.push({ id: 3, title: 'Ropsten', subtitle: 'Ropsten Testnet', body: ' TESTNET Ropsten (ETH) Blockchain' });
            }
            if (networks.some(v => v === 'rinkeby')) {
                dNet.push({ id: 4, title: 'Rinkeby', subtitle: 'Rinkeby Testnet', body: 'TESTNET Rinkeby (ETH) Blockchain' });
            }
            if (networks.some(v => v === 'ganache')) {
                dNet.push({ id: 99, title: 'Ganache', subtitle: 'Ganache Local Testnet', body: 'TESTNET Ganache (ETH) Blockchain' });
            }


            this.setState({ networks: dNet });
        })
    }
    async checkWeb3(drizzle) {
        drizzle.web3.eth.net.getNetworkType().then(networkName => {
            if (networkName === 'private')
                this.setState({ currentNetwork: 'ganache' });
            else this.setState({ currentNetwork: networkName });
        });
    }
    render() {
        if (!this.state.networks) return "loading...";
        if (this.state.networks.some(v => v.title.toLowerCase() === this.state.currentNetwork))
            return (<HomeScreen></HomeScreen>);
        else
            return (<TestNetLayout networks={this.state.networks} currentNetwork={this.state.currentNetwork}></TestNetLayout>);
    }
}
export default TestNetCheck;