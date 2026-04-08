import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import type { Product } from "@/context/CartContext";

export const categories = [
  { id: "men", name: "Men", description: "Premium menswear collection" },
  { id: "women", name: "Women", description: "Elegant women's fashion" },
  { id: "boys", name: "Boys", description: "Trendy styles for boys" },
  { id: "girls", name: "Girls", description: "Cute & stylish for girls" },
];

export const products: Product[] = [
  { id: "1", image: product1, name: "Premium Leather Sneakers", price: 129, originalPrice: 189, rating: 5, category: "men", description: "Handcrafted premium leather sneakers with memory foam insoles for all-day comfort. Features a sleek modern design perfect for casual and semi-formal occasions." },
  { id: "2", image: product2, name: "Designer Handbag", price: 249, originalPrice: 349, rating: 4, category: "women", description: "Luxury designer handbag made from genuine Italian leather. Spacious interior with multiple compartments and elegant gold-tone hardware." },
  { id: "3", image: product4, name: "Luxury Wristwatch", price: 399, rating: 5, category: "men", description: "Swiss-made luxury wristwatch with sapphire crystal glass and automatic movement. Water resistant to 100 meters." },
  { id: "4", image: product5, name: "Classic Denim Jacket", price: 89, originalPrice: 129, rating: 4, category: "boys", description: "Timeless denim jacket with a modern fit. Features premium selvedge denim and classic brass buttons." },
  { id: "5", image: product6, name: "Running Shoes Pro", price: 159, originalPrice: 199, rating: 4, category: "men", description: "High-performance running shoes with responsive cushioning and breathable mesh upper. Designed for both training and racing." },
  { id: "6", image: product7, name: "Silk Pattern Scarf", price: 69, rating: 3, category: "women", description: "Luxurious silk scarf with hand-printed patterns. Versatile accessory that adds elegance to any outfit." },
  { id: "7", image: product8, name: "Italian Leather Belt", price: 79, originalPrice: 99, rating: 5, category: "men", description: "Handmade Italian leather belt with polished stainless steel buckle. Available in classic and reversible styles." },
  { id: "8", image: product1, name: "Casual Sneakers V2", price: 109, rating: 4, category: "boys", description: "Updated casual sneakers with improved comfort and durability. Perfect for everyday wear." },
  { id: "9", image: product2, name: "Evening Clutch", price: 179, originalPrice: 229, rating: 5, category: "women", description: "Elegant evening clutch with crystal embellishments. Perfect for special occasions and formal events." },
  { id: "10", image: product5, name: "Girls Denim Jacket", price: 69, originalPrice: 89, rating: 4, category: "girls", description: "Adorable denim jacket sized for girls. Features soft cotton lining and fun embroidered details." },
  { id: "11", image: product6, name: "Kids Sports Shoes", price: 79, rating: 4, category: "girls", description: "Comfortable and durable sports shoes designed for active kids. Lightweight with excellent grip." },
  { id: "12", image: product7, name: "Boys Patterned Scarf", price: 39, rating: 3, category: "boys", description: "Warm patterned scarf perfect for cooler weather. Made from soft, hypoallergenic materials." },
];

export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getCategoryById = (id: string) =>
  categories.find((c) => c.id === id);
