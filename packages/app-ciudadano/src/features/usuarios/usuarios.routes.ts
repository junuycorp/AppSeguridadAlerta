import { Router } from 'express'
import // actualizar,
// buscar,
// // eliminar,
// listar,
// crear,
// cambiarEstado,
'./crud-usuario/crud-usuario.controller'
import { pushToken } from './push-token/push-token.controller'

const mantenimientos = Router()

// mantenimientos.get('/listar', listar)
// mantenimientos.get('/buscar/:nroDocumento', buscar)
// mantenimientos.post('/crear', crear)
// mantenimientos.put('/actualizar/:nroDocumento', actualizar)
// mantenimientos.patch('/cambiar-estado/:nroDocumento', cambiarEstado)

// mantenimientos.delete('/eliminar/:nroDocumento', eliminar)

mantenimientos.patch('/actualizar/push-token', pushToken)

export default mantenimientos
