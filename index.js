import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { SolanaTracker } from "solana-swap";
import { performSwap, SOL_ADDR } from "./lib.js";
import base58 from "bs58";

const RPC_URL = "https://solana-mainnet.g.alchemy.com/v2/tVh7ckM3iAFznLTMVCLYxbk3FiEb3a9h"; // Quicknode or Helius give good rpc urls
const PRIVKEYS = [
    "", // private key of the first wallet in base58
    "", // private key of the second wallet in base58
    "", // private key of the third wallet in base58
    "", // private key of the fourth wallet in base58
    ""  // private key of the fifth wallet in base58
];
const TOKEN_ADDR = ""; // Put the address of the token you want to bump here

const MIN_SOL_BUY_AMOUNT = 0.011; // minimum amount of SOL per buy
const MAX_SOL_BUY_AMOUNT = 0.033; // maximum amount of SOL per buy

const SOL_BUY_AMOUNT = Math.random() * (MAX_SOL_BUY_AMOUNT - MIN_SOL_BUY_AMOUNT) + MIN_SOL_BUY_AMOUNT; // random buy amount within specified range

const FEES = 0.0001; // adjust the fees
const SLIPPAGE = 3; // adjust the slippage

async function swap(tokenIn, tokenOut, solanaTracker, keypair, connection, amount) {
    try {
        const swapResponse = await solanaTracker.getSwapInstructions(
            tokenIn, // From Token
            tokenOut, // To Token
            amount, // Amount to swap
            SLIPPAGE, // Slippage
            keypair.publicKey.toBase58(), // Payer public key
            FEES, // Priority fee (Recommended while network is congested)
            false // Force legacy transaction for Jupiter
        );

        console.log("Send swap transaction...");

        const tx = await performSwap(swapResponse, keypair, connection, amount, tokenIn, {
            sendOptions: { skipPreflight: true },
            confirmationRetries: 30,
            confirmationRetryTimeout: 1000,
            lastValidBlockHeightBuffer: 150,
            resendInterval: 1000,
            confirmationCheckInterval: 1000,
            skipConfirmationCheck: true
        });

        console.log("Swap sent : " + tx);
    } catch (e) {
        console.log("Error when trying to swap: ", e);
    }
}

async function getTokenBalance(connection, owner, tokenAddr) {
    try {
        const result = await connection.getTokenAccountsByOwner(owner, { mint: new PublicKey(tokenAddr) });
        const info = await connection.getTokenAccountBalance(result.value[0].pubkey);
        if (info.value.uiAmount == null) throw new Error('No balance found');
        return info.value.uiAmount;
    } catch (e) {
        console.log("Error when fetching token balance: ", e);
        return 0;
    }
}

async function main() {
    const keypairs = PRIVKEYS.map(privkey => Keypair.fromSecretKey(base58.decode(privkey)));
    const solanaTracker = new SolanaTracker(keypairs[0], RPC_URL);
    const connection = new Connection(RPC_URL);

    while (true) {
        // Buy
        const buyPromises = keypairs.map(keypair => 
            swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connection, SOL_BUY_AMOUNT)
        );
        await Promise.all(buyPromises);

        // Sell
        const sellPromises = keypairs.map(async keypair => {
            const balance = await getTokenBalance(connection, keypair.publicKey, TOKEN_ADDR);
            const SELL_PERCENTAGE = 0.99; // Sell 99% of the token balance
            const sellAmount = balance * SELL_PERCENTAGE;
            await swap(TOKEN_ADDR, SOL_ADDR, solanaTracker, keypair, connection, sellAmount);
        });
        await Promise.all(sellPromises);

        // Pause
        await new Promise(r => setTimeout(r, 2000)); // pause in milliseconds
    }
}

main();
