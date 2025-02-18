<script>
    export let searchQuery = '';
    export let handleSearch;
    export let resetSearch;
    export let toggleCart;
    export let cartItemCount;
  
    let isMobileMenuOpen = false;
  
    function toggleMobileMenu() {
      isMobileMenuOpen = !isMobileMenuOpen;
    }
  
    function handleClickOutside(event) {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        isMobileMenuOpen = false;
      }
    }
  </script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <header class="bg-green-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-2xl font-bold">Virtual Store</span>
      </div>
      <nav class="hidden md:flex space-x-4">
        <a href="#featured" class="hover:text-green-200">Destaques</a>
        <a href="#products" class="hover:text-green-200">Produtos</a>
        <a href="#benefits" class="hover:text-green-200">Benefícios</a>
      </nav>
      <div class="flex items-center space-x-4">
        <form on:submit|preventDefault={handleSearch} class="relative hidden md:block">
          <input
            type="search"
            bind:value={searchQuery}
            placeholder="Buscar produtos..."
            class="w-64 px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />
          <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
        <button on:click={toggleCart} class="relative text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {#if cartItemCount > 0}
            <span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          {/if}
        </button>
        <button on:click={toggleMobileMenu} class="md:hidden menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  
  {#if isMobileMenuOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={toggleMobileMenu}></div>
    <div class="fixed top-0 right-0 w-64 h-full bg-green-800 text-white z-50 p-4 transform transition-transform duration-300 ease-in-out mobile-menu" class:translate-x-0={isMobileMenuOpen} class:translate-x-full={!isMobileMenuOpen}>
      <div class="flex justify-end">
        <button on:click={toggleMobileMenu} class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav class="mt-8 space-y-4">
        <a href="#featured" class="block hover:text-green-200" on:click={toggleMobileMenu}>Destaques</a>
        <a href="#products" class="block hover:text-green-200" on:click={toggleMobileMenu}>Produtos</a>
        <a href="#benefits" class="block hover:text-green-200" on:click={toggleMobileMenu}>Benefícios</a>
        <a href="#testimonials" class="block hover:text-green-200" on:click={toggleMobileMenu}>Depoimentos</a>
      </nav>
      <form on:submit|preventDefault={() => { handleSearch(); toggleMobileMenu(); }} class="mt-8">
        <input
          type="search"
          bind:value={searchQuery}
          placeholder="Buscar produtos..."
          class="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />
        <button type="submit" class="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Buscar
        </button>
      </form>
    </div>
  {/if}