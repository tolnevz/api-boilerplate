<script setup lang="ts">
  import type { Message } from '@/models';
  import useStore from '@/stores/store';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const { templates, tags } = storeToRefs(store);
  const router = useRouter();
  const message = ref<Message | undefined>();
  const selectedTag = ref<string>('');

  onMounted(async () => {
    await getTemplatesData();
  });

  const getTemplatesData = async () => {
    const filters = selectedTag.value.length ? { 'filter[tags]': selectedTag.value.toString() } : {};
    await store.getTemplates(filters);
    await store.getTags();
  };

  const view = (id: any) => {
    router.push({ name: 'TemplateItem', params: { id } });
  };
  const remove = async (id: any) => {
    try {
      await store.removeTemplateItem(id);
      message.value = { type: 'success', text: 'Шаблон удален' };
      await getTemplatesData();
    } catch (err) {
      console.error(err);
      message.value = { type: 'error', text: 'Произошла ошибка' };
    }
  };

  const onSelectTag = async (tag: string) => {
    selectedTag.value = selectedTag.value === tag ? '' : tag;
    await getTemplatesData();
  };
</script>

<template>
  <div class="container" style="padding: 60px 0px">
    <div v-if="message" class="message" :class="message.type">{{ message.text }}</div>
    <div class="header">
      <h1 class="text-center">Шаблоны</h1>
      <button class="btn" @click="view('new')">Новый</button>
    </div>

    <div class="tags">
      <h3>Теги</h3>
      <div v-for="(tag, idx) in tags" :key="idx">
        <div class="tag" :class="selectedTag === tag ? 'active' : ''" @click="onSelectTag(tag)">{{ tag }}</div>
      </div>
    </div>

    <div class="templates-container">
      <div class="template-item" v-for="tmpl in templates" :key="tmpl.id">
        <div>
          <h2>{{ tmpl.name }}</h2>
          <div>
            <img :src="tmpl.preview_image" :alt="tmpl.name" />
          </div>
        </div>

        <div class="btn-container">
          <button class="btn" @click="view(tmpl.id)">Редактировать</button>
          <button class="btn danger" @click="remove(tmpl.id)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px 0px;

    .tag {
      border: 1px solid #c0c0c0;
      border-radius: 5px;
      padding: 5px 10px;
      margin: 5px;
      cursor: pointer;

      &.active {
        background-color: #c0c0c0;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .templates-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin: auto;

    .template-item {
      border: 1px solid #c0c0c0;
      border-radius: 10px;
      padding: 10px;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 0 10px #a8a8a8;
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }

    .btn-container {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }
</style>
