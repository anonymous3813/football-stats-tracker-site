<script>
    let {gameId, opponent, score1, score2} = $props()
</script>

<a href={`/${gameId}`}>
  <div class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg m-6">
    <!-- Game Card Header -->
    <div class="p-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">{opponent}</h2>
    </div>
  
    <!-- Game Details -->
    <div class="p-4">
      <p class="text-gray-700">{`${score1} to ${score2}`}</p>
    </div>
  
    <!-- Card Footer --->
    <div class="p-4 bg-gray-50 rounded-b-lg">
        <button class="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Game leaders
        </button>
      </div>
  </div>
</a>
  
  