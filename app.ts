interface IHandler {
  getProduct(id: number): Promise<Root | undefined>;
}

class ProductHandler implements IHandler {
  async getProduct(id: number): Promise<Root | undefined> {
    const url = "https://dummyjson.com/products/1";
    const response = await fetch(url);
    if (response) {
      const json = await response.json();
      return json;
    }
    return undefined;
  }
}

class ProductProxy implements IHandler {
  constructor(private api: ProductHandler) {}
  getProduct(id: number): Promise<Root | undefined> {
    if (id >= 10) throw Error("ID не должен быть больше 10");
    return this.api.getProduct(id);
  }
}

const proxy = new ProductProxy(new ProductHandler());

async function main() {
  try {
    const res1 = await proxy.getProduct(1);
    console.log(JSON.stringify(res1, null, 2));

    const res10 = await proxy.getProduct(10);
    console.log(JSON.stringify(res10, null, 2));
  } catch (error) {
    if (error instanceof Error) console.log("ОШИБКА! " + error.message);
    else console.log(error);
  }
}

main();

interface Root {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
