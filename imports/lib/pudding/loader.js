import BigNumber from 'bignumber.js';
import web3 from '../ethereum/web3.js';
import Pudding from './pudding.js';
// Load Truffle file
import MetaCoin from '../../truffle/tests/environments/development/contracts/MetaCoin.sol.js';
MetaCoin.load(Pudding);
let meta = MetaCoin.deployed();

console.log(meta);
