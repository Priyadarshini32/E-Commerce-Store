import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Products extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.text("description").nullable();
      table.decimal("price", 10, 2).notNullable();
      table.string("imageurl").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
