import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Carts extends BaseSchema {
  protected tableName = "carts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(1);
      table.integer("user_id").unsigned();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
