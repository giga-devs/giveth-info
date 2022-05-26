import { NextApiRequest, NextApiResponse } from 'next';
import  {  resolvers  }  from  "../../../resolvers";
import { sum_total } from '../../../utils/aggregations';

interface IResponse {
    message: string
    data: {string: number}
  }

interface IErrorResponse {
    message: string
}


export default async (req: NextApiRequest, res: NextApiResponse<IResponse|IErrorResponse>): Promise<void> => {

    const {method, query} = req
    switch (method) {
        case 'GET':
            const { donations } = await resolvers.getValueUSD()
            const donationscount = sum_total(donations, 'valueUsd');
            res.status(200).json({
                message: "Succesful",
                data: {
                    "valueUSD": donationscount
                }
            })
            break;
        default:
            res.status(405).json({
                message: "Method not allowed"
            })
            break;
    }
}