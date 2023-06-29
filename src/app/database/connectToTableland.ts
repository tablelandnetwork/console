import { Database, Registry, Validator } from "@tableland/sdk";
import { type Signer } from "ethers";

let tablelandConnection: TablelandConnections;

interface TablelandConnections {
  database: Database;
  validator: Validator;
  registry?: Registry;
}

export function getTablelandConnection(): TablelandConnections {
  return tablelandConnection;
}

export function startTableLand(
  signer: Signer,
  chain: number
): TablelandConnections {
  const database = new Database({
    signer,
    baseUrl: localStorage.getItem("validator") ?? undefined,
  });
  const validator = Validator.forChain(chain);
  const registry = signer && new Registry({ signer });
  tablelandConnection = { database, validator, registry };

  return tablelandConnection;
}
