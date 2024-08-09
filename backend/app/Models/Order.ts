// File: app/Models/Order.ts

import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "user_id" })
  public userId: number;

  @column()
  public customername: string;

  @column()
  public items: string;

  @column()
  public totalprice: number;

  @column()
  public streetaddress: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public zipcode: string;

  @belongsTo(() => User, {
    foreignKey: "userId",
  })
  public user: BelongsTo<typeof User>;
}
