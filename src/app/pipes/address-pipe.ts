import { Pipe } from '@angular/core';
import { IAddress } from '../contact-book/address';

@Pipe({
    name: 'address'
})

export class AddressPipe {
    transform(address: IAddress, args) {
        return (address.city + ", " + address.state + " " + address.zipCode + ", " + address.country);
    }
}