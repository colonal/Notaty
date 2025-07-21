export const ClientErrorCode = {
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
};

export const ServerErrorCode = {
    InternalServerError: 500,
};

export const ErrorCodeMessages = {
    [ClientErrorCode.BadRequest]: 'The request is invalid.',
    [ClientErrorCode.Unauthorized]: 'Unauthorized access.',
    [ClientErrorCode.Forbidden]: 'You do not have permission to perform this action.',
    [ClientErrorCode.NotFound]: 'The requested resource could not be found.',
    [ClientErrorCode.MethodNotAllowed]: 'The request method is not supported for this resource.',
    [ServerErrorCode.InternalServerError]: 'An unexpected error occurred on the server.',
}; 