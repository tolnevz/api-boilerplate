<script setup lang="ts">
  import type { Message, Template } from '@/models';
  import useStore from '@/stores/store';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const store = useStore();
  const route = useRoute();
  // const router = useRouter();
  const templateId = String(route.params.id);
  const template = ref<Template>({
    name: '',
    height: '',
    width: '',
    tags: [],
  } as unknown as Template);
  const message = ref<Message | undefined>();

  onMounted(async () => {
    if (isNew()) return;
    template.value = (await store.getTemplateItem(templateId)) as Template;
  });

  const isNew = () => {
    return templateId === 'new';
  };
  const save = async () => {
    message.value = undefined;

    if (!template.value.name) {
      message.value = { type: 'error', text: 'Название шаблона не может быть пустым' };
      return;
    }
    try {
      if (isNew()) {
        await store.addNewTemplateItem(prepareObject());
      } else {
        await store.updateTemplateItem(prepareObject());
      }
      message.value = { type: 'success', text: isNew() ? 'Шаблон создан' : 'Шаблон обновлен' };
      template.value = {
        name: '',
        height: '',
        width: '',
        tags: [],
      } as unknown as Template;
    } catch (err) {
      console.error(err);
      message.value = { type: 'error', text: 'Произошла ошибка' };
    }
  };

  const onAddFile = (e: any) => {
    const file = e.target.files[0];
    template.value.preview_image = file;
  };

  const prepareObject = () => {
    const tagsString = template.value.tags.toString().split(',');
    template.value.tags = tagsString.map((tag: string) => tag.trim());
    return template.value;
  };
</script>

<template>
  <div class="container" style="padding: 60px 0px">
    <div class="breadcrumbs">
      <RouterLink :to="{ name: 'HomePage' }">Главная</RouterLink> / {{ isNew() ? 'Новый шаблон' : `Редактирование шаблона - ${template.name}` }}
    </div>
    <div v-if="message" class="message" :class="message.type">{{ message.text }}</div>
    <div class="form-field">
      <label for="name">Название</label>
      <input type="text" name="name" v-model="template.name" />
    </div>
    <div class="form-field">
      <label for="width">Ширина</label>
      <input type="text" name="width" v-model="template.width" />
    </div>
    <div class="form-field">
      <label for="height">Высота</label>
      <input type="text" name="height" v-model="template.height" />
    </div>
    <div class="form-field">
      <label for="preview_image">Картинка превью</label>
      <input type="file" name="preview_image" @change="onAddFile" />
      <div v-if="!isNew()" class="preview-img"><img :src="template.preview_image" :alt="template.name" /></div>
    </div>
    <div class="form-field">
      <label for="tags">Теги (через запятую)</label>
      <input type="text" name="tags" v-model="template.tags" />
    </div>
    <div>
      <button class="btn" @click="save">{{ isNew() ? 'Создать' : 'Сохранить' }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .preview-img {
    margin-top: 10px;
    img {
      max-width: 150px;
    }
  }
</style>
