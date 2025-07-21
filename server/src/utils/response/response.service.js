import { ClientErrorCode, ErrorCodeMessages, ServerErrorCode } from '../errors/error_codes.js';

const responseService = {
    success(message, data) {
        return {
            success: true,
            message,
            data,
        };
    },

    error(code, message) {
        return {
            success: false,
            message: message || ErrorCodeMessages[code] || 'An unknown error occurred.',
            httpStatus: code || 500,
        };
    },

    unauthorizedError(message) {
        const code = ClientErrorCode.Unauthorized;
        return {
            success: false,
            message: message || ErrorCodeMessages[code],
            httpStatus: code,
        };
    },

    forbiddenError() {
        const code = ClientErrorCode.Forbidden;
        return {
            success: false,
            message: ErrorCodeMessages[code],
            httpStatus: code,
        };
    },

    notFoundError() {
        const code = ClientErrorCode.NotFound;
        return {
            success: false,
            message: ErrorCodeMessages[code],
            httpStatus: code,
        };
    },

    methodNotAllowedError() {
        const code = ClientErrorCode.MethodNotAllowed;
        return {
            success: false,
            message: ErrorCodeMessages[code],
            httpStatus: code,
        };
    },

    internalServerError() {
        const code = ServerErrorCode.InternalServerError;
        return {
            success: false,
            message: ErrorCodeMessages[code],
            httpStatus: code,
        };
    },
};

export default responseService; 