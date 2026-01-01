
export class EmailContext{
    getYear(){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        return currentYear;
    }
    getCompany(){
        return process.env.COMPANY as string;
    }

    getLogoUrl(){
        return process.env.LOGO_URL as string;
    }
}

//https://th.bing.com/th/id/OIP.y53aexkyw_ehqVHa8xRCkgHaHa?w=161&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3