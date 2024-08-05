# BetaTestBumpBot

This bot will buy and sell tokens automatically, keeping you at the top of Pump.fun's main page or inflating volumes on Raydium.

## Setting up the Bot
git clone https://github.com/Recession-Man/BetaTestBumpBot.git

### Node.js Installation

Node.js installation is required to set up the bot:

- For Windows and Mac OS, follow the official Node.js download link and choose the latest version.
- For Linux, execute the following command in the terminal:
  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  nvm install 22




Verify Node.js Installation
To check if Node.js is installed:

For Windows, open cmd.exe and run the command:

sh
Copy code
node -v
For MacOS & Linux, open terminal and run the same command:

sh
Copy code
node -v
It should return the version of Node.js.

Installing Dependencies
In order to run the bot, you need to open cmd.exe or terminal and navigate to the BetaTestBumpBot folder with the command:

sh
Copy code
cd /path/to/the/folder
Then, in cmd.exe or terminal, run the following command:

sh
Copy code
npm install
It should install all the dependencies in a new folder named node_modules.

Setting up the Bot
You have three things to set up within the index.js file:

RPC endpoint to connect to the Solana blockchain (Chainstack, Quicknode, or Helius provide reliable free RPC endpoints).
Private key of the wallet that will execute buy and sell operations.
Contract address of the token you intend to bump.
The variables are at the top of the script:

javascript
Copy code
const RPC_URL = ""; // 
const PRIVKEY = ""; // 
const TOKEN_ADDR = ""; // 
Run the Bump Bot
To run the bump bot, in cmd.exe or terminal, execute the following command:

sh
Copy code
node index.js
The bot will buy the token four times and then sell all the balance.

Adjustments
Adjusting the Number of Buys
If you want to adjust the number of times to buy before selling, you can find it at the bottom of the script:

javascript
Copy code
// Buy
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
If you want to buy only 2 times, for example, you just need to remove 2 lines, like this:

javascript
Copy code
// Buy
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connexion, SOL_BUY_AMOUNT));
Adjusting the Buy Amount, Slippage, and Fees
You can set the minimum and maximum amount to buy where the bot will randomly choose an amount between the two values:

javascript
Copy code
const MIN_SOL_BUY_AMOUNT = ""; //
const MAX_SOL_BUY_AMOUNT = ""; //
The same goes for the slippage, which can be set at the top of the script:

javascript
Copy code
const SLIPPAGE = 
The same applies for the fees (higher fees = faster speed):

javascript
Copy code
const FEES =
Happy bumping!

sql
Copy code
