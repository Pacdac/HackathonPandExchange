
import { ethers } from "ethers";
import { contractAddress } from "../Data/ContractAddress";
import contractABI from "../Data/ContractABI";
import ERC20ABI from "../Data/ERC20ABI";

export async function addNewDCAToUser(period, totalOccurences, amountPerOccurrence, tokenIn, tokenInDecimals, tokenOut, fee5Decimals) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    let decimalsTokenIn = tokenInDecimals;
    if (!tokenInDecimals){
        try {
            const ERC20contract = new ethers.Contract(tokenIn, ERC20ABI, signer);
            decimalsTokenIn = await ERC20contract.decimals();
        } catch (error) {
            decimalsTokenIn = 18;
            console.log(error);
        }    
    }

    const BigNumberAmountPerOccurrence = ethers.utils.parseUnits(amountPerOccurrence.toString(), decimalsTokenIn);
    
    let value = 0;
    if(tokenIn === "0x0000000000000000000000000000000000000000") {
        value = BigNumberAmountPerOccurrence.mul(totalOccurences);
    }

    const tx = await contract.addNewDCAToUser(period, totalOccurences, BigNumberAmountPerOccurrence, tokenIn, tokenOut, Math.round(fee5Decimals * 1000), {value: value});
    await tx.wait();
}


export async function executeDCAToUser(userAddress, dcaStartDate ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.executeSingleUserDCA(userAddress, dcaStartDate);
    await tx.wait();
}

export async function estimateGasForExecuteDCAToUser(userAddress, dcaStartDate ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const estimate = await contract.estimateGas.executeSingleUserDCA(userAddress, dcaStartDate);
    return estimate;
}

export async function gasPrice() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gasPrice = await provider.getGasPrice();
    return gasPrice;
}

export async function deleteUserDCA(DCACreationTimestamp) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.deleteUserDCA(DCACreationTimestamp);
    await tx.wait();
}

export async function approveTokenTransfer(tokenAddress, amount, decimalsTokenIn) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, ERC20ABI, signer);
    const BigNumberAmount = ethers.utils.parseUnits(amount.toString(), decimalsTokenIn);
    const tx = await contract.approve(contractAddress, BigNumberAmount);
    await tx.wait();
}