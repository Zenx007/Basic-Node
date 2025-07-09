enum ProductCategory {
  ELECTRONICS = 'Electronics',
  APPAREL = 'Apparel',
  BOOKS = 'Books',
  GROCERIES = 'Groceries',
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  inStock: boolean;

  displayInfo(): void;
}

class BaseProduct implements Product {
  public id: number;
  public name: string;
  public price: number;
  public category: ProductCategory;
  public inStock: boolean;

  constructor(id: number, name: string, price: number, category: ProductCategory) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = true;
  }

  public displayInfo(): void {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Price: ${this.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    console.log(`Category: ${this.category}`);
    console.log(`In Stock: ${this.inStock ? 'Yes' : 'No'}`);
  }
}

class PhysicalProduct extends BaseProduct {
  public weightInGrams: number;

  constructor(id: number, name: string, price: number, category: ProductCategory, weightInGrams: number) {
    super(id, name, price, category);
    this.weightInGrams = weightInGrams;
  }

  public override displayInfo(): void {
    super.displayInfo();
    console.log(`Weight: ${this.weightInGrams}g`);
  }
}

class StockManager {
  private products: Product[] = [];
  private nextId: number = 1;

  public addProduct(product: Product): void {
    const productWithId = { ...product, id: this.nextId++ };
    this.products.push(productWithId);
    console.log(`Product "${productWithId.name}" added to stock.`);
  }

  public findProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  public listAllProducts(): void {
    console.log("\n--- LIST OF PRODUCTS IN STOCK ---");
    this.products.forEach(product => {
      product.displayInfo();
      console.log("--------------------");
    });
  }
}


const myStock = new StockManager();

let gamingLaptop = new PhysicalProduct(0, 'Gaming Laptop', 1500.00, ProductCategory.ELECTRONICS, 2200);
let cottonTShirt = new PhysicalProduct(0, 'Cotton T-Shirt', 25.99, ProductCategory.APPAREL, 150);
let fictionBook = new BaseProduct(0, 'The Lord of the Rings', 39.90, ProductCategory.BOOKS);

myStock.addProduct(gamingLaptop);
myStock.addProduct(cottonTShirt);
myStock.addProduct(fictionBook);

myStock.listAllProducts();

console.log("\n--- SEARCHING FOR PRODUCT WITH ID 2 ---");
const foundProduct = myStock.findProductById(2);

if (foundProduct) {
  foundProduct.displayInfo();
} else {
  console.log("Product not found.");
}

function getFirstItem<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

const numbers: number[] = [10, 20, 30];
const firstNumber = getFirstItem(numbers);
console.log(`\nFirst item from the list of numbers: ${firstNumber}`);

const names: string[] = ["Alice", "Bob", "Charles"];
const firstName = getFirstItem(names);
console.log(`First item from the list of names: ${firstName}`);