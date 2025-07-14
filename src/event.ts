import { RpcProvider } from "starknet";

async function filterTransferEvents() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_8",
  });

  const contractAddress = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
  const transferSelector = "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9";

  // Filter for Transfer events (small range)
  const events = await provider.getEvents({
    address: contractAddress,
    keys: [[transferSelector]], // Only Transfer events
    from_block: { block_number: 8000 }, // Small range
    to_block: { block_number: 9000 },   // Only 1000 blocks
    chunk_size: 100
  });

  console.log(`Found ${events.events.length} Transfer events`);

  // Display each Transfer event
  events.events.forEach((event, index) => {
    console.log(`\n--- Transfer Event ${index + 1} ---`);
    console.log("From:", event.keys[1]);
    console.log("To:", event.keys[2]);
    console.log("Amount (hex):", event.data[0]);
    console.log("Amount (decimal):", parseInt(event.data[0], 16));
    console.log("Block:", event.block_number);
    console.log("Transaction:", event.transaction_hash);
  });
}

filterTransferEvents();
