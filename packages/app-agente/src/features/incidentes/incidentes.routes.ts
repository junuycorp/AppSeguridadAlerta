import { Router } from 'express'
import {
  buscarEvento,
  cambiarEstado,
  listar,
  listarPorDenunciante,
  registroEvento,
} from './incidentes.controller'

const router = Router()

router.get('/listar', listar)
router.get('/listar/:idDenunciante', listarPorDenunciante)
router.get('/buscar/:idIncidente', buscarEvento)
router.post('/registro-evento', registroEvento)
router.patch('/cambiar-estado/:idIncidente', cambiarEstado)

export default router
