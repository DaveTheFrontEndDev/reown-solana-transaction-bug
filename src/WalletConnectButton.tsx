import * as React from "react";
import { useDisconnect as useDisconnectSolana } from "@reown/appkit-solana/react";


import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export function WalletConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnectSolana();

  const connectWallet = async () => {
    open({
      view: "Connect",
    });
  };

  const disconnectWallet = async () => {
    console.log("Disconnecting - Begin");
    await disconnect();
    console.log("Disconnecting - Finish");
  };

  return (
    <button
      onClick={!isConnected ? connectWallet : disconnectWallet}
    >
      {!isConnected ? "Connect Wallet" : `Disconnect (${(address ?? "").substring(0,5)}...${(address ?? "").substring((address??"").length - 5,(address??"").length)})`}
    </button>
  );
}
