// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, ethers, JsonRpcProvider } from 'ethers';
import ABI from './abi';

export default async function handler(req: NextApiRequest,res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        const { name, surname, signature, address } = req.body;
        if (name == null || surname == null || signature == null || address == null) {
            res.status(400).send({error: 'Malformed request'});
            return;
        }
        try {
            const addr = verifyMessage(address+process.env.NEXT_PUBLIC_PROJECT_NAME, signature);
            if (addr === address) {
                const provider = new JsonRpcProvider(process.env.RPC!);
                const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
                const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, ABI, signer);
                await contract.register(addr,name,surname);
                res.status(200).send({});
            }
            else {
                res.status(400).send({error: 'Incorrect Signature'});
                return;
            }
        }
        catch (error) {
            res.status(500).send(error);
            return;
        }
    }
}
