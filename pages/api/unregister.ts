// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, ethers, JsonRpcProvider } from 'ethers';
import ABI from './abi';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        const { address, secret } = req.body;
        try {
            if (secret === process.env.UNREGISTER_SECRET!) {
                const provider = new JsonRpcProvider(process.env.RPC!);
                const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
                const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, ABI, signer);
                await contract.unregister(address);
                res.status(200).send({});
            }
            else {
                res.status(403).send({ error: 'Unauthorized' });
            }
        }
        catch (error) {
            res.status(500).send(error);
            return;
        }
    }
}
