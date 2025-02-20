"use client"

import { useState, useEffect } from "react"
import ProductItem from "./ProductItem"
import { useRouter } from "next/navigation"
import { getFavorites, getProducts, Product } from "../actions"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const fetchedProducts = await getProducts()
      const fetchedFavorites = await getFavorites()
      setProducts(fetchedProducts)
      setFavorites(fetchedFavorites)
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price
      if (sortOrder === "desc") return b.price - a.price
      return 0
    })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onFavoriteToggle={() => {
                const newFavorites = favorites.includes(product.id)
                  ? favorites.filter((id) => id !== product.id)
                  : [...favorites, product.id]
                setFavorites(newFavorites)
                localStorage.setItem("favorites", JSON.stringify(newFavorites))
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

