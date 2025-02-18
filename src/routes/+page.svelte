<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { supabase } from "$lib/supabase";
    import { cart, addToCart, removeFromCart, updateQuantity, clearCart } from '$lib/stores/cart';
    import { truncateDescription } from '$lib/utils/helpers';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ProductList from '$lib/components/ProductList.svelte';
    import Cart from '$lib/components/Cart.svelte';
    import Checkout from '$lib/components/Checkout.svelte';
    import DescriptionModal from '$lib/components/DescriptionModal.svelte';
  
    let products = [];
    let searchQuery = '';
    let showAllProducts = true;
    let currentPage = 1;
    let itemsPerPage = 6;
    let showDescriptionModal = false;
    let selectedProduct = null;
    let isCartVisible = false;
    let isCheckoutVisible = false;
  
    $: filteredProducts = showAllProducts
      ? products
      : products.filter(product =>
          product.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.descricao.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
    $: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    $: paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    $: cartTotal = $cart.reduce((total, item) => total + item.preco * item.quantity, 0);
    $: cartItemCount = $cart.reduce((count, item) => count + item.quantity, 0);
  
    onMount(async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
      
      if (error) {
        console.error('Error fetching products:', error)
      } else {
        products = data;
      }
    });
  
    function handleSearch() {
      showAllProducts = false;
      scrollToProducts();
    }
  
    function resetSearch() {
      searchQuery = '';
      showAllProducts = true;
      scrollToProducts();
    }
  
    function scrollToProducts() {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    function goToPage(page) {
      currentPage = page;
      scrollToProducts();
    }
  
    function toggleCart() {
      isCartVisible = !isCartVisible;
    }
  
    function startCheckout() {
      isCheckoutVisible = true;
      isCartVisible = false;
    }
  
    function openDescriptionModal(product) {
      selectedProduct = product;
      showDescriptionModal = true;
    }
  
    function closeDescriptionModal() {
      showDescriptionModal = false;
      selectedProduct = null;
    }
  
    let selectedPaymentMethod = '';
    let shippingAddress = '';
    let billingAddress = '';
  
    function completeCheckout() {
      if (!selectedPaymentMethod || !shippingAddress || !billingAddress) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }
      alert(`Obrigado pela sua compra! O total do seu pedido é R$${cartTotal.toFixed(2)}. Método de pagamento: ${selectedPaymentMethod}`);
      clearCart();
      isCheckoutVisible = false;
    }
  </script>
  
  <div class="min-h-screen bg-gray-100">
    <Header {searchQuery} {handleSearch} {resetSearch} {toggleCart} {cartItemCount} />
  
    <main class="container mx-auto px-4 py-8 mt-16">
      <section class="text-center py-12 bg-green-700 text-white rounded-lg mb-12">
        <h1 class="text-4xl font-bold mb-4">Experimente o Melhor da Natureza</h1>
        <p class="text-xl mb-8">Descubra nossa linha de produtos naturais premium para uma vida mais saudável.</p>
        <a href="#products" class="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors">
          Compre Agora
        </a>
      </section>
  
      <ProductList 
        products={products.filter(p => p.destaque)} 
        title="Produtos em Destaque" 
        {addToCart}
        {openDescriptionModal}
      />
  
      <ProductList 
        {products}
        {filteredProducts}
        {paginatedProducts}
        {currentPage}
        {totalPages}
        {searchQuery}
        {resetSearch}
        {addToCart}
        {openDescriptionModal}
        {goToPage}
      />
  
      <section id="benefits" class="mb-12 bg-green-100 rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-8 text-center">Por que Escolher Nossos Produtos?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold mb-2">100% Natural</h3>
            <p>Todos os nossos produtos são feitos com ingredientes puros e naturais.</p>
          </div>
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Ecológico</h3>
            <p>Utilizamos práticas sustentáveis e embalagens ecológicas.</p>
          </div>
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Qualidade Garantida</h3>
            <p>Garantimos a qualidade de todos os nossos produtos.</p>
          </div>
        </div>
      </section>
    </main>
  
    <Footer />
  
    <Cart {isCartVisible} {toggleCart} {cart} {updateQuantity} {removeFromCart} {clearCart} {startCheckout} {cartTotal} />
  
    <Checkout {isCheckoutVisible} {cartTotal} {completeCheckout} bind:selectedPaymentMethod bind:shippingAddress bind:billingAddress />
  
    <DescriptionModal {showDescriptionModal} {selectedProduct} {closeDescriptionModal} />
  </div>
  
  <style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  
    html {
      scroll-behavior: smooth;
    }
  </style>