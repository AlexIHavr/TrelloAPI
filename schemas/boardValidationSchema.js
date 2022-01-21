import Joi from 'joi';

class boardValidationSchema {
  get notRequiredIdSchema() {
    return this._getDefaultSchema().append({ id: this._getIdSchema() });
  }

  get requiredIdSchema() {
    return this._getDefaultSchema().append({ id: this._getIdSchema().required() });
  }

  _getIdSchema() {
    return Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] });
  }

  _getDefaultSchema() {
    return Joi.object({
      name: Joi.string().trim(),
      color: Joi.string().trim().valid('white', 'black', 'green', 'yelow', 'blue', 'grey', 'red'),
      description: Joi.string().trim(),
    });
  }
}

export default new boardValidationSchema();
