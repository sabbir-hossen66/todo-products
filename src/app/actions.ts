"use server"

import { revalidatePath } from "next/cache"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  status: string
}

let products: Product[] = []

export async function initializeProducts() {
  if (typeof window !== "undefined") {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      products = JSON.parse(storedProducts)
    } else {
      products = [
        {
          id: 1,
          name: "Product 1",
          price: 10,
          image: "https://example.com/image1.jpg",
          category: "Category 1",
          status: "In Stock",
        },
        {
          id: 2,
          name: "Product 2",
          price: 20,
          image: "https://example.com/image2.jpg",
          category: "Category 2",
          status: "Out of Stock",
        },
      ]
      localStorage.setItem("products", JSON.stringify(products))
    }
  }
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const image = formData.get("image") as string
  const category = formData.get("category") as string
  const status = formData.get("status") as string

  const newProduct: Product = {
    id: Date.now(),
    name,
    price,
    image,
    category,
    status,
  }
  products.push(newProduct)
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }
  revalidatePath("/products")
}

export async function editProduct(formData: FormData) {
  const id = Number.parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const image = formData.get("image") as string
  const category = formData.get("category") as string
  const status = formData.get("status") as string

  products = products.map((p) => (p.id === id ? { ...p, name, price, image, category, status } : p))
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }
  revalidatePath("/products")
}

export async function deleteProduct(formData: FormData) {
  const id = Number.parseInt(formData.get("id") as string)
  products = products.filter((p) => p.id !== id)
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }
  revalidatePath("/products")
}

export async function getProducts() {
  await initializeProducts()
  return products
}

export async function toggleFavorite(id: number) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
  const index = favorites.indexOf(id)
  if (index > -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push(id)
  }
  localStorage.setItem("favorites", JSON.stringify(favorites))
  revalidatePath("/products")
}

export async function getFavorites() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites") || "[]")
  }
  return []
}

