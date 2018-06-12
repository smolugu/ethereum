const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'coyote phrase muffin hungry despair expand word walk weird tattoo peace december',
  'https://rinkeby.infura.io/GBO7OvdHF6xZgX4BnBae'
);

const web3 = new Web3(provider);

// async cannot be used outside a function
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ date: bytecode, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
};
deploy();
