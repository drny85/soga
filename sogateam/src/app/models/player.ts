export interface Player {
    id?: string,
    name: string,
    last_name: string,
    pos: string,
    batting?: number,
    hits?: number,
    error?: number,
    singles? : number,
    doubles?: number,
    triples?: number,
    hrs?: number,
    rbis?: number,
    outs?: number,
    avg?: number,
    fo?: number,
    hidp?: number,
    ko?: number,
    bb?: number,
    dob?: string,
    phone: string,
    email: string,
    number?: number,
    atbat?: number,
    last_at_bat?: string,
    picture?: string,
    address: {
        street: string,
        apt?: string,
        city: string,
        state: string,
        zipcode: string
    }
    


}
