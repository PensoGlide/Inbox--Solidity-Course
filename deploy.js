// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } =  require('./compile');
const provider = new HDWalletProvider(
    'layer patrol draft lumber garage theme boost flush resist obey slot picnic', // Wallet Mnemonic
    'https://rinkeby.infura.io/v3/93e37a31992643abb62ca64f80c266f5'               // Infura Rinkeby Test Network address
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0])

    result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()
};
deploy()