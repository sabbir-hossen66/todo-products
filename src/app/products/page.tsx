import { getProducts } from "../actions"
import ProductItem from "./ProductItem"

export default async function ProductList() {
  const products = await getProducts()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}

