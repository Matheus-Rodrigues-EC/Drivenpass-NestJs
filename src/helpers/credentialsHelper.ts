import { Injectable } from "@nestjs/common";
import { Credential } from "@prisma/client";
import { createCredentialsDTO } from "../credentials/dtos/createCredentialsDTO";

@Injectable()
export class CredentialHelper{
    private Crypt = require('cryptr');
    private cryptr: any;

    constructor(){
        this.cryptr = this.Crypt(process.env.CRYPTR_SECRET);
    }

    encryptCredential(data: createCredentialsDTO): createCredentialsDTO{
        return {
            ...data,
            password: this.cryptr.encrypt(data.password)
        };
    }

    decryptCredential(data: Credential): Credential {
        return {
            ...data,
            password: this.cryptr.decrypt(data.password),
        };
    }

}