// import { EURR_ABI } from "@/api/web3/EURR_ABI";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import React from "react";
import {
  SystemProgram,
  PublicKey,
  Keypair,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";

type SolanaTransferButtonProps = {
  fromWallet: string;
  toWallet: string;
  amount: number | string;
  token: "EURR";
  loading: boolean;
  onComplete: (transactionHash: string) => void;
};


// React solana example (using old libraries)
// https://github.com/reown-com/web-examples/tree/main/dapps/web3modal/react-solana/src
// Multichain integration for sol and wagmi
// https://docs.reown.com/appkit/react/core/multichain
// Solana smart contract integration
// https://docs.reown.com/appkit/react/core/installation

function deserializeCounterAccount(data?: Buffer): { count: number } {
  if (data?.byteLength !== 8) {
    throw Error('Need exactly 8 bytes to deserialize counter')
  }

  return {
    count: Number(data[0])
  }
}

export function SolanaTransferButton() {
  function deserializeCounterAccount(data?: Buffer): { count: number } {
    if (data?.byteLength !== 8) {
      throw Error("Need exactly 8 bytes to deserialize counter");
    }

    return {
      count: Number(data[0]),
    };
  }

  const { address, currentChain } = useAppKitAccount();

const { walletProvider, connection } = useAppKitProvider()

const { connection: connectionV2 } = useAppKitConnection();

  
async function onIncrementCounter() {
  const PROGRAM_ID = new PublicKey('Cb5aXEgXptKqHHWLifvXu5BeAuVLjojQ5ypq6CfQj1hy')

    // Display Values for walletprovider and connection
    console.log("Wallet Provider:", walletProvider)
    console.log("Connection:", connection)

  const counterKeypair = Keypair.generate()
  const counter = counterKeypair.publicKey

  const balance = await connectionV2.getBalance(walletProvider.publicKey)
  if (balance < LAMPORTS_PER_SOL / 100) {
    throw Error('Not enough SOL in wallet')
  }

  const COUNTER_ACCOUNT_SIZE = 8
  const allocIx: TransactionInstruction = SystemProgram.createAccount({
    fromPubkey: walletProvider.publicKey,
    newAccountPubkey: counter,
    lamports: await connection.getMinimumBalanceForRentExemption(COUNTER_ACCOUNT_SIZE),
    space: COUNTER_ACCOUNT_SIZE,
    programId: PROGRAM_ID
  })

  const incrementIx: TransactionInstruction = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      {
        pubkey: counter,
        isSigner: false,
        isWritable: true
      }
    ],
    data: Buffer.from([0x0])
  })

  const tx = new Transaction().add(allocIx).add(incrementIx)

  tx.feePayer = walletProvider.publicKey
  tx.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash

  await walletProvider.signAndSendTransaction(tx, [counterKeypair])

  const counterAccountInfo = await connection.getAccountInfo(counter, {
    commitment: 'confirmed'
  })

  if (!counterAccountInfo) {
    throw new Error('Expected counter account to have been created')
  }

  const counterAccount = deserializeCounterAccount(counterAccountInfo?.data)

  if (counterAccount.count !== 1) {
    throw new Error('Expected count to have been 1')
  }

  console.log(`[alloc+increment] count is: ${counterAccount.count}`);
}

  return (
    <button
      onClick={onIncrementCounter}
    >
      Solana Program Example
    </button>
  );
}
