import * as Joi from 'joi';

const id = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

export { id };
