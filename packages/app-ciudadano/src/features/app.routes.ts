import { Router } from 'express'
import { autenticarUsuario } from '@ciudadano/middlewares'
import autenticacion from './autenticacion/autenticacion.routes'
import servicios from './servicios/servicios.routes'
import perfiles from './perfiles/perfiles.routes'
import incidentes from './incidentes/incidentes.routes'
import conexion from './conexion/conexion.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/autenticacion', autenticacion)
appRouter.use('/servicios', servicios)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/perfiles', perfiles)
appRouter.use('/incidentes', incidentes)
appRouter.use('/conexion', conexion)
