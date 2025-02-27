import ProductCard from "@/components/ProductCard";
import useCartStore from "../store/cartStore";

const products = [
  { id: 1, name: "Watermelon", price: 2.5, image: "/images/watermelon.jpg" },
  { id: 2, name: "Grapes", price: 3.5, image: "/images/grapes.webp" },
  { id: 3, name: "Melon", price: 5, image: "/images/melon.jpg" },
  { id: 4, name: "Banana", price: 2.5, image: "/images/banana.jpg" },
  { id: 5, name: "Apple", price: 4.5, image: "/images/apple.jpg" },
  { id: 6, name: "Orange", price: 5.6, image: "/images/orange.webp" },
  { id: 7, name: "Apricot", price: 8.6, image: "/images/Apricot.jpg" },
  { id: 8, name: "Kiwi", price: 5.6, image: "/images/kiwi.webp" },
  { id: 9, name: "Mango", price: 3.6, image: "/images/mango.webp" },
  { id: 10, name: "Papaya", price: 5.6, image: "/images/papaya.webp" },
  { id: 11, name: "Pineapple", price: 5.5, image: "/images/pineapple.jpg" },
  { id: 12, name: "Plum", price: 5.6, image: "/images/plum.png" },
];


const Home = () => {

  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="grid grid-cols-4 gap-4 p-8  bg-green-700">
      {products.map((product, id) => (
        <ProductCard key={id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
