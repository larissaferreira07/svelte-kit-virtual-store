import { writable } from 'svelte/store';

export const cart = writable([]);

export function addToCart(product) {
  cart.update(items => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      return items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...items, { ...product, quantity: 1 }];
  });
}

export function removeFromCart(id) {
  cart.update(items => items.filter(item => item.id !== id));
}

export function updateQuantity(id, newQuantity) {
  cart.update(items =>
    items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    )
  );
}

export function clearCart() {
  cart.set([]);
}