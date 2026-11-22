// Database schema definitions for Practical Exercise 4
// Tables: Customers, Categories, Products, Orders, Order_Items

export const ERD_TABLES = [
  {
    name: "customers",
    label: "Customers Table",
    description: "Stores registered customer personal details, shipping address, and contact info.",
    columns: [
      { name: "customer_id", type: "INT", isPk: true, isFk: false, desc: "Primary key" },
      { name: "first_name", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "First name" },
      { name: "last_name", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "Last name" },
      { name: "email", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Email address" },
      { name: "phone_number", type: "VARCHAR(25)", isPk: false, isFk: false, desc: "Phone number" },
      { name: "address", type: "TEXT", isPk: false, isFk: false, desc: "Shipping street address" },
      { name: "city", type: "VARCHAR(60)", isPk: false, isFk: false, desc: "City" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Creation date" }
    ]
  },
  {
    name: "categories",
    label: "Categories Table",
    description: "Organizes products into logical collections (Computers, Peripherals, Displays).",
    columns: [
      { name: "category_id", type: "INT", isPk: true, isFk: false, desc: "Primary key" },
      { name: "category_name", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Category name" },
      { name: "slug", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "URL slug" },
      { name: "description", type: "TEXT", isPk: false, isFk: false, desc: "Category description" }
    ]
  },
  {
    name: "products",
    label: "Products Table",
    description: "Catalog items (Laptop $650, Monitor $120, Keyboard $25, Mouse $15).",
    columns: [
      { name: "product_id", type: "INT", isPk: true, isFk: false, desc: "Primary key" },
      { name: "category_id", type: "INT", isPk: false, isFk: true, desc: "FK -> categories.category_id" },
      { name: "product_name", type: "VARCHAR(150)", isPk: false, isFk: false, desc: "Product title" },
      { name: "price", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Price in USD" },
      { name: "stock_quantity", type: "INT", isPk: false, isFk: false, desc: "Inventory count" },
      { name: "image_url", type: "VARCHAR(255)", isPk: false, isFk: false, desc: "Product asset path" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Creation timestamp" }
    ]
  },
  {
    name: "orders",
    label: "Orders Table",
    description: "Customer checkout transactions with status, totals, and shipping details.",
    columns: [
      { name: "order_id", type: "INT", isPk: true, isFk: false, desc: "Primary key (e.g. ORD-0001)" },
      { name: "customer_id", type: "INT", isPk: false, isFk: true, desc: "FK -> customers.customer_id" },
      { name: "order_date", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Order timestamp" },
      { name: "subtotal", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Item subtotal" },
      { name: "shipping_fee", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Shipping cost" },
      { name: "total_amount", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Grand total" },
      { name: "order_status", type: "VARCHAR(30)", isPk: false, isFk: false, desc: "Status: Pending" },
      { name: "payment_method", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "Payment method" }
    ]
  },
  {
    name: "order_items",
    label: "Order_Items Table",
    description: "Junction table linking Orders to Products with quantity and price.",
    columns: [
      { name: "order_item_id", type: "INT", isPk: true, isFk: false, desc: "Primary key" },
      { name: "order_id", type: "INT", isPk: false, isFk: true, desc: "FK -> orders.order_id" },
      { name: "product_id", type: "INT", isPk: false, isFk: true, desc: "FK -> products.product_id" },
      { name: "quantity", type: "INT", isPk: false, isFk: false, desc: "Quantity ordered" },
      { name: "unit_price", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Price per unit" },
      { name: "subtotal", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Line total" }
    ]
  }
];

export const ERD_RELATIONSHIPS = [
  {
    from: "categories",
    to: "products",
    fromKey: "category_id",
    toKey: "category_id",
    type: "1-to-Many (1:N)",
    label: "One category contains multiple products"
  },
  {
    from: "customers",
    to: "orders",
    fromKey: "customer_id",
    toKey: "customer_id",
    type: "1-to-Many (1:N)",
    label: "One customer can place multiple orders"
  },
  {
    from: "orders",
    to: "order_items",
    fromKey: "order_id",
    toKey: "order_id",
    type: "1-to-Many (1:N)",
    label: "One order contains multiple items"
  },
  {
    from: "products",
    to: "order_items",
    fromKey: "product_id",
    toKey: "product_id",
    type: "1-to-Many (1:N)",
    label: "One product can be in multiple orders"
  }
];

export const SQL_SCHEMA_DDL = `-- E-Commerce Database Schema for SabayTinh (Exercise 4)

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(25) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'Pending',
    payment_method VARCHAR(50) DEFAULT 'Credit Card',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

INSERT INTO categories (category_name, slug) VALUES 
('Computers', 'computers'),
('Displays', 'displays'),
('Peripherals', 'peripherals');

INSERT INTO products (category_id, product_name, price, stock_quantity) VALUES
(1, 'SabayBook Pro Laptop', 650.00, 18),
(3, 'SabayGrip Precision Wireless Mouse', 15.00, 60),
(3, 'SabayKeys Mechanical Keyboard', 25.00, 45),
(2, 'SabayView 4K Ultra Monitor', 120.00, 24);
`;
