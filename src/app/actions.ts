"use server"

import { revalidatePath } from "next/cache"

let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
]

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const newProduct = { id: Date.now(), name, price }
  products.push(newProduct)
  revalidatePath("/products")
}

export async function editProduct(formData: FormData) {
  const id = Number.parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const price = Number.parseFloat(formData.get("price") as string)
  products = products.map((p) => (p.id === id ? { ...p, name, price } : p))
  revalidatePath("/products")
}

export async function deleteProduct(formData: FormData) {
  const id = Number.parseInt(formData.get("id") as string)
  products = products.filter((p) => p.id !== id)
  revalidatePath("/products")
}

export async function getProducts() {
  return products
}

