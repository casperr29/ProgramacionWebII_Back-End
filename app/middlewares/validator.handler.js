const boom = require('@hapi/boom');

//DATA TRANSFER OBJECT = MODELO DATOS = MODELO DE CRITERIOS DE DATOS
const validatorHandler = (dto, prop) => {
  return (req, res, next) => {
    const data = req[prop];
    const { error } = dto.validate(data);
    if (error) next(boom.badRequest(error));
    next();
  };
};

module.exports = validatorHandler;
