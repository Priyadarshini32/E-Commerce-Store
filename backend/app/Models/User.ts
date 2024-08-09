// File: app/Models/User.ts

import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  column,
  beforeSave,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Order from "App/Models/Order";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null }) 
  public password: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password); 
    }
  }

  @hasMany(() => Order, {
    foreignKey: "userId", 
  })
  public orders: HasMany<typeof Order>;
}
