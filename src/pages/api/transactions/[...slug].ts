import prisma from '../../../lib/prisma'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export default async function handler(req: any, res: any) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId: parseInt(req.query.slug[0]),
            month: req.query.slug[1],
            year: req.query.slug[2],
          },
        })

        try {
          const balance = transactions.reduce(
            (acc: any, transaction: any) => {
              if (transaction.type === 'income') {
                acc.income += transaction.amount
              } else {
                acc.outcome += transaction.amount
              }
              return acc
            },
            {
              income: 0,
              outcome: 0,
              total: 0,
            },
          )

          balance.total = balance.income - balance.outcome

          res.status(200).json({ transactions, balance })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
      break
    case 'POST':
      try {
        const token = req.headers.cookie
          ? cookie.parse(req.headers.cookie).transactionAcessToken
          : null

        console.log(token)

        if (!token) {
          res.status(401).json({ error: `${token} not authorized` })
          return
        }

        const { userId } = jwt.verify(token, 'Set-Cookie') as {
          userId: number
        }

        req.body.userId = userId

        const transaction = await prisma.transaction.create({
          data: req.body,
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

    case 'DELETE':
      if (method === 'DELETE') {
        try {
          const token = req.headers.cookie
            ? cookie.parse(req.headers.cookie).transactionAcessToken
            : null

          if (!token) {
            res.status(401).json({ error: `${token} not authorized` })
            return
          }

          const transaction = await prisma.transaction.delete({
            where: {
              id: parseInt(req.query.slug[0]),
            },
          })

          res.status(200).json(transaction)
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
