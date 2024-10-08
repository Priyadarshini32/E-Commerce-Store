import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Orders extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("customername").notNullable();
      table.json("items").notNullable();
      table.decimal("totalprice", 12, 2).notNullable();
      table.string("streetaddress").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zipcode").notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
