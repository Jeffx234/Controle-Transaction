import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const token = req.headers.cookie
          ? cookie.parse(req.headers.cookie).transactionAcessToken
          : null

        if (!token) {
          res.status(401).json({ error: `${token} not authorized` })
          return
        }

        const { id } = jwt.verify(token, 'hello') as {
          id: number
        }

        const transaction = await prisma.transaction.create({
          data: {
            userId: id,
            title: req.body.title,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            month: req.body.month,
            year: req.body.year,
          },
        })

        res.status(201).json(transaction)
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
      break

    case 'PUT':
      try {
        const token = req.headers.cookie
          ? cookie.parse(req.headers.cookie).transactionAcessToken
          : null

        if (!token) {
          res.status(401).json({ error: `${token} not authorized` })
          return
        }

        const transaction = await prisma.transaction.update({
          where: {
            id: parseInt(req.query.slug[0]),
          },
          data: {
            title: req.body.title,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            month: req.body.month,
            year: req.body.year,
          },
        })

        res.status(200).json(transaction)
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
