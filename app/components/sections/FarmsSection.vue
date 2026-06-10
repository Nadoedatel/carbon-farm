<script setup lang="ts">
import { computed, ref } from 'vue'
import { FARMS } from '~/constants/farms'

const SECTION_EYEBROW = 'Портфолио'
const SECTION_TITLE = 'Реализованные фермы'
const SECTION_DESCRIPTION = 'Каждая ферма — это живой проект, который продолжает работать на климат. Смотрите, что мы уже сделали.'
const LOCATION_ICON = 'lucide:map-pin'
const UNIT_HA = 'га'
const UNIT_KG = 'кг'
const LABEL_TREES = 'деревьев'
const LABEL_AREA = 'площадь'
const LABEL_CO2 = 'CO₂ в год'

const lightboxFarmId = ref<string | null>(null)
const lightboxIndex = ref<number>(0)

const lightboxFarm = computed(() =>
  FARMS.find(f => f.id === lightboxFarmId.value) ?? null,
)

const lightboxImages = computed<string[]>(() =>
  lightboxFarm.value?.images ?? [],
)

const lightboxAltBase = computed<string>(() =>
  lightboxFarm.value ? `Ферма «${lightboxFarm.value.name}»` : '',
)

const isLightboxOpen = computed<boolean>(() => lightboxFarmId.value !== null)

function handleOpenLightbox(farmId: string, index: number): void {
  lightboxFarmId.value = farmId
  lightboxIndex.value = index
}

function handleCloseLightbox(): void {
  lightboxFarmId.value = null
}

function handleUpdateLightboxIndex(index: number): void {
  lightboxIndex.value = index
}
</script>

<template>
  <section id="farms" class="py-12 md:py-20 bg-white">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        :label="SECTION_EYEBROW"
        :title="SECTION_TITLE"
        :description="SECTION_DESCRIPTION"
      />

      <div class="flex flex-col gap-6">
        <article
          v-for="farm in FARMS"
          :key="farm.id"
          class="bg-surface border border-surface-dark rounded-2xl p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(26,92,56,0.1)]"
        >
          <div>
            <VBadge
              variant="outline"
              shape="pill"
              size="md"
              class="mb-3"
            >
              {{ farm.year }}
            </VBadge>
            <h3 class="text-xl font-bold text-primary-dark mb-1.5">
              «{{ farm.name }}»
            </h3>
            <p class="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
              <Icon :name="LOCATION_ICON" :size="30" aria-hidden="true" />
              {{ farm.region }}
            </p>
            <p class="text-sm leading-relaxed text-gray-600 mb-5 max-w-[40rem]">
              {{ farm.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <VBadge
                v-for="species in farm.species"
                :key="species"
                variant="outline"
                shape="rounded"
                size="sm"
              >
                {{ species }}
              </VBadge>
            </div>
          </div>

          <div class="flex flex-row md:flex-col gap-4 md:gap-5 min-w-[10rem] bg-white rounded-xl px-5 py-4 self-stretch md:self-start">
            <div class="text-left md:text-right">
              <span class="block text-lg md:text-2xl font-bold text-primary leading-tight">{{ formatNumber(farm.treesCount) }}</span>
              <span class="text-xs text-gray-500">{{ LABEL_TREES }}</span>
            </div>
            <div class="text-left md:text-right">
              <span class="block text-lg md:text-2xl font-bold text-primary leading-tight">{{ farm.area }} {{ UNIT_HA }}</span>
              <span class="text-xs text-gray-500">{{ LABEL_AREA }}</span>
            </div>
            <div class="text-left md:text-right">
              <span class="block text-lg md:text-2xl font-bold text-accent leading-tight">{{ formatNumber(farm.co2Annual) }} {{ UNIT_KG }}</span>
              <span class="text-xs text-gray-500">{{ LABEL_CO2 }}</span>
            </div>
          </div>

          <VImageSlider
            v-if="farm.images?.length"
            :images="farm.images"
            :alt-base="`Ферма «${farm.name}»`"
            class="col-span-full"
            @open-lightbox="handleOpenLightbox(farm.id, $event)"
          />
        </article>
      </div>
    </div>

    <VImageLightbox
      :images="lightboxImages"
      :current-index="lightboxIndex"
      :is-open="isLightboxOpen"
      :alt-base="lightboxAltBase"
      @close="handleCloseLightbox"
      @update:current-index="handleUpdateLightboxIndex"
    />
  </section>
</template>
