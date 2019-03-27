import Joi from "joi";

export const add_Schema = Joi.object().keys({
  name: Joi.string()
    .min(10)
    .max(200)
    .required(),
  notes: Joi.array().required(),
  imgs: Joi.array().required(),
  displayImgs: Joi.array(),
  price: Joi.string()
    .regex(/[0-9]+/)
    .min(1)
    .max(20)
    .required(),
  favs: Joi.number(),
  id: Joi.string()
});
