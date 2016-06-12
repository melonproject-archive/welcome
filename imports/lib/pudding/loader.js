import Pudding from './pudding.js';
// Import Truffle file
import MetaCoin from '../../truffle/environments/development/contracts/MetaCoin.sol.js';

// Load Truffle file
MetaCoin.load(Pudding);
let meta = MetaCoin.deployed();
console.log(meta);
