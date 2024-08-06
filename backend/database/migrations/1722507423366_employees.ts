import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Employees extends BaseSchema {
  protected tableName = "employees";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.integer("age").unsigned().notNullable();
      table.decimal("salary", 10, 2).notNullable();
      table.string("phonenumber", 10).notNullable();
      table.string("address", 255).notNullable();
      table.string("pincode", 10).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
