import { PartialType } from '@nestjs/mapped-types'
import { createCredentialsDTO } from './createCredentialsDTO'

export class updateCredentialsDTO extends PartialType(createCredentialsDTO){};