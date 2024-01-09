import axios from 'axios'
import { envs } from '@ciudadano/configs'
import type { EstadoIncidente } from '@ciudadano/shared/types'

// Generated by https://quicktype.io

export interface Incidente {
  idIncidente: number
  idDenunciante: string
  idTipoIncidente: number
  idCentroPoblado: null
  descripcion: string
  estado: EstadoIncidente
  subestado: string | null
  activo: boolean
  longitud: string
  latitud: string
  fechaRecepcion: null
  fechaFinalizacion: null
}

export interface CrearMultiplesArchivos {
  idIncidente: number
  categoria: 'DENUNCIA' | 'INFORME'
  rutasArchivos: string[]
}

export interface DatosEvento {
  codUsuario: string
  idTipoIncidente: number
  descripcion: string
  latitud: string
  longitud: string
}

const apiUrl = envs.SEGURIDAD_API

export const registrarEventoService = async (
  datos: DatosEvento,
): Promise<Incidente> => {
  const respuesta = await axios({
    method: 'post',
    baseURL: apiUrl,
    url: `/conexion/incidentes/registro-evento`,
    timeout: 15000,
    data: {
      idDenunciante: datos.codUsuario,
      idTipoIncidente: datos.idTipoIncidente,
      descripcion: datos.descripcion,
      latitud: datos.latitud,
      longitud: datos.longitud,
    },
  })

  const incidente = respuesta.data.datos as Incidente
  return incidente
}

export const crearMultiplesArchivos = async (
  datos: CrearMultiplesArchivos,
): Promise<number> => {
  const respuesta = await axios({
    method: 'post',
    baseURL: apiUrl,
    url: '/conexion/archivos/crear-multiple',
    timeout: 15000,
    data: {
      idIncidente: datos.idIncidente,
      categoria: datos.categoria,
      rutasArchivos: datos.rutasArchivos,
    },
  })
  const totalCreados = respuesta.data.totalCreados as number
  return totalCreados
}
