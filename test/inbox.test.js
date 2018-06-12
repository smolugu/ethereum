const assert = require('assert');
const ganache = require('ganache-cli');
// upper case Web3 - constructor function
// lower case web3 - instance of Web3
const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all unlocked accounts available on ganache
  // every function we call with web3 is asynchronous in nature
  // means it always returns a promise
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy our contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000' });
  inbox.setProvider(provider);
});

// beforeEach(() => {
//   // get a list of all unlocked accounts available on ganache
//   // every function we call with web3 is asynchronous in nature
//   // means it always returns a promise
//   web3.eth.getAccounts().then(accounts);
//   // use one of those accounts to deploy our contract
//   new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode, arguments: ['Hi there!'] })
//     .send({ from: accounts[0], gas: '1000000' }).then(inbox);
//   inbox.setProvider(provider);
// });

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox);
    assert.ok(inbox.options.address);
  });
  it('initial message set', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});



// class Car {
//   park() {
//     return "stopped";
//   }
//
//   drive() {
//     return "vroom";
//   }
// }
//
// let car;
//
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('can drive', () => {
//     assert.equal(car.drive(),'vroom');
//   })
// });
