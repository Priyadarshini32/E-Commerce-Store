import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public age: number;

  @column()
  public salary: number;

  @column()
  public phonenumber: string;

  @column()
  public address: string;

  @column()
  public pincode: string;
}
