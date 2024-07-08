import Joi from "joi";

export const changeCurrencySchema = Joi.object({
  monto: Joi.number().positive().required(),
  monedaOrigen: Joi.string().length(3).required(),
  monedaDestino: Joi.string().length(3).required(),
});

export const getTransactionsSchema = Joi.object({
  fechaInicio: Joi.date().iso().required(),
  fechaFinal: Joi.date().iso().required(),
});
