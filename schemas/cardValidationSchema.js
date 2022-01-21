import Joi from 'joi';

class cardValidationSchema {
  get requiredIdSchema() {
    return this._getDefaultSchema().append({
      id: this._getIdSchema().required(),
      boardId: this._getIdSchema(),
    });
  }

  get notRequiredIdSchema() {
    return this._getDefaultSchema().append({
      id: this._getIdSchema(),
      boardId: this._getIdSchema(),
    });
  }

  get requiredBoardIdSchema() {
    return this._getDefaultSchema().append({
      id: this._getIdSchema(),
      boardId: this._getIdSchema().required(),
    });
  }

  _getIdSchema() {
    return Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] });
  }

  _getDefaultSchema() {
    return Joi.object({
      name: Joi.string().trim(),
      description: Joi.string().trim(),
      estimate: Joi.date(),
      status: Joi.string().trim().valid('need to do', 'in progress', 'done', 'stoped', 'undone'),
      dueDate: Joi.date(),
      labels: Joi.array().items(Joi.string()),
    });
  }
}
export default new cardValidationSchema();
