export class Card {
    private _title:      string;
    private _number:     string;
    private _owner:      string;
    private _cvv:        string;
    private _expiration: string;
    private _password:   string;
    private _CardType:   CardType[];

    constructor(title: string, number: string, owner: string, cvv: string, expiration: string, password: string, cardType: CardType[]){
        this._title = title;
        this._number = number;
        this._owner = owner;
        this._cvv = cvv;
        this._expiration = expiration;
        this._password = password;
        this._CardType = cardType;
    }

    public get title(): string {
        return this._title;
    }

    public get number(): string {
        return this._number;
    }

    public get owner(): string {
        return this._owner;
    }

    public get cvv(): string {
        return this._cvv;
    }

    public get expiration(): string {
        return this._expiration;
    }

    public get password(): string {
        return this._password;
    }

    public get CardType(): CardType[] {
        return this._CardType;
    }

}

export class CardType{
    private _type:      string;
    private _card:      Card[];

    constructor(type: string, card: Card[]){
        this._type = type;
        this._card = card;
    }

    public get type(): string {
        return this._type;
    }

    public get card(): Card[] {
        return this._card;
    }

    
}