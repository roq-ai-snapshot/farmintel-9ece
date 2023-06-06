import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { farmValidationSchema } from 'validationSchema/farms';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFarms();
    case 'POST':
      return createFarm();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFarms() {
    const data = await prisma.farm
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'farm'));
    return res.status(200).json(data);
  }

  async function createFarm() {
    await farmValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.crop_recommendation?.length > 0) {
      const create_crop_recommendation = body.crop_recommendation;
      body.crop_recommendation = {
        create: create_crop_recommendation,
      };
    } else {
      delete body.crop_recommendation;
    }
    if (body?.livestock?.length > 0) {
      const create_livestock = body.livestock;
      body.livestock = {
        create: create_livestock,
      };
    } else {
      delete body.livestock;
    }
    if (body?.task?.length > 0) {
      const create_task = body.task;
      body.task = {
        create: create_task,
      };
    } else {
      delete body.task;
    }
    const data = await prisma.farm.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
