<script>
    import { truncateDescription } from '$lib/utils/helpers';
  
    export let products = [];
    export let title = "Nossos Produtos";
    export let addToCart;
    export let openDescriptionModal;
    export let filteredProducts = [];
    export let paginatedProducts = [];
    export let currentPage = 1;
    export let totalPages = 1;
    export let searchQuery = '';
    export let resetSearch;
    export let goToPage;
  </script>
  
  <section id="products" class="mb-12">
    <h2 class="text-3xl font-bold mb-8 text-center">{title}</h2>
    {#if filteredProducts.length === 0 && searchQuery}
      <div class="text-center py-8">
        <p class="text-xl mb-4">Nenhum produto encontrado para "{searchQuery}".</p>
        <button on:click={resetSearch} class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Ver Todos os Produtos
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each paginatedProducts as product (product.id)}
        <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[400px] w-[300px] mx-auto">
          <img src={product.imagem || "/placeholder.svg"} alt={product.nome} class="w-full h-48 object-cover" />
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="font-semibold mb-2 text-md">{product.nome}</h3>
            <div class="flex-grow overflow-hidden text-sm">
              <p class="text-gray-600 mb-2">
                {truncateDescription(product.descricao)}
              </p>
              {#if product.descricao.length > 100}
                <button 
                  on:click={() => openDescriptionModal(product)}
                  class="text-green-600 hover:text-green-800 text-xs mb-2 flex items-center"
                >
                  Saiba mais
                  <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              {/if}
            </div>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-lg font-bold">R${product.preco.toFixed(2)}</span>
              <button on:click={() => addToCart(product)} class="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-sm">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>          
        {/each}
      </div>
      {#if totalPages > 1}
        <div class="flex justify-center mt-8 space-x-2">
          {#each Array(totalPages) as _, i}
            <button
              on:click={() => goToPage(i + 1)}
              class="px-4 py-2 border rounded {currentPage === i + 1 ? 'bg-green-800 text-white' : 'bg-white text-green-800 hover:bg-green-100'}"
            >
              {i + 1}
            </button>
          {/each}
        </div>
      {/if}
    {/if}
  </section>