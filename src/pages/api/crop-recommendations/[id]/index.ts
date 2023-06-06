import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cropRecommendationValidationSchema } from 'validationSchema/crop-recommendations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.crop_recommendation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCropRecommendationById();
    case 'PUT':
      return updateCropRecommendationById();
    case 'DELETE':
      return deleteCropRecommendationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCropRecommendationById() {
    const data = await prisma.crop_recommendation.findFirst(convertQueryToPrismaUtil(req.query, 'crop_recommendation'));
    return res.status(200).json(data);
  }

  async function updateCropRecommendationById() {
    await cropRecommendationValidationSchema.validate(req.body);
    const data = await prisma.crop_recommendation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCropRecommendationById() {
    const data = await prisma.crop_recommendation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
