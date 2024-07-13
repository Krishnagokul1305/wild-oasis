class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
        this.status="fail"
    }
    
}

module.exports=AppError