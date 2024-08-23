import response, {responseErr} from './responseHelpers';

export const validateModel = (model, body) => {
    if (!body) {
        return responseErr(res, `${modelName} not found`, 404); // Return error if item not found
    }
};
