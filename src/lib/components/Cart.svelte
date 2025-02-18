<script>
    export let isCartVisible;
    export let toggleCart;
    export let cart;
    export let updateQuantity;
    export let removeFromCart;
    export let clearCart;
    export let startCheckout;
    export let cartTotal;
  </script>
  
  <div class="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform {isCartVisible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50">
    <div class="p-6 h-full flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Seu Carrinho</h2>
        <button on:click={toggleCart} class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {#if $cart.length > 0}
        <ul class="space-y-6 flex-grow overflow-auto">
          {#each $cart as item (item.id)}
            <li class="flex items-center space-x-4 border-b pb-4">
              <img src={item.imagem || "/placeholder.svg"} alt={item.nome} class="w-16 h-16 object-cover rounded" />
              <div class="flex-grow">
                <h3 class="font-semibold">{item.nome}</h3>
                <p class="text-sm text-gray-500">R${item.preco.toFixed(2)}</p>
                <div class="flex items-center mt-2">
                  <button on:click={() => updateQuantity(item.id, item.quantity - 1)} class="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">-</button>
                  <span class="mx-2">{item.quantity}</span>
                  <button on:click={() => updateQuantity(item.id, item.quantity + 1)} class="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">+</button>
                </div>
              </div>
              <button on:click={() => removeFromCart(item.id)} class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </li>
          {/each}
        </ul>
        <div class="mt-6 space-y-4">
          <p class="font-semibold text-lg">Total: R${cartTotal.toFixed(2)}</p>
          <button on:click={clearCart} class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
            Limpar Carrinho
          </button>
          <button on:click={startCheckout} class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Finalizar Compra
          </button>
        </div>
      {:else}
        <p class="text-center text-gray-500">Seu carrinho está vazio.</p>
      {/if}
    </div>
  </div>