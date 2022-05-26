import { NextApiRequest, NextApiResponse } from 'next';
import  {  resolvers  }  from  "../../../resolvers";

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
            const { projects } = await resolvers.getProjectsCount();
            res.status(200).json({
                message: "Succesful",
                data: {
                    totalCount: projects.totalCount
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