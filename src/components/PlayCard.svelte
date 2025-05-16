<script lang="ts">
  let { play, index } = $props();
</script>

<div class={`max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 m-6 
  ${play.onOffense ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'}`}>

<!-- Card header-->
  <div class={`p-4 flex justify-between items-center ${play.onOffense ? 'bg-green-600' : 'bg-red-600'} text-white rounded-t-lg`}>
    <h2 class="text-xl font-semibold">
        Play {index+1}: {play.down === 1 ? '1st Down' : play.down === 2 ? '2nd Down' : play.down === 3 ? '3rd Down' : '4th Down'}
    </h2>
    <span class="text-sm font-medium">{play.onOffense ? 'Offense' : 'Defense'}</span>
  </div>

  <!-- Card Body -->
  <div class="p-4">
      <!-- Play Summary -->
      <div class="flex justify-between items-center">
          <p class="text-sm text-gray-700">{play.yards} yards</p>
          <p class="text-sm font-medium text-gray-600">{play.td ? 'Touchdown!' : ''}{play.firstDown ? 'First down!' : ''}</p>
      </div>

      <!-- Condensed Play Information -->
      <div class="mt-2">
        <p class="text-gray-800">
          {#if play.punt}
            <span class="font-bold text-blue-500">Punt</span>
          <!-- Offense -->
          {:else if play.onOffense}
            <!-- Pass Play -->
            {#if play.pass}
              <!-- If complete -->
              {#if play.complete}
                <span class="font-bold text-blue-500">QB #{play.qbNum}</span> pass to 
                <span class="font-bold text-green-500">Player #{play.targetedPlayerNum}</span> for 
                <span class="font-bold text-green-500">{play.yards} yards</span> 
                {#if play.td}
                  and a <span class="font-bold text-green-500">TD</span>
                {/if}
                {#if play.firstDown}
                  and a <span class="font-bold text-green-500">First Down</span>
                {/if}
              {:else if play.sacked}
                <span class="font-bold text-red-500">QB #{play.qbNum}</span> sacked
              {:else if play.intercepted}
                <span class="font-bold text-red-600">QB #{play.qbNum}</span> intercepted!
              {:else}
                <span class="font-bold text-gray-600">QB #{play.qbNum}</span> pass incomplete
              {/if}
            {:else}     
            <!-- Run play -->
              <span class="font-bold text-green-600">RB #{play.targetedPlayerNum}</span> rush for 
              <span class="font-bold text-green-500">{play.yards} yards</span> 
              {#if play.td}
                and a <span class="font-bold text-green-500">TD</span>
              {/if}
              {#if play.firstDown}
                and a <span class="font-bold text-green-500">First Down</span>
              {/if}
            {/if}
          <!-- Defense -->
          {:else}
            <!-- Pass Play -->
            {#if play.pass}
              <!-- If complete -->
              {#if play.complete}
                Pass for 
                <span class="font-bold text-red-500">{play.yards} yards</span> 
                {#if play.td}
                  and a <span class="font-bold text-red-500">TD</span>
                {/if}
                {#if play.firstDown}
                  and a <span class="font-bold text-red-500">First Down</span>
                {/if}
                {#if play.targetedPlayerNum}
                  <br><span class="font-bold text-blue-500">Flag pull made by Player #{play.targetedPlayerNum}</span>
                {/if}
              {:else if play.sacked}
                Sacked by <span class="font-bold text-red-500">Player #{play.targetedPlayerNum}</span>
              {:else if play.intercepted}
                Intercepted by <span class="font-bold text-red-600">Player #{play.targetedPlayerNum}</span>!
              {:else}
                {#if play.targetedPlayerNum}
                  <span class="font-bold text-gray-600">Pass broken up by Player #{play.targetedPlayerNum}</span>
                {:else}
                  Pass incomplete
                {/if}
              {/if}
            {:else}     
            <!-- Run play -->
              Rush for <span class="font-bold text-red-500">{play.yards} yards</span> 
              {#if play.td}
                and a <span class="font-bold text-red-500">TD</span>
              {/if}
              {#if play.firstDown}
                and a <span class="font-bold text-red-500">First Down</span>
              {/if}
              {#if play.targetedPlayerNum}
                <br><span class="font-bold text-blue-500">Flag pull made by Player #{play.targetedPlayerNum}</span>
              {/if}
            {/if}
          {/if}
        </p>
      </div>
  </div>

  <!-- Card Footer (optional) -->
  <div class="p-4 bg-gray-50 rounded-b-lg">
      <!-- <button class="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          See Play Replay
      </button> -->
  </div>
</div>
