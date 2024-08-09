import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Product from "App/Models/Product";

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public productId: number;

  @column()
  public quantity: number;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @column()
  public userId: number;
}
