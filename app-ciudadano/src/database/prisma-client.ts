/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// import { PrismaClient } from '@prisma/client'

// declare global {
//   var prisma: PrismaClient | undefined
// }

// export const prisma = global.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// export default prisma

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
