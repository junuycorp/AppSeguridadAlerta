/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { prisma } from '@agente/database'
import { formatDate } from '@agente/shared/helpers'
import type { EstadoIncidente } from '@agente/shared/types'

export class ReporteRepository {
  static obtenerCronologia = async (
    estado?: EstadoIncidente,
    idTipoIncidente?: number,
  ) => {
    const incidentes = await prisma.incidente.findMany({
      where: {
        estado: { equals: estado },
        idTipoIncidente: { equals: idTipoIncidente },
      },
      select: {
        idIncidente: true,
        descripcion: true,
        fechaCreacion: true,
        fechaRecepcion: true,
        fechaFinalizacion: true,
        fechaAsignacion: true,
        estado: true,
        tipoIncidente: {
          select: {
            idTipoIncidente: true,
            nombre: true,
            descripcion: true,
          },
        },
        centroPoblado: {
          select: {
            idCentroPoblado: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
    })
    return incidentes.map((incidente) => {
      const {
        idIncidente,
        descripcion,
        fechaAsignacion,
        fechaCreacion,
        fechaFinalizacion,
        fechaRecepcion,
        ...rest
      } = incidente
      return {
        idIncidente,
        descripcion,
        fechaCreacion: formatDate(fechaCreacion),
        fechaRecepcion: formatDate(fechaRecepcion),
        fechaAsignacion: formatDate(fechaAsignacion),
        fechaFinalizacion: formatDate(fechaFinalizacion),
        ...rest,
      }
    })
  }
}
