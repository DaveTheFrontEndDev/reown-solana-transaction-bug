import './App.css'
import { AppKitProvider } from './AppKitProvider';
// import { WalletConnectButton } from './WalletConnectButton';
import { SolanaTransferButton } from './SolanaTransferButton';

function App() {

  
  return (
    <AppKitProvider>
      <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
      <h1>Reown Bug report - Solana/Wagmi Multichain implementation</h1>
      <hr/>
      <h2>MultiChain implementation</h2>
      <p>Multichciain solution implemented through documentation example <a href="https://docs.reown.com/appkit/react/core/multichain">here</a></p>
      <hr/>
      Native connect button works when disconnecting solana wallet (phantom):<br/>
      <br/>
      Example:<br/>
      <w3m-button/><br/>
      <hr/>
      <h2>Solana program interaction Bug</h2>
      When trying to interact with solana program per documentation <a href="https://docs.reown.com/appkit/react/core/installation?platform=solana">here (smart contract interaction)</a>
      <h3>Documentation Missing</h3>
        The documented <a href="https://github.com/reown-com/web-examples/blob/main/dapps/web3modal/react-solana/src/App.tsx">github code example</a> uses old web3modal library, so besides the documentation snipits there are no replicatable examples that work, and within the recently documented snippets, the following issues appear present:

        <br/>
          <h3>Code:</h3>
          When using the code example:
          <code>
          {`const { address, currentChain } = useAppKitAccount();
          const { walletProvider, connection } = useAppKitProvider();`}
          </code><br/>
          Example:<br/>
          <SolanaTransferButton/>
          <h3>Bug 1</h3>
          <b>walletProvider</b> is undefined when a wallet is connected
          <h3>Bug 2</h3>
          <b>connection</b> is not exported from useAppKitProvider, I did however find an undocumented hook called <code>useAppKitConnection</code> that appears to return this.<br/>
      <br/>
      </div>
    </AppKitProvider>
  )
}

export default App
