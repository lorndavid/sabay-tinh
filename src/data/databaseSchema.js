// Database schema definitions for Practical Exercise 4
// Tables: Customers, Categories, Products, Orders, Order_Items

export const ERD_TABLES = [
  {
    name: "customers",
    label: "Customers (អតិថិជន)",
    description: "Stores registered customer personal details, shipping address, and contact info.",
    color: "emerald",
    columns: [
      { name: "customer_id", type: "INT", isPk: true, isFk: false, desc: "Unique identifier for customer (Auto Increment)" },
      { name: "first_name", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "Customer first name (Required)" },
      { name: "last_name", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "Customer last name (Required)" },
      { name: "email", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Unique email address for notifications" },
      { name: "phone_number", type: "VARCHAR(25)", isPk: false, isFk: false, desc: "Contact phone number (e.g. +855...)" },
      { name: "address", type: "TEXT", isPk: false, isFk: false, desc: "Street address / Khan / Sangkat" },
      { name: "city", type: "VARCHAR(60)", isPk: false, isFk: false, desc: "City / Province (e.g. Phnom Penh)" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Account creation date" }
    ]
  },
  {
    name: "categories",
    label: "Categories (ប្រភេទផលិតផល)",
    description: "Organizes products into logical collections (Computers, Peripherals, Displays).",
    color: "amber",
    columns: [
      { name: "category_id", type: "INT", isPk: true, isFk: false, desc: "Primary key for category" },
      { name: "category_name", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Category display name" },
      { name: "slug", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "URL friendly identifier" },
      { name: "description", type: "TEXT", isPk: false, isFk: false, desc: "Optional category summary" }
    ]
  },
  {
    name: "products",
    label: "Products (ផលិតផល)",
    description: "Catalog items available for purchase (Laptop $650, Monitor $120, Keyboard $25, Mouse $15).",
    color: "blue",
    columns: [
      { name: "product_id", type: "INT", isPk: true, isFk: false, desc: "Primary key for product" },
      { name: "category_id", type: "INT", isPk: false, isFk: true, desc: "FK -> categories.category_id" },
      { name: "product_name", type: "VARCHAR(150)", isPk: false, isFk: false, desc: "Display title of the product" },
      { name: "price", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Base price in USD" },
      { name: "stock_quantity", type: "INT", isPk: false, isFk: false, desc: "Current inventory count" },
      { name: "image_url", type: "VARCHAR(255)", isPk: false, isFk: false, desc: "Product photo asset path" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Creation timestamp" }
    ]
  },
  {
    name: "orders",
    label: "Orders (ការបញ្ជាទិញ)",
    description: "Customer checkout transactions with status, totals, and shipping details.",
    color: "purple",
    columns: [
      { name: "order_id", type: "INT", isPk: true, isFk: false, desc: "Primary key for order (e.g. ORD-0001)" },
      { name: "customer_id", type: "INT", isPk: false, isFk: true, desc: "FK -> customers.customer_id" },
      { name: "order_date", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Date and time order placed" },
      { name: "subtotal", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Sum of ordered item prices" },
      { name: "shipping_fee", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Selected shipping option cost" },
      { name: "total_amount", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Grand total amount payable" },
      { name: "order_status", type: "VARCHAR(30)", isPk: false, isFk: false, desc: "Pending, Processing, Shipped, Delivered" },
      { name: "payment_method", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "KHQR Bakong, Card, COD" }
    ]
  },
  {
    name: "order_items",
    label: "Order_Items (ទំនិញក្នុងកន្ត្រកបញ្ជាទិញ)",
    description: "Junction table linking Orders to Products with quantity and captured unit price.",
    color: "rose",
    columns: [
      { name: "order_item_id", type: "INT", isPk: true, isFk: false, desc: "Primary key for line item" },
      { name: "order_id", type: "INT", isPk: false, isFk: true, desc: "FK -> orders.order_id" },
      { name: "product_id", type: "INT", isPk: false, isFk: true, desc: "FK -> products.product_id" },
      { name: "quantity", type: "INT", isPk: false, isFk: false, desc: "Quantity ordered (min: 1)" },
      { name: "unit_price", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Price per unit at order time" },
      { name: "subtotal", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "quantity * unit_price" }
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
    label: "One Category contains Many Products"
  },
  {
    from: "customers",
    to: "orders",
    fromKey: "customer_id",
    toKey: "customer_id",
    type: "1-to-Many (1:N)",
    label: "One Customer places Many Orders"
  },
  {
    from: "orders",
    to: "order_items",
    fromKey: "order_id",
    toKey: "order_id",
    type: "1-to-Many (1:N)",
    label: "One Order has Many Order Items"
  },
  {
    from: "products",
    to: "order_items",
    fromKey: "product_id",
    toKey: "product_id",
    type: "1-to-Many (1:N)",
    label: "One Product is referenced in Many Order Items"
  }
];

export const SQL_SCHEMA_DDL = `-- E-Commerce Order Database Schema for SabayTinh (Exercise 4)
-- Compatible with MySQL / PostgreSQL

-- 1. Table: Customers
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

-- 2. Table: Categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- 3. Table: Products
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

-- 4. Table: Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'Pending',
    payment_method VARCHAR(50) DEFAULT 'KHQR Bakong',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT
);

-- 5. Table: Order_Items
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

-- Seed Initial Products (Laptop $650, Mouse $15, Keyboard $25, Monitor $120)
INSERT INTO categories (category_name, slug) VALUES 
('Computers', 'computers'),
('Displays', 'displays'),
('Peripherals', 'peripherals');

INSERT INTO products (category_id, product_name, price, stock_quantity) VALUES
(1, 'SabayBook Pro Laptop', 650.00, 18),
(3, 'SabayGrip Precision Wireless Mouse', 15.00, 60),
(3, 'SabayKeys Tactile Mechanical Keyboard', 25.00, 45),
(2, 'SabayView 4K Ultra Monitor', 120.00, 24);
`;
