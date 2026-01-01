
export class ErrorResponse{

    private readonly message: string; 
    private readonly code: number;
    private username?: string ;
    private email?: string ;

    constructor(code: number, message: string){
        this.message = message;
        this.code = code;
    }
    setUsername(username: string): void{
        this.username = username;
    }

    setEmail(email: string): void{
        this.email = email;
    }
    
    getUsername(): string | undefined{
        return this.username ;
    }

    getEmail(): string | undefined{
        return this.email;
    }
    getMessage(): string{
        return this.message;
    }

    getCode(): number{
        return this.code;
    }
    
}