import { AutoWired, Service } from "../decorators";
import { TYPES } from "../types/binding.type";
import { ProfileServiceInterface } from "../interfaces/profile-service.interface";
import { ProfileRepositoryInterface } from "../interfaces/profile-repository.interface";

@Service()
export class ProfileService implements ProfileServiceInterface{

    @AutoWired(TYPES.ProfileRepositoryInterface)
    private readonly profileRepository!:  ProfileRepositoryInterface;    

    create(): Promise<any> {
        return this.profileRepository.createProfile();
    }
    get(): Promise<any> {
        return this.profileRepository.getProfile();
    }
    update(): Promise<any> {
        return this.profileRepository.updateProfile();
    }
    replace(): Promise<any> {
        return this.profileRepository.replaceProfile();
    }
    delete(): Promise<any> {
        return this.profileRepository.deleteProfile();
    }
}