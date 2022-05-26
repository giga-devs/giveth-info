import { NextApiRequest, NextApiResponse } from 'next';
import  {  resolvers  }  from  "../../../resolvers";
import { sum_total_donations_by_user } from '../../../utils/aggregations';

interface IResponse {
    message: string
    data: []
  }

interface IErrorResponse {
    message: string
}


export default async (req: NextApiRequest, res: NextApiResponse<IResponse|IErrorResponse>): Promise<void> => {

    const {method, query} = req
    switch (method) {
        case 'GET':
            const { donations } = await resolvers.getTopDonors()
            const donationscount = sum_total_donations_by_user(donations);
            res.status(200).json({
                message: "Succesful",
                data: 
                    donationscount
                
            })
            break;
        default:
            res.status(405).json({
                message: "Method not allowed"
            })
            break;
    }
}