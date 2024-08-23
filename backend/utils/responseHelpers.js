
respon = {};

respon.response = (res, data, code = 200) => {
    return res.status(code).json({
        data: data,
    });
};

respon.responseErr = (res, message = "error", code = 400) => {
    return res.status(code).json({
        code: code,
        message: message,
    });
};

respon.validateFields = (body) => {
    let errors = [];
    for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string' && value.trim() === "") {
            errors.push(`${key} field cannot be empty`);
        }
    }
    return errors;
};


module.exports = respon;
