export class ResponseDTO {
    success: boolean = false;
    message: any[] = [];
    data: any;
}

export class ResponseListDTO {
    success: boolean = false;
    message: any[] = [];
    data: { total: number, data: any[] } = { total: 0, data: [] };

}


