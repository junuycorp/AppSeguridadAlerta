import { Router } from 'express'
import { uploadMemory } from '@agente/middlewares'

import { buscarEvento } from '../incidentes/buscar-evento/buscar-evento.controller'
import { listarTipos } from '../incidentes/crud-tipos/crud-tipos.controller'
import { listar } from '../centros-poblados/crud-centros/crud-centros.controller'

import { listarIncidentePorSereno } from './listar-incidentes/listar-incidentes.controller'
import { registrarInforme } from './registrar-informe/registrar-informe.controller'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion

router.get('/listar-incidentes', listarIncidentePorSereno)
router.post(
  '/registrar-informe',
  uploadMemory.array('archivos', maxFiles),
  registrarInforme,
)

// Externos
router.get('/buscar/:idIncidente', buscarEvento)
router.get('/tipos-incidentes', listarTipos)
router.get('/centros-poblados', listar)

export default router
