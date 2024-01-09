import { io as ioServer } from 'socket.io-client'
import type { Server } from 'socket.io'

import { cacheAdapter } from '@ciudadano/adapters'
import { envs } from '@ciudadano/configs'
import { enviarMensajeDto } from '@ciudadano/features/chat/dto/enviar-mensaje.dto'
import { getSocketIdFromUserId } from '@ciudadano/shared/helpers/cache.helpers'

// Conectar a servidor agente
export const socketAgente = ioServer(envs.SEGURIDAD_API, {
  auth: {
    token: envs.SOCKETS_SERVER_TOKEN,
  },
})

export const socketController = (io: Server): void => {
  io.on('connection', (socket) => {
    const nroDocumento = socket.handshake.auth.userId
    const socketId = socket.id
    const socketKey = `socketId-${nroDocumento}`

    // Guardar en cache
    cacheAdapter.set(socketKey, socketId)

    socket.on('client:enviar-mensaje', (data) => {
      // Validar
      const [error, dto] = enviarMensajeDto(data)
      if (error != null || dto == null) {
        socket.emit('server:error', { mensaje: error })
        return
      }

      const dtoWithRemitente = {
        ...dto,
        remitente: socket.handshake.auth.userId,
        tipoRemitente: 'ciudadano',
      }
      socketAgente.emit('client:enviar-mensaje', dtoWithRemitente)
    })

    // TODO: Corregir, deberia enviar por id y no por socket
    socketAgente.on('server-agente:enviar-mensaje', (data: DataServerAgente) => {
      const { mensaje, destinatario, remitente, tipoRemitente } = data
      const socketId = getSocketIdFromUserId(destinatario)

      if (socketId != null) {
        socket.to(socketId).emit('server:enviar-mensaje', {
          mensaje,
          remitente,
          tipoRemitente,
        })
        // Guardar en BD, estado RECIBIDO
      } else {
        // Guardar en BD, estado ENVIADO
      }
    })

    socket.on('disconnect', () => {
      // Remover id de cache
      cacheAdapter.del(socketKey)
    })
  })
}

interface DataServerAgente {
  mensaje: string
  destinatario: string
  remitente: string
  tipoRemitente: string
}
