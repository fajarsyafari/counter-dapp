const hre = require("hardhat");

async function main() {
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(); // ethers v6: deploy() langsung cukup

  console.log("Counter deployed to:", counter.target); // ethers v6: pakai .target
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
