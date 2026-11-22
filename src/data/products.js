// SabayTinh Official Product Catalog (From Practical Exercise 1)
// 1. Laptop: $650
// 2. Mouse: $15
// 3. Keyboard: $25
// 4. Monitor: $120

export const PRODUCTS = [
  {
    id: "prod-laptop",
    name: "SabayBook Pro Laptop",
    category: "Computers",
    price: 650,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Flagship",
    tagline: '14" Liquid Retina Display • 120Hz ProMotion',
    description: "Precision-milled aerospace aluminum unibody. 12-core architecture, 16GB unified memory, and 512GB NVMe SSD storage.",
    specs: {
      Processor: "Octa-Core 3.2GHz",
      Memory: "16GB LPDDR5X",
      Storage: "512GB PCIe 4.0 SSD",
      Display: '14.2" Liquid Retina 120Hz',
      Battery: "Up to 18 Hours",
      Weight: "1.38 kg",
      Ports: "Thunderbolt 4, HDMI 2.1, Audio",
      Chassis: "Anodized Aluminum"
    },
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    color: "#27272a",
    dimensions: "31.2 x 22.1 x 1.5 cm"
  },
  {
    id: "prod-monitor",
    name: "SabayView 4K Ultra Monitor",
    category: "Displays",
    price: 120,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Studio",
    tagline: '27" UHD 4K IPS • 100Hz Refresh Rate',
    description: "Borderless studio display with 99% sRGB color accuracy, HDR10 dynamic range, and integrated 65W USB-C power delivery.",
    specs: {
      ScreenSize: '27" Flat IPS',
      Resolution: "3840 x 2160 UHD 4K",
      RefreshRate: "100Hz Adaptive-Sync",
      Color: "99% sRGB / HDR10",
      Brightness: "400 nits",
      Ports: "USB-C (65W PD), HDMI 2.0, DP 1.4",
      Stand: "Height, Tilt & Swivel Adjustable",
      Bezel: "Micro-Edge Borderless"
    },
    inStock: true,
    stockCount: 24,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
    color: "#18181b",
    dimensions: "61.3 x 36.4 x 4.5 cm"
  },
  {
    id: "prod-keyboard",
    name: "SabayKeys Mechanical Keyboard",
    category: "Peripherals",
    price: 25,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Tactile",
    tagline: "75% Compact Layout • Hot-Swappable Switches",
    description: "Engineered for tactile typing precision with pre-lubed switches, sound-dampening silicone foam, and dual Bluetooth/USB-C modes.",
    specs: {
      Layout: "75% Compact (82 Keys)",
      Switches: "Hot-Swappable Tactile Brown",
      Keycaps: "Double-Shot PBT",
      Connectivity: "USB-C / Bluetooth 5.2",
      Backlight: "Subtle White LED",
      Battery: "3000mAh Rechargeable",
      OS: "macOS, Windows, Linux"
    },
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    color: "#3f3f46",
    dimensions: "32.0 x 13.5 x 3.8 cm"
  },
  {
    id: "prod-mouse",
    name: "SabayGrip Precision Wireless Mouse",
    category: "Peripherals",
    price: 15,
    rating: 4.7,
    reviewsCount: 180,
    badge: "Ergonomic",
    tagline: "4000 DPI Silent Optical Sensor • 68g Ultra-Light",
    description: "Silent micro-switches, PTFE glide feet, and dual 2.4GHz / Bluetooth connectivity. Designed for comfortable, fatigue-free control.",
    specs: {
      Sensor: "Optical (800 - 4000 DPI)",
      Buttons: "6 Silent Micro-Switches",
      Connectivity: "2.4GHz Wireless + Bluetooth",
      Weight: "68 grams",
      Battery: "Type-C Fast Charging",
      Range: "Up to 10m",
      Grip: "Ergonomic Right-Handed"
    },
    inStock: true,
    stockCount: 60,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80",
    color: "#52525b",
    dimensions: "11.2 x 6.5 x 3.9 cm"
  }
];

export const SHIPPING_METHODS = [
  {
    id: "ship-standard",
    name: "Standard Ground Delivery",
    duration: "3 - 5 Business Days",
    cost: 0,
    badge: "Free",
    description: "Carbon-neutral ground shipping"
  },
  {
    id: "ship-express",
    name: "Express Priority Shipping",
    duration: "1 - 2 Business Days",
    cost: 9,
    badge: "$9.00",
    description: "Fast expedited air courier"
  },
  {
    id: "ship-sameday",
    name: "Same-Day Courier",
    duration: "Within 2 - 4 Hours",
    cost: 15,
    badge: "$15.00",
    description: "Direct on-demand local delivery"
  }
];

export const PROMO_CODES = {
  SABAY10: { code: "SABAY10", discountPercent: 10, label: "10% Off" },
  SAVE5: { code: "SAVE5", discountFixed: 5, label: "$5 Off" }
};
