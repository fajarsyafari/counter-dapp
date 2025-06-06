import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  AppBar, Toolbar, Typography, Button, Container,
  Card, CardContent, Grid, Box, Divider, Alert, Snackbar, Link
} from "@mui/material";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setAlert("🦊 MetaMask not found");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const newSigner = await newProvider.getSigner();
      const userAddress = await newSigner.getAddress();

      // Signature (login)
      const message = "Please sign to login to Counter DApp";
      await newSigner.signMessage(message);

      const userBalance = await newProvider.getBalance(userAddress);
      const balanceInEth = ethers.formatEther(userBalance);

      const counterContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        newSigner
      );
      const current = await counterContract.getCount();

      setProvider(newProvider);
      setSigner(newSigner);
      setAccount(userAddress);
      setBalance(parseFloat(balanceInEth).toFixed(4));
      setContract(counterContract);
      setCount(Number(current));
      setHistory([]);
      setAlert("🔓 Wallet connected!");
    } catch (err) {
      console.error("Connection failed:", err);
      setAlert("❌ Failed to connect wallet.");
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setBalance(null);
    setContract(null);
    setCount(0);
    setHistory([]);
    setAlert("🔌 Wallet disconnected.");
  };

  const addToHistory = (method, hash) => {
    const time = new Date().toLocaleString();
    setHistory((prev) => [
      ...prev,
      {
        method,
        hash,
        time,
      },
    ]);
  };

  const increment = async () => {
    if (!contract) return;
    const tx = await contract.increment();
    await tx.wait();
    const current = await contract.getCount();
    setCount(Number(current));
    addToHistory("Increment", tx.hash);
    setAlert("✅ Increment successful.");
  };

  const decrement = async () => {
    if (!contract) return;
    const tx = await contract.decrement();
    await tx.wait();
    const current = await contract.getCount();
    setCount(Number(current));
    addToHistory("Decrement", tx.hash);
    setAlert("✅ Decrement successful.");
  };

  const handleTopup = () => {
    setAlert("💸 Top-up is only a simulation (not connected to faucet).");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Counter DApp (Web3)
          </Typography>
          {account ? (
            <Button color="inherit" onClick={disconnectWallet}>
              Disconnect
            </Button>
          ) : (
            <Button color="inherit" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {account ? (
          <>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">👤 Wallet Info</Typography>
                <Typography>Address: {account}</Typography>
                <Typography>Balance: {balance} ETH</Typography>
                <Typography>Status: Connected</Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  🧮 Count: {count}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={increment}>
                      ➕ Increment
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={decrement}
                      disabled={count === 0}
                    >
                      ➖ Decrement
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="success" onClick={handleTopup}>
                      💸 Top-up
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6">🧾 Transaction History</Typography>
                <Divider sx={{ mb: 1 }} />
                {history.length === 0 ? (
                  <Typography color="textSecondary">No transactions yet.</Typography>
                ) : (
                  history
                    .slice()
                    .reverse()
                    .map((item, idx) => (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <strong>{item.method}</strong> |{" "}
                        <Link
                          href={`https://sepolia.etherscan.io/tx/${item.hash}`}
                          target="_blank"
                          rel="noopener"
                        >
                          {item.hash.slice(0, 10)}...
                        </Link>{" "}
                        | {item.time}
                      </Box>
                    ))
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Please connect your wallet to use this DApp.
              </Typography>
              <Button variant="contained" onClick={connectWallet}>
                🔌 Connect Wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>

      <Snackbar
        open={!!alert}
        autoHideDuration={3000}
        onClose={() => setAlert("")}
      >
        <Alert severity="info" onClose={() => setAlert("")}>
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
