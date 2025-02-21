"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProduct } from "../actions"
import Link from "next/link"


export default function AddProduct() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleAddProduct(formData: FormData) {
    setIsSubmitting(true)
    await addProduct(formData)
    setIsSubmitting(false)
    router.push("/products")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddProduct(new FormData(e.currentTarget))
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block mb-2">
            Product Name
          </label>
          <input type="text" id="name" name="name" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input type="number" id="price" name="price" placeholder="$" step="0.01" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2">
            Image URL
          </label>
          <input type="url" id="image" name="image" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <input type="text" id="category" name="category" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2">
            Status
          </label>
          <select id="status" name="status" className="w-full p-2 border rounded" required>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
      <div>
        <Link href="/" className="text-blue-500 hover:underline">
          <button className="p-2 bg-orange-400 text-white font-semibold rounded mt-4">Back to Home</button>      </Link>
      </div>
    </div>
  )
}

