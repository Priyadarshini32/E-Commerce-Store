import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Product from "App/Models/Product";

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: "Samsung Galaxy S21",
        description:
          "The Samsung Galaxy S21 features a 6.2-inch display, triple-camera system, and 5G connectivity.",
        price: 60000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-74826/SamsungGalaxys215g.jpg",
      },
      {
        name: "Apple iPhone 13",
        description:
          "The Apple iPhone 13 comes with a 6.1-inch Super Retina XDR display, A15 Bionic chip, and dual-camera system.",
        price: 90000.0,
        imageurl:
          "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg",
      },
      {
        name: "Google Pixel 6",
        description:
          "The Google Pixel 6 offers a 6.4-inch OLED display, Google Tensor chip, and advanced camera capabilities.",
        price: 55000.0,
        imageurl:
          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
      },
      {
        name: "OnePlus 9",
        description:
          "The OnePlus 9 features a 6.55-inch Fluid AMOLED display, Snapdragon 888 processor, and Hasselblad camera system.",
        price: 70000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-82583/OnePlus-9-Pro-featured-image-packshot-review.jpg",
      },
      {
        name: "Xiaomi Mi 11",
        description:
          "The Xiaomi Mi 11 comes with a 6.81-inch AMOLED display, Snapdragon 888 chipset, and a 108MP main camera.",
        price: 45000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-76369/XiaomiMi11Ultra.jpg",
      },
    ]);
  }
}
