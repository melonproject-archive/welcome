# smart-contracts
A testing environment to compile and deploy solidity contracts.

## <a name="installation"></a> Installation on Ubuntu 15.10

1. Install latest version of <a href="https://github.com/ConsenSys/truffle">Truffle</a>:
   
    ```
    npm uninstall -g truffle
    git clone https://github.com/ConsenSys/truffle.git
    cd truffle
    npm install -g .
    ```

2. Update Solidity dependency of Truffle. In the same directory do:
    
    ```
    npm install -g npm-check-updates
    npm-check-updates
    npm-check-updates -u
    npm update
    ``` 


3. Install latest version of <a href="https://github.com/ethereumjs/testrpc">Testrpc</a>:

    ```
    npm uninstall -g testrpc
    git clone https://github.com/ethereumjs/testrpc.git
    cd testrpc
    npm install -g .
    ```
    
4. Install PodPort truffle-environment:

    ```
    git clone https://github.com/hedgesuisse/smart-contracts.git
    cd truffle-environment
    npm install -g bignumber.js
    truffle init
    rm contracts/MetaCoin.sol
    rm test/metacoin.js
    ```
    
5. To see if it worked, open a new console window and type:

    ```
    testrpc
    ```

6. In the original (truffle-environment directory) type for example:
    ```
    truffle test
    ```
