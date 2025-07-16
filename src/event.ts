import { Account, RpcProvider, Contract, ParsedEvent } from "starknet";
import * as util from "util";
import * as dotenv from "dotenv";
dotenv.config();

async function eventLogic() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_8",
  });

  const accountAddress = process.env.ACCOUNT_ADDRESS!;
  const privateKey = process.env.PK!;

  const account = new Account(provider, accountAddress, privateKey);

  const contractAddress =
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

  const { abi } = await provider.getClassAt(contractAddress);

  if (abi === undefined) {
    throw new Error("ABI not found");
  }

  const contract = new Contract(abi, contractAddress, provider);
  //Connect contract with account
  contract.connect(account);

  const { transaction_hash: txHash } = await contract.invoke("transfer", [accountAddress, 1]);
  const receipt = await provider.waitForTransaction(txHash);

  if (receipt.isSuccess()) {
    console.log("Transaction successful!");
    console.log("Parsed events:");

    const listEvents = contract.parseEvents(receipt);

    listEvents.forEach((event: ParsedEvent) => {
      console.log(util.inspect(event, false, null, true));
    });
  }
}

eventLogic();