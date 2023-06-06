import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { livestockValidationSchema } from 'validationSchema/livestocks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.livestock
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLivestockById();
    case 'PUT':
      return updateLivestockById();
    case 'DELETE':
      return deleteLivestockById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLivestockById() {
    const data = await prisma.livestock.findFirst(convertQueryToPrismaUtil(req.query, 'livestock'));
    return res.status(200).json(data);
  }

  async function updateLivestockById() {
    await livestockValidationSchema.validate(req.body);
    const data = await prisma.livestock.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteLivestockById() {
    const data = await prisma.livestock.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
