import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { cropRecommendationValidationSchema } from 'validationSchema/crop-recommendations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCropRecommendations();
    case 'POST':
      return createCropRecommendation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCropRecommendations() {
    const data = await prisma.crop_recommendation
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'crop_recommendation'));
    return res.status(200).json(data);
  }

  async function createCropRecommendation() {
    await cropRecommendationValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.crop_recommendation.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
