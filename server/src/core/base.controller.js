import ClientError from '../utils/errors/client_error.js';
import { ClientErrorCode } from '../utils/errors/error_codes.js';
import responseService from '../utils/response/response.service.js';

export class BaseController {
    sendResponse(res, response, statusCode) {
        const responseBody = { ...response };
        const httpStatus = statusCode || responseBody.httpStatus || (response.success ? 200 : 500);

        if ('httpStatus' in responseBody) {
            delete responseBody.httpStatus;
        }

        return res.status(httpStatus).json(responseBody);
    }

    errorResponse(res, error) {
        if (error instanceof ClientError) {
            const response = responseService.error(ClientErrorCode.BadRequest, error.message);
            return this.sendResponse(res, response, error.statusCode);
        }
        const response = responseService.internalServerError();
        return this.sendResponse(res, response);
    }

    successResponse(res, message, data, statusCode = 200) {
        const response = responseService.success(message, data);
        return this.sendResponse(res, response, statusCode);
    }

    createdResponse(res, message, data) {
        return this.successResponse(res, message, data, 201);
    }

    notFoundResponse(res) {
        const response = responseService.notFoundError();
        return this.sendResponse(res, response);
    }

    badRequestResponse(res) {
        const response = responseService.error(ClientErrorCode.BadRequest);
        return this.sendResponse(res, response);
    }

    unauthorizedResponse(res, message) {
        const response = responseService.unauthorizedError(message);
        return this.sendResponse(res, response);
    }

    forbiddenResponse(res) {
        const response = responseService.forbiddenError();
        return this.sendResponse(res, response);
    }

    internalServerErrorResponse(res) {
        const response = responseService.internalServerError();
        return this.sendResponse(res, response);
    }
}