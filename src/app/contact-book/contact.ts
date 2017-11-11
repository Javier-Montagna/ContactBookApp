import { IPhone } from "./phone";
import { IAddress } from "./address";

export interface IContact { 
    name: string;
    id: number;
    isFavorite: boolean;
    companyName: string;
    smallImageURL: string;
    largeImageURL: string;
    emailAddress: string;
    birthdate: Date;
    phone: IPhone;
    address: IAddress;
}