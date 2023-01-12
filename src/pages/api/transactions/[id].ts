import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export default async function handler(req: any, res: any) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const transactions = await prisma.transaction.findUnique({
          where: {
            id: parseInt(req.query.id),
          },
        })

        res.status(200).json(transactions)
      } catch (e) {
        res.status(500).json({ error: e.message })
      }

      break
  }
}
