import * as request from 'supertest';
import { CardType } from './cardFactoryEntity';
// import { Card } from './cardFactoryEntity';
import { INestApplication } from '@nestjs/common';
// import { Faker, faker } from '@faker-js/faker';
// import { PrismaService } from '../../prisma/prisma.service';

type createCardBody = {
    title:      string;
    number:     string;
    owner:      string;
    cvv:        string;
    expiration: string;
    password:   string;
    CardType:   CardType[];
}

export async function createCard(app: INestApplication, body: createCardBody){
    return await request(app.getHttpServer()).post('/cards').send(body);
}

// export async function createCard(prisma: PrismaService){
//     const card = new Card(
//         faker.finance.accountName(),
//         faker.finance.creditCardNumber(),
//         faker.person.firstName(),
//         faker.finance.creditCardCVV(),
//         faker.string.fromCharacters('12/2030'),
//         faker.internet.password(),
//         CardType['credit']
//     )

//     return await prisma.card.create({
//         data: {
//             title: card.title,
//             number: card.number,
//             owner: card.owner,
//             cvv: card.cvv,
//             expiration: card.expiration,
//             password: card.password,
//             CardType: card.CardType['credit']
//         },
//         select: {
//             title: true,
//             number: true,
//             owner: true,
//             cvv: true,
//             expiration: true,
//             password: true,
//             CardType: true
//         }
// })
// }