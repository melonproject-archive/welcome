# meteor-truffle
Basic integration of truffle into meteor.

## Installation

```
git clone https://github.com/blockchain-hacklab/meteor-truffle.git
cd meteor-truffle
meteor npm install
```

## Starting application
In above directory run:

```
meteor
```

and start an ethereum node (or TestRPC) w options similar to this

```
geth --rpc --rpccorsdomain="http://localhost:3000" --unlock=0 --testnet console
```

