import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Product from "App/Models/Product";

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: "Samsung Galaxy S21",
        category: "Mobiles",
        description:
          "The Samsung Galaxy S21 features a 6.2-inch display, triple-camera system, and 5G connectivity.",
        price: 60000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-74826/SamsungGalaxys215g.jpg",
      },
      {
        name: "Apple iPhone 13",
        category: "Mobiles",
        description:
          "The Apple iPhone 13 comes with a 6.1-inch Super Retina XDR display, A15 Bionic chip, and dual-camera system.",
        price: 90000.0,
        imageurl:
          "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg",
      },
      {
        name: "Google Pixel 6",
        category: "Mobiles",
        description:
          "The Google Pixel 6 offers a 6.4-inch OLED display, Google Tensor chip, and advanced camera capabilities.",
        price: 55000.0,
        imageurl:
          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
      },
      {
        name: "OnePlus 9",
        category: "Mobiles",
        description:
          "The OnePlus 9 features a 6.55-inch Fluid AMOLED display, Snapdragon 888 processor, and Hasselblad camera system.",
        price: 70000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-82583/OnePlus-9-Pro-featured-image-packshot-review.jpg",
      },
      {
        name: "Xiaomi Mi 11",
        category: "Mobiles",
        description:
          "The Xiaomi Mi 11 comes with a 6.81-inch AMOLED display, Snapdragon 888 chipset, and a 108MP main camera.",
        price: 45000.0,
        imageurl:
          "https://cdn.dxomark.com/wp-content/uploads/medias/post-76369/XiaomiMi11Ultra.jpg",
      },
      {
        name: "Realme GT 3",
        category: "Mobiles",
        description:
          "6.74-inch AMOLED display, Snapdragon 8+ Gen 1 processor, 16GB RAM, 256GB storage, 50MP triple camera setup, 4600mAh battery.",
        price: 45999.0,
        imageurl:
          "https://cdn1.smartprix.com/rx-iuIuzO9cY-w420-h420/realme-gt-3.jpg",
      },
      {
        name: "Xiaomi Redmi Note 13 Pro",
        category: "Mobiles",
        description:
          "6.67-inch AMOLED display, MediaTek Dimensity 1080 processor, 8GB RAM, 256GB storage, 108MP triple camera setup, 5000mAh battery.",
        price: 19999.0,
        imageurl: "https://m.media-amazon.com/images/I/71XQD0wtMPL.jpg",
      },
      {
        name: "Asus Zenfone 10",
        category: "Mobiles",
        description:
          "5.9-inch AMOLED display, Snapdragon 8 Gen 2 processor, 8GB RAM, 256GB storage, 64MP dual camera setup, 4300mAh battery.",
        price: 42999.0,
        imageurl:
          "https://dlcdnwebimgs.asus.com/gain/fb3d511e-8180-48e9-aa20-52e1f9dc607d/",
      },
      {
        name: "Motorola Edge 40",
        category: "Mobiles",
        description:
          "6.55-inch AMOLED display, MediaTek Dimensity 8020 processor, 8GB RAM, 256GB storage, 50MP dual camera setup, 4700mAh battery.",
        price: 29999.0,
        imageurl:
          "https://motorolaroe.vtexassets.com/arquivos/ids/157329-800-auto?width=800&height=auto&aspect=true",
      },
      {
        name: "Poco X5 Pro 5G",
        category: "Mobiles",
        description:
          "6.67-inch AMOLED display, Snapdragon 778G processor, 6GB RAM, 128GB storage, 108MP triple camera setup, 5000mAh battery.",
        price: 19999.0,
        imageurl:
          "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/d/s/8/-original-imagmkjf9wqjurgf.jpeg?q=90&crop=false",
      },
      {
        name: "Meizu 20 Pro",
        category: "Mobiles",
        description:
          "6.6-inch AMOLED display, Snapdragon 8 Gen 2 processor, 12GB RAM, 256GB storage, 50MP triple camera setup, 4800mAh battery.",
        price: 60999.0,
        imageurl:
          "https://www.giztop.com/media/catalog/product/cache/dc206057cdd42d7e34b9d36e347785ca/m/e/meizu_20_pro-1.jpg",
      },
      {
        name: "Apple MacBook Air M2",
        category: "Laptops",
        description:
          "The Apple MacBook Air M2 features a 13.6-inch Liquid Retina display, Apple M2 chip, 8GB RAM, and 256GB SSD storage.",
        price: 120000.0,
        imageurl: "https://m.media-amazon.com/images/I/71f5Eu5lJSL.jpg",
      },
      {
        name: "Dell XPS 13",
        category: "Laptops",
        description:
          "The Dell XPS 13 offers a 13.3-inch FHD+ display, Intel Core i7-1185G7 processor, 16GB RAM, and 512GB SSD.",
        price: 150000.0,
        imageurl:
          "https://images-cdn.ubuy.co.in/635f8ad9afed8b54834faff3-dell-xps-13-plus-9320-13-4.jpg",
      },
      {
        name: "HP Spectre x360",
        category: "Laptops",
        description:
          "The HP Spectre x360 features a 13.3-inch UHD OLED display, Intel Core i7-1165G7 processor, 16GB RAM, and 1TB SSD.",
        price: 135000.0,
        imageurl:
          "https://ecom.myitworld.com/media/catalog/product/cache/2be1954f74caba3fffe9c28ffd4d15a6/h/p/hp-spectre-x360-2-in-1-laptop-14-ef2033tu-it-world-2883_0cpoltzkjdcf6ffp.png",
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        category: "Laptops",
        description:
          "The Lenovo ThinkPad X1 Carbon comes with a 14-inch FHD display, Intel Core i7-1260P processor, 16GB RAM, and 512GB SSD.",
        price: 160000.0,
        imageurl:
          "https://p1-ofp.static.pub/fes/cms/2023/04/28/iu6t7jqpekoy7o76vbn0c9a9b7rbsb543440.png",
      },
      {
        name: "Asus ROG Zephyrus G14",
        category: "Laptops",
        description:
          "The Asus ROG Zephyrus G14 offers a 14-inch WQHD display, AMD Ryzen 9 6900HS processor, 16GB RAM, and 1TB SSD.",
        price: 145000.0,
        imageurl:
          "https://dlcdnwebimgs.asus.com/gain/D366E1B6-C6E2-41B1-BF53-EF909B21FF09",
      },
      {
        name: "Sony WH-1000XM5",
        category: "Headphones",
        description:
          "The Sony WH-1000XM5 features industry-leading noise cancellation, 30-hour battery life, and adaptive sound control.",
        price: 39990.0,
        imageurl:
          "https://www.sony.co.in/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
      },
      {
        name: "Bose QuietComfort 45",
        category: "Headphones",
        description:
          "The Bose QuietComfort 45 offers excellent noise cancellation, 24-hour battery life, and comfortable ear cups.",
        price: 32990.0,
        imageurl:
          "https://5.imimg.com/data5/SELLER/Default/2023/1/AK/VR/NR/60674291/bose-quietcomfort-45-headphones.png",
      },
      {
        name: "Apple AirPods Max",
        category: "Headphones",
        description:
          "The Apple AirPods Max provides immersive sound with computational audio, active noise cancellation, and a comfortable fit.",
        price: 59900.0,
        imageurl:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-pink-202011_FMT_WHH?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1604615276000",
      },
      {
        name: "Sennheiser Momentum 4 Wireless",
        category: "Headphones",
        description:
          "The Sennheiser Momentum 4 Wireless offers high-resolution audio, adaptive noise cancellation, and a 60-hour battery life.",
        price: 29990.0,
        imageurl:
          "https://m.media-amazon.com/images/I/51JJ5SHXCcL._AC_UF1000,1000_QL80_.jpg",
      },
      {
        name: "Jabra Elite 85h",
        category: "Headphones",
        description:
          "The Jabra Elite 85h features SmartActive noise cancellation, 36-hour battery life, and water resistance for active lifestyles.",
        price: 22990.0,
        imageurl:
          "https://assets2.jabra.com/b/a/b/6/bab6eaa31128992c0b77d991ee524dd0d70c0cba_jabra_elite_85h_black_copper_01.png",
      },
      {
        name: "Beats Studio3 Wireless",
        category: "Headphones",
        description:
          "The Beats Studio3 Wireless provides pure adaptive noise canceling, 22-hour battery life, and a comfortable over-ear design.",
        price: 24990.0,
        imageurl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-DXdcwohsV6d_rANQsL1nCtyGDHw0zcenw&s",
      },
      {
        name: "Philips SHP9500",
        category: "Headphones",
        description:
          "The Philips SHP9500 offers high-fidelity sound, open-back design, and a comfortable over-ear fit for long listening sessions.",
        price: 7490.0,
        imageurl:
          "https://m.media-amazon.com/images/I/61CN8jOBy3L._AC_UF1000,1000_QL80_.jpg",
      },
      {
        name: "Apple AirPods Pro (2nd Gen)",
        category: "Earbuds",
        description:
          "The Apple AirPods Pro (2nd Gen) features active noise cancellation, transparency mode, and a new H2 chip for improved sound quality.",
        price: 29900.0,
        imageurl:
          "https://www.zdnet.com/a/img/resize/7a89e23ba47f44717993c95ec315bae13fda49d6/2022/09/22/92cbda52-2e51-4e62-99b2-eca84b7e6d92/airpods-pro-2022.jpg?auto=webp&precrop=5155,2896,x538,y258&width=1280",
      },
      {
        name: "Sony WF-1000XM4",
        category: "Earbuds",
        description:
          "The Sony WF-1000XM4 offers industry-leading noise cancellation, high-resolution audio, and a comfortable fit with a 24-hour battery life.",
        price: 24990.0,
        imageurl:
          "https://www.cnet.com/a/img/resize/ff24a85b18ab5aa0a35ea6702e8d0cf940d749ed/hub/2021/06/07/b2c44adf-5e2b-4e2a-afeb-c18c7120b137/sony-wf-1000xm4-2.jpg?auto=webp&width=1200",
      },
      {
        name: "Bose QuietComfort Earbuds",
        category: "Earbuds",
        description:
          "The Bose QuietComfort Earbuds feature excellent noise cancellation, a comfortable design, and up to 6 hours of battery life on a single charge.",
        price: 29990.0,
        imageurl:
          "https://i.rtings.com/assets/products/AQze2J9H/bose-quietcomfort-earbuds-ii-truly-wireless/design-medium.jpg?format=auto",
      },
      {
        name: "Samsung Galaxy Buds Pro",
        category: "Earbuds",
        description:
          "The Samsung Galaxy Buds Pro offers active noise cancellation, a comfortable fit, and 28 hours of battery life with the charging case.",
        price: 15999.0,
        imageurl:
          "https://images.samsung.com/is/image/samsung/assets/ae/audio-sound/galaxy-buds/galaxy-buds-pro/galaxy-buds-pro-overview-violet-open.png?$ORIGIN_PNG$",
      },
      {
        name: "Jabra Elite 75t",
        category: "Earbuds",
        description:
          "The Jabra Elite 75t features a compact design, active noise cancellation, and up to 7.5 hours of battery life with ANC on.",
        price: 11999.0,
        imageurl:
          "https://media.croma.com/image/upload/v1605324064/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/8949721464862.png",
      },
    ]);
  }
}
