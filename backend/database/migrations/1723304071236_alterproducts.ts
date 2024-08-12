import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AddCategoryToProducts extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("category").nullable().after("id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("category");
    });
  }
}
