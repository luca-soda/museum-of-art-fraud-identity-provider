// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, ethers, JsonRpcProvider } from 'ethers';
import ABI from './abi';

export default async function handler(req: NextApiRequest,res: NextApiResponse<any>) {
    res
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'POST') {
        try {
            const { address } = req.body;
            const provider = new JsonRpcProvider(process.env.RPC!);
            const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, ABI, provider);
            const [name, tokenId, hashVc] = await contract.identity(address);
            res.status(200).send({name});
        }
        catch (error) {
            console.log(error);
            res.status(500).send({error});
        }
    }
    else if (req.method === 'OPTIONS') {
        res.send({});
    }
    else {
        res.status(500).send({error: 'Bad method'});
    }
}
