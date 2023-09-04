import { Card } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateCardDTO } from "../cards/dtos/createCardDTO";

@Injectable()
export class CardHelper {
    private Crypt = require('cryptr');
    private cryptr: any;

    constructor(){
        this.cryptr = new this.Crypt(process.env.CRYPTR_SECRET);
    }

    encryptCard(data: CreateCardDTO): CreateCardDTO{
        return {
            ...data,
            password: this.cryptr.encrypt(data.password),
            cvv: this.cryptr.encrypt(data.cvv)
        };
    }

    decryptCard(data: Card): Card{
        return {
            ...data,
            password: this.cryptr.decrypt(data.password),
            cvv: this.cryptr.decrypt(data.cvv)
        };
    }

}