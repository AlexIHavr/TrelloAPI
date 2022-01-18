import Joi from 'joi';

class BoardValidationRepository {
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
      color: Joi.string().trim(),
      description: Joi.string().trim(),
    });
  }
}

export default new BoardValidationRepository();
