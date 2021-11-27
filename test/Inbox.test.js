// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Está capitalizado o Web3 porque é uma convenção para constructor functions
const web3 = new Web3(ganache.provider());
const { interface , bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('Deploys the contract', () => {
        assert.ok(inbox.options.address)
    }); 

    it('Has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, ['Hi there!'])
    });

    it('Can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
});



//////////////////////////////////////////////////////////////////////////////////////////////
// Para exemplificar o que seria um teste á classe Car
/* class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

// Originalmente estávamos a declarar para cada teste (it) a variavel "car", que, é igual para ambos os testes.
// O que fazemos para resolver isso é usar o beforeEach

let car; // Porque como definimos o beforeEach, uma constante definida dentro de uma função não é utilizável fora dela

beforeEach(() => {
    car = new Car();
})

describe('Car Class', () => {
    it('park should return a string', () => {
        //const car = new Car();
        assert.equal(car.park(), 'stopped'); // Diz se a função é igual ao output que queremos, neste caso, faz print de 'stopped'
    })

    it('drive should return a string', () => {
        //const car = new Car();
        assert.equal(car.drive(), 'vroom');
    })
}) */