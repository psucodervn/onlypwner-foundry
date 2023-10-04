import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

// (1)
const data = JSON.parse(fs.readFileSync("src/merkleData/tree.json", "utf8"));
const tree = StandardMerkleTree.load(data);

// console.log(tree.root);
// console.log(tree.dump());
// console.log(tree.render());

for (const [i, v] of tree.entries()) {
  console.log("index:", i);
  // if (v[0].toString() !== "0x5302f28bc16F3d09EEa8B58a366F2cebA6A77EA2")
  //   continue;
  console.log("value:", v);
  console.log("leaf: ", tree.leafHash(v));
  console.log("proof:", tree.getProof(i));
}

// console.log(tree.getProof(1));

// const values = data.values.map((v) => v.value);
// const newTree = StandardMerkleTree.of(values, ["address", "uint72", "uint184"]);
// console.log(newTree.render());

// for (const [i, v] of newTree.entries()) {
//   // console.log("index:", i);
//   console.log("value:", v);
//   console.log("proof:", newTree.getProof(i));
// }

import * as abi from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/keccak256";
import { pack } from "@ethersproject/solidity";
// const pack = abi.defaultAbiCoder.encode;

const fPack1 = (address, amount, ts) => {
  return abi.defaultAbiCoder.encode(
    ["address", "uint72", "uint184"],
    [address, amount, ts]
  );
};

const fPack2 = (address, amount, ts) => {
  return abi.defaultAbiCoder
    .encode(["address"], [address])
    .concat(pack(["uint72", "uint184"], [amount, ts]).slice(2));
};

const a = fPack2(
  "0x5302f28bc16F3d09EEa8B58a366F2cebA6A77EA2",
  4858324104704,
  "300000000000000000"
);

const fHash = (a, b) => {
  return a < b
    ? keccak256(a.concat(b.slice(2)))
    : keccak256(b.concat(a.slice(2)));
};

// console.log(a, a.length);
// let b = keccak256(a);
// console.log(b);

// let proof =
//   "0xb916b96ff1ce984ae17da4835858905b12652bcb034e4018d98b98c96ec00c49";
// b =
//   proof < b
//     ? keccak256(proof.concat(b.slice(2)))
//     : keccak256(b.concat(proof.slice(2)));
// console.log(b);
// proof = "0xceaea7882ab9ba5d53db7e7df6c7e899db4824b4380dce6e1eda1797a7dc2690";
// b =
//   proof < b
//     ? keccak256(proof.concat(b.slice(2)))
//     : keccak256(b.concat(proof.slice(2)));
// console.log(b);

console.log(
  "\tbytes[] memory params = new bytes[](" +
    Math.floor(data.tree.length / 2) +
    ");"
);
for (let i = 1; i < data.tree.length; i += 2) {
  // console.log(data.tree[i], data.tree[i + 1]);
  let s1 = data.tree[i].slice(2);
  let s2 = data.tree[i + 1].slice(2);
  if (s1 > s2) {
    const t = s1;
    s1 = s2;
    s2 = t;
  }
  const s = s1.concat(s2);
  console.log("\tparams[" + (i - 1) / 2 + `] = hex"` + s + `";`);
  // const res = abi.defaultAbiCoder.decode(["uint256", "uint256"], s);
  // console.log(res);
}
