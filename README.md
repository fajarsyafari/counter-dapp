# 🔮 Counter DApp (Web3 + React + Ethers.js)

This is a simple Web3 Counter DApp built using **React**, **Ethers.js**, and **Material UI**, integrated with the **Ethereum Sepolia testnet**. The app allows users to connect their wallet (via MetaMask), increment/decrement a counter stored on-chain, and view transaction history.

---

## 📦 Tech Stack

* **React** – Frontend UI framework
* **Ethers.js** – Interact with Ethereum blockchain
* **Material UI (MUI)** – Component styling library
* **Solidity** – Smart contract language
* **Sepolia Testnet** – Ethereum test network
* **MetaMask** – Wallet for Web3 interactions

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/fajarsyafari/counter-dapp.git
cd counter-dapp
```

### 2. Install Dependencies

Make sure you have **Node.js** installed (version 16+ recommended).

```bash
npm install
```

### 3. Create & Deploy Smart Contract

You need to deploy a Solidity smart contract to the **Sepolia testnet**.

#### Example Contract (`Counter.sol`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count;

    function getCount() public view returns (uint256) {
        return count;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Counter is zero");
        count -= 1;
    }
}
```

#### Deploy using Hardhat or Remix

* Use **Remix** ([https://remix.ethereum.org/](https://remix.ethereum.org/)) for quick deployment.
* Set the environment to **Injected Provider - MetaMask**.
* Compile and deploy `Counter.sol` to Sepolia.
* After deployment, save the contract **address** and **ABI**.

### 4. Set Up Contract Info

Edit the following file:

```js
// contract.js
export const CONTRACT_ADDRESS = "0xYourContractAddress";
export const CONTRACT_ABI = [ /* paste your ABI here */ ];
```

### 5. Run the React App

```bash
npm run dev   # or: npm start
```

Open your browser and go to: `http://localhost:5173` (or the port shown in terminal)

---

## 🧠 How It Works

### 🔗 Wallet Connection

The app detects MetaMask via `window.ethereum`, and uses `ethers.js` to:

* Connect to the user's wallet.
* Request a signature to simulate login.
* Display wallet address and ETH balance.

### ♻️ Smart Contract Interactions

The app calls `increment()` and `decrement()` functions on-chain:

* **Transactions are sent via the connected signer.**
* The app listens for transaction confirmations before updating the UI.
* All transactions are saved in local state as "history".

### 💡 UI/UX Features

* **Material UI** is used to create responsive cards, buttons, and layouts.
* Includes:

  * Transaction feedback via `Snackbar`
  * Conditional UI for connected/disconnected states
  * Link to view transaction on [Etherscan Sepolia](https://sepolia.etherscan.io/)

---

## 📷 Screenshots

> Coming soon... (Add screenshots of connected state, increment action, transaction history, etc.)

---

## 🔐 Security Notes

* This DApp is for **educational/demo purposes only**.
* It does **not** handle user authentication or sensitive data securely.
* Always audit smart contracts before deploying to **mainnet**.

---

## 🌍 Roadmap Ideas

* ✅ Deploy to Sepolia
* 🔲 Add Faucet integration for test ETH
* 🔲 Implement wallet reconnect persistence
* 🔲 UI themes (Glassmorphism, Dark mode toggle)
* 🔲 Deploy to Vercel/Netlify

---

## 🛠️ Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## 😋 FAQ

### Q: What is Sepolia?

> Sepolia is a testnet network used for testing Ethereum smart contracts. It behaves like Ethereum mainnet but uses test ETH (free).

### Q: Why sign a message on login?

> Signing a message proves wallet ownership without needing passwords or accounts.

### Q: Can this DApp work on mainnet?

> Yes, but you need to:
>
> * Redeploy contract to Ethereum mainnet.
> * Update `CONTRACT_ADDRESS` and switch wallet network.

---

## 📬 Contact

If you have questions, feel free to open an issue or reach me at:

**GitHub:** [@fajarsyafari](https://github.com/fajarsyafari)
**Twitter:** [@your-twitter](https://twitter.com/your-twitter)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
