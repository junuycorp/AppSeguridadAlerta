import { envs } from '@agente/configs'
import axios from 'axios'

const apiUrl = envs.CIUDADANO_API

// Generated by https://quicktype.io

export interface BuscarCiudadano {
  nroDocumento: string
  correo: string
  numeroCelular: string
  perfilCodigo: number
  estadoRegistro: boolean
  perfil: Perfil
  persona: Persona
}

export interface Perfil {
  perfilCodigo: number
  perfilNombre: string
}

export interface Persona {
  razonSocial: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo: null | string
}

export const buscarPorIdService = async (
  nroDocumento: string,
): Promise<BuscarCiudadano> => {
  const respuesta = await axios({
    method: 'get',
    baseURL: apiUrl,
    url: `/conexion/usuarios/buscar/${nroDocumento}`,
    timeout: 15000,
  })

  const ciudadano = respuesta.data as BuscarCiudadano
  return ciudadano
}
