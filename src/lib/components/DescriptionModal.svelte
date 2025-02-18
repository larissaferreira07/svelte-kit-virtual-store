<script>
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    export let showDescriptionModal;
    export let selectedProduct;
    export let closeDescriptionModal;
  </script>
  
  {#if showDescriptionModal && selectedProduct}
    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" on:click={closeDescriptionModal}></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          transition:fly="{{ y: 200, duration: 300, easing: quintOut }}"
        >
          <div class="bg-gradient-to-br from-green-50 to-green-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center" id="modal-title">
                  {selectedProduct.nome}
                </h3>
                <div class="mt-4 bg-white rounded-lg p-4 shadow-inner">
                  <p class="text-sm text-gray-700 leading-relaxed">
                    {selectedProduct.descricao}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                on:click={closeDescriptionModal}
              >
                Fechar
              </button>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-green-400 to-green-500"></div>
        </div>
      </div>
    </div>
  {/if}