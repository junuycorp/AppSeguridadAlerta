import { getFileType } from '@agente/shared/helpers'
import { ArchivoRepository } from '../archivos.repository'
import type { CrearRutasDto } from './crear-multiple.dto'

export const crearMultipleUseCase = async (dto: CrearRutasDto): Promise<number> => {
  const { idIncidente, rutasArchivos, categoria } = dto
  const listaArchivos = rutasArchivos.map((ruta) => {
    const tipo = getFileType(ruta)
    return {
      idIncidente,
      ruta,
      tipo,
      categoria,
    }
  })
  const totalCreados = await ArchivoRepository.crearMultiple(listaArchivos)
  return totalCreados
}
