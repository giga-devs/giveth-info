import { NextApiRequest, NextApiResponse } from 'next';
import  {  resolvers  }  from  "../../../resolvers";
import { count_total } from '../../../utils/aggregations';

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
            const { donations } = await resolvers.getDonorsIds();
            // substract 1 for remove null users registered
            const donors_count = count_total(donations, 'user.id') - 1;
            res.status(200).json({
                message: "Succesful",
                data: {
                    "donorsCount": donors_count 
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