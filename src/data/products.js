// SabayTinh Official Product Catalog (From Practical Exercise 1)
// 1. Laptop: $650
// 2. Mouse: $15
// 3. Keyboard: $25
// 4. Monitor: $120

export const PRODUCTS = [
  {
    id: "prod-laptop",
    name: "SabayBook Pro Laptop",
    khmerName: "កុំព្យូទ័រយួរដៃ Laptop",
    category: "Computers",
    price: 650,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Best Seller",
    tagline: "Ultra-slim aerospace aluminum with 14-inch 120Hz Liquid Retina display",
    description: "The SabayBook Pro redefines productivity with a stunning unibody finish, 12-core silicon architecture, 16GB unified memory, and 512GB ultra-fast NVMe storage. Designed for creators, developers, and power users in Cambodia.",
    specs: {
      Processor: "Octa-Core M-Silicon 3.2GHz",
      Memory: "16GB LPDDR5X Dual Channel",
      Storage: "512GB PCIe 4.0 NVMe SSD",
      Display: '14.2" Liquid Retina (2560x1600), 120Hz ProMotion',
      Battery: "70Wh (Up to 18 Hours battery life)",
      Weight: "1.38 kg",
      Ports: "2x Thunderbolt 4, 1x HDMI 2.1, 1x MagCharge, 3.5mm Audio",
      Color: "Space Gray / Silver Anodized"
    },
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    color: "#27272a",
    threeMeshName: "laptopMesh",
    dimensions: "31.2 x 22.1 x 1.5 cm"
  },
  {
    id: "prod-monitor",
    name: "SabayView 4K Ultra Monitor",
    khmerName: "អេក្រង់កុំព្យូទ័រ Monitor",
    category: "Displays",
    price: 120,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Most Popular",
    tagline: '27-inch 4K UHD IPS borderless studio monitor with 100Hz refresh rate',
    description: "Crystal clear visual fidelity for multitasking and high-fidelity media production. Featuring 99% sRGB color gamut, HDR10 dynamic range, eye-care flicker-free technology, and integrated USB-C 65W power delivery.",
    specs: {
      ScreenSize: '27" Flat IPS Panel',
      Resolution: "3840 x 2160 UHD 4K",
      RefreshRate: "100Hz with Adaptive-Sync",
      ColorGamut: "99% sRGB / 95% DCI-P3",
      Brightness: "400 nits (HDR10)",
      Connectivity: "1x USB-C (65W PD), 2x HDMI 2.0, 1x DisplayPort 1.4",
      Stand: "Height, Tilt, Swivel, and 90° Pivot Adjustable",
      Bezel: "3-Side Borderless Micro-Edge"
    },
    inStock: true,
    stockCount: 24,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
    color: "#18181b",
    threeMeshName: "monitorMesh",
    dimensions: "61.3 x 36.4 x 4.5 cm"
  },
  {
    id: "prod-keyboard",
    name: "SabayKeys Tactile Mechanical Keyboard",
    khmerName: "ក្ដារចុច Keyboard",
    category: "Peripherals",
    price: 25,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Value Choice",
    tagline: "75% compact hot-swappable mechanical switches with subtle white LED backlighting",
    description: "Engineered for rapid typing precision with pre-lubed tactile mechanical switches, sound-dampening silicone foam, double-shot PBT keycaps, and dual-mode connectivity (Type-C wired & Bluetooth 5.2).",
    specs: {
      Layout: "75% Compact (82 Keys)",
      SwitchType: "Hot-Swappable Custom Tactile Brown Switches",
      Keycaps: "Double-Shot PBT OEM Profile",
      Connectivity: "Detachable USB-C / Bluetooth 5.2",
      Backlight: "Clean Pure White LED with 14 Dynamic Effects",
      Battery: "3000mAh Rechargeable (Up to 200h without light)",
      Compatibility: "Windows, macOS, iOS, Android, Linux"
    },
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    color: "#3f3f46",
    threeMeshName: "keyboardMesh",
    dimensions: "32.0 x 13.5 x 3.8 cm"
  },
  {
    id: "prod-mouse",
    name: "SabayGrip Precision Wireless Mouse",
    khmerName: "កណ្តុរកុំព្យូទ័រ Mouse",
    category: "Peripherals",
    price: 15,
    rating: 4.7,
    reviewsCount: 180,
    badge: "Essential",
    tagline: "Ultra-silent optical sensor with 4000 DPI and ergonomic palm curvature",
    description: "Whisper-quiet clicks combined with a smooth-glide Teflon PTFE feet and an optical sensor that tracks flawlessly on any surface, even clear glass. Lightweight at only 68g for fatigue-free all-day comfort.",
    specs: {
      Sensor: "Precision Optical Tracking Sensor (800 - 4000 DPI adjustable)",
      Buttons: "6 Silent Micro-switch Buttons (Left, Right, Wheel, DPI, Forward, Back)",
      Connectivity: "2.4GHz Nano USB Receiver + Bluetooth 5.0 Dual Mode",
      Weight: "68 grams ultra-light",
      Battery: "Type-C Fast Charge (3 months per charge)",
      Range: "Up to 10 meters wireless freedom",
      Ergonomics: "Right-Handed Sculpted Thumb Rest"
    },
    inStock: true,
    stockCount: 60,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80",
    color: "#52525b",
    threeMeshName: "mouseMesh",
    dimensions: "11.2 x 6.5 x 3.9 cm"
  }
];

export const SHIPPING_METHODS = [
  {
    id: "ship-standard",
    name: "Free Standard Shipping",
    duration: "3 - 5 Business Days",
    cost: 0,
    badge: "Free",
    description: "Reliable ground delivery nationwide across Cambodia (Phnom Penh & Provinces)"
  },
  {
    id: "ship-express",
    name: "Express Shipping",
    duration: "1 - 2 Business Days",
    cost: 9,
    badge: "$9.00",
    description: "Priority fast courier dispatch via J&T Express / Virak Buntham"
  },
  {
    id: "ship-sameday",
    name: "Phnom Penh Same-Day Delivery",
    duration: "Within 2 - 4 Hours",
    cost: 15,
    badge: "$15.00",
    description: "Direct GrabExpress / Delivery motorbike dispatch directly to your door"
  }
];

export const PROMO_CODES = {
  SABAY10: { code: "SABAY10", discountPercent: 10, label: "10% Welcome Discount" },
  KHQR: { code: "KHQR", discountFixed: 5, label: "$5 Bakong KHQR Special Discount" },
  FREESHIP: { code: "FREESHIP", freeShipping: true, label: "100% Free Shipping Voucher" }
};
