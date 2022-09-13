export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}

        //storing user data
    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){ //daca nu exista data expirare sau data de expirare este depasita
        return null;
    }
    return this._token;
}
}