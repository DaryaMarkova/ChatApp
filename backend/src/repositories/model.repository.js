class ModelRepository {
  constructor(schema) {
    this.schema = schema;
  }

  async findModel(query) {
    return this.schema.findOne(query);
  }

  async deleteModel(id) {
    return this.schema.findOneAndDelete({_id: id})
  }
}

module.exports = ModelRepository;