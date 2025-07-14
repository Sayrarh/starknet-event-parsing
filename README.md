# Starknet Event Parser

A simple TypeScript example demonstrating how to parse events from Starknet smart contract transactions.

## Quick Start

### 1. Clone the Repository
```bash
git clone "https://github.com/Sayrarh/starknet-event-parsing.git"
cd starknet-event-parser
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Install dotenv (if not already included)
```bash
yarn add dotenv
```

### 4. Environment Setup

Create a `.env` file in the root directory:

```env
ACCOUNT_ADDRESS=0x...
PK=0x..
```


Replace with your actual account address and private key

### 5. Configure Contract Details

Edit the main script (`src/event.ts`) to specify:

**Contract Address**: 
```typescript
const contractAddress = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"; // STRK token
```

### 6. Run the Parser
```bash
yarn dev
```

## Expected Output

The script will:
1. Connect to your Starknet account
2. Execute the specified contract function
3. Wait for transaction confirmation
4. Parse and display all emitted events

Example output:
```
Transaction successful!
Parsed events:

--- Event 1 ---
{
  'src::strk::erc20_lockable::ERC20Lockable::Transfer': {
    from: 567744432998430945616227889691169592822065141508980464357521607863522245033n,
    to: 567744432998430945616227889691169592822065141508980464357521607863522245033n,
    value: 1n
  },
   block_hash: '0x22ef94fe389731957580a3580bd4bd145e5a1bfa2c2a217c925943dbfc7e39a',
   block_number: 1004294,
   transaction_hash: '0x76593debd30ecf76cbea02d0de5565e0aef32842f70d10b8c01295a4c09eda'
}
```

## Customization Examples

### Different Contracts
```typescript
// ERC20 Token
await eventLogic(
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  "transfer",
  [recipient, amount]
);

// NFT Contract  
await eventLogic(
  "0x... nft contract address",
  "mint",
  [recipient, tokenId]
);

// Custom Contract
await eventLogic(
  "0x... your contract address", 
  "your_function_name",
  [arg1, arg2, arg3]
);
```


## Project Structure

```
├── src/
│   └── event.ts          # Main event parsing script
├── .env                  # Environment variables (create this)
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
└── README.md           # Read it
```

## Dependencies

- `starknet` - Starknet JavaScript SDK
- `dotenv` - Environment variable management
- `typescript` - TypeScript compiler

## Configuration

### Network
Currently configured for **Starknet Sepolia Testnet**:
```typescript
nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_8"
```

To use mainnet, change to:
```typescript
nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_8"
```

### Account Setup
- Use Braavos, ArgentX, or any Starknet wallet
- Export your account details
- Fund your testnet account from [Starknet Faucet](https://starknet-faucet.vercel.app/)


### Troubleshooting

**"ABI not found"**
- Check if contract address is correct
- Verify you're on the right network

**"Transaction failed"**
- Ensure account has sufficient funds
- Check function arguments are correct
- Verify function exists in contract

**"Account not found"**
- Double-check account address and private key
- Ensure account exists on the network (sepolia in this case)

###  Reference
- [Starknet.js SDK](https://www.starknetjs.com)