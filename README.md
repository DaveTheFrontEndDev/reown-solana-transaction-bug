Reown Bug report - Solana/Wagmi Multichain implementation
=========================================================

## Running Example

1) Copy `.env.example` into new file `.env` and replace with project id

2) Run code example:
```
yarn install && yarn dev
```

* * *

MultiChain implementation
-------------------------

Multichciain solution implemented through documentation example [here](https://docs.reown.com/appkit/react/core/multichain)

* * *

Native connect button works when disconnecting solana wallet (phantom):  
  
Example: _1st example on page when you run `yarn dev`_
  

* * *

Bug 1) useDisconnect Issue
-------------------

useAppKit 'open' connection hook works, but solana disconnection hook does not disconnect the wallet  
  
Example: _2nd example on page when you run `yarn dev`_
  

* * *

Bug 2) Solana program interaction
--------------------------

When trying to interact with solana program per documentation [here (smart contract interaction)](https://docs.reown.com/appkit/react/core/installation?platform=solana), Issues encountered:

*   The documented [github code example](https://github.com/reown-com/web-examples/blob/main/dapps/web3modal/react-solana/src/App.tsx) uses old web3modal library, so besides the documentation snipits there are no replicatable examples that work:
  
*   When using the code example:  
      
    const { address, currentChain } = useAppKitAccount();  
    const { walletProvider, connection } = useAppKitProvider();  
      
    **connection** is not exported from useAppKitProvider, I did however find an undocumented hook called `useAppKitConnection` that appears to return this.  
    **walletProvider** is undefined when a wallet is connected

  
Example: _3rd example on page when you run `yarn dev`_