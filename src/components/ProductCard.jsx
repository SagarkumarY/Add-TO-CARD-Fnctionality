import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="w-64 shadow-lg">
      <CardHeader className="flex items-center justify-center">
        <img src={product.image} alt={product.name} className="w-32 h-32 object-contain" />
      </CardHeader>
      <CardContent className="text-center ">
        <CardTitle>{product.name}</CardTitle>
        <p className="text-gray-500 pt-3">${product.price}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button  className="bg-emerald-400" onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
