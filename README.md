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

Bug 1) `useAppKitProvider` returning `walletProvider` as undefined when a solana wallet is connected
-------------------

When trying to interact with solana program per documentation [here (smart contract interaction)](https://docs.reown.com/appkit/react/core/installation?platform=solana), Issues encountered:
  
   When using the code example:  

```
    const { address, currentChain } = useAppKitAccount();  
    const { walletProvider, connection } = useAppKitProvider();  
```
      
**walletProvider** is still `undefined` when a phantom wallet is connected
  

* * *

Bug 2) `useAppKitProvider` not exporting `connection` as documented in reown documentation
--------------------------

When trying to interact with solana program per documentation [here (smart contract interaction)](https://docs.reown.com/appkit/react/core/installation?platform=solana), Issues encountered:
  
   When using the code example:  

```
    const { address, currentChain } = useAppKitAccount();  
    const { walletProvider, connection } = useAppKitProvider();  
```
      
**connection** is not exported from useAppKitProvider, I did however find an undocumented hook called `useAppKitConnection` that appears to return this. 