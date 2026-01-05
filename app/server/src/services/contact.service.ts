import { AutoWired, Service } from "../decorators";
import { TYPES } from "../types/binding.type";
import { ContactServiceInterface } from "../interfaces/contact-service.interface";
import { ContactRepositoryInterface } from "../interfaces/contact-repository.interface";

@Service()
export class ContactService implements ContactServiceInterface{

    @AutoWired(TYPES.ContactRepositoryInterface)
    private readonly contactRepository!:  ContactRepositoryInterface;    

    create(): Promise<any> {
        return this.contactRepository.createContact();
    }
    get(): Promise<any> {
        return this.contactRepository.getContact();
    }
    update(): Promise<any> {
        return this.contactRepository.updateContact();
    }
    replace(): Promise<any> {
        return this.contactRepository.replaceContact();
    }
    delete(): Promise<any> {
        return this.contactRepository.deleteContact();
    }
}