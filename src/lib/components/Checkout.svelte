<script>
    export let isCheckoutVisible;
    export let cartTotal;
    export let completeCheckout;
    export let selectedPaymentMethod = '';
    export let shippingAddress = '';
    export let billingAddress = '';
  
    let cardNumber = '';
    let cardName = '';
    let cardExpiry = '';
    let cardCVV = '';
  </script>
  
  {#if isCheckoutVisible}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6">Finalizar Compra</h2>
        <form on:submit|preventDefault={completeCheckout} class="space-y-6">
          <div>
            <label for="shipping" class="block mb-2 font-semibold">Endereço de Entrega</label>
            <textarea id="shipping" bind:value={shippingAddress} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"></textarea>
          </div>
          <div>
            <label for="billing" class="block mb-2 font-semibold">Endereço de Cobrança</label>
            <textarea id="billing" bind:value={billingAddress} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"></textarea>
          </div>
          <div>
            <label for="payment" class="block mb-2 font-semibold">Método de Pagamento</label>
            <select id="payment" bind:value={selectedPaymentMethod} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500">
              <option value="">Selecione um método de pagamento</option>
              <option value="credit">Cartão de Crédito</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Transferência Bancária</option>
            </select>
          </div>
          {#if selectedPaymentMethod === 'credit'}
            <div class="space-y-4">
              <div>
                <label for="cardNumber" class="block mb-2 font-semibold">Número do Cartão</label>
                <input type="text" id="cardNumber" bind:value={cardNumber} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" placeholder="1234 5678 9012 3456" />
              </div>
              <div>
                <label for="cardName" class="block mb-2 font-semibold">Nome no Cartão</label>
                <input type="text" id="cardName" bind:value={cardName} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" placeholder="João da Silva" />
              </div>
              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="cardExpiry" class="block mb-2 font-semibold">Data de Expiração</label>
                  <input type="text" id="cardExpiry" bind:value={cardExpiry} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" placeholder="MM/AA" />
                </div>
                <div class="w-1/2">
                  <label for="cardCVV" class="block mb-2 font-semibold">CVV</label>
                  <input type="text" id="cardCVV" bind:value={cardCVV} required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" placeholder="123" />
                </div>
              </div>
            </div>
          {/if}
          <p class="font-semibold text-lg">Total: R${cartTotal.toFixed(2)}</p>
          <div class="flex justify-end space-x-4">
            <button type="button" on:click={() => isCheckoutVisible = false} class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Confirmar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}