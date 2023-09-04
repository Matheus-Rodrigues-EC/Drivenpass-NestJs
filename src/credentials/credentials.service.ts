import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createCredentialsDTO } from './dtos/createCredentialsDTO';
import { CredentialsRepository } from './credentials.repository';
import { CredentialHelper } from '../helpers/credentialsHelper';

@Injectable()
export class CredentialsService {
    constructor(
        private readonly credentialsRepository: CredentialsRepository,
        private readonly credentialHelper: CredentialHelper
    ){}

    async createCredential(data: createCredentialsDTO, userId: number){
        const credential = await this.credentialsRepository.readCredentialTitleId(data.title, userId);

        if(credential) throw new HttpException('This credential title already used at your collection', HttpStatus.CONFLICT);

        const credentialDTO: createCredentialsDTO = this.credentialHelper.encryptCredential(credential);

        return this.credentialsRepository.createCredential(credentialDTO, userId);
    }

    async readCredentials(userId: number){
        const credentialList = await this.credentialsRepository.readCredentials(userId);

        return credentialList.map((credential) => {
            this.credentialHelper.decryptCredential(credential)
        })
    }

    async readCredential(id: number, userId: number){
        const credential = await this.credentialsRepository.readCredential(id);

        if(!credential) throw new HttpException('Credential not found!', HttpStatus.NOT_FOUND);

        if(credential.userId !== userId) throw new HttpException("You don't have acess this credential", HttpStatus.FORBIDDEN);

        return this.credentialHelper.decryptCredential(credential);
    }

    async readCredentialTitleId(title: string, userId: number){
        const credential = await this.credentialsRepository.readCredentialTitleId(title, userId);
        if(!credential) throw new HttpException("This credential doesn't exists", HttpStatus.NOT_FOUND);

        return credential;
    }

    async deleteCredential(id: number, userId: number){
        const credential = await this.readCredential(id, userId);
        if(!credential) throw new HttpException("This credential doesn't exists", HttpStatus.NOT_FOUND);

        return await this.credentialsRepository.deleteCredential(id, userId);
    }

}
