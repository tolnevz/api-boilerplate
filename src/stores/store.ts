import { defineStore } from 'pinia';
import { useHttpService } from '../composables';
import type { Template } from '@/models';

const initialState = {
  loading: <boolean>false,
  isAuthenticated: <boolean>false,
  templates: <Template[]>[],
  tags: <string[]>[],
};

const store = defineStore('category', {
  state: () => {
    return { ...initialState };
  },
  getters: {},
  actions: {
    checkIsAuthenticated() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAuthenticated = true;
      }
    },
    async getTags() {
      this.loading = true;
      try {
        const response = await useHttpService().get<string[]>('/canvas_templates/tags/list');
        if (response.error) {
          throw response.error.error;
        }
        this.tags = response.data || [];
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async getTemplates(filters: any = {}) {
      this.loading = true;
      try {
        const response = await useHttpService().get<Template[]>('/canvas_templates', filters);
        if (response.error) {
          throw response.error.error;
        }
        this.templates = response.data || [];
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async getTemplateItem(id: string) {
      this.loading = true;
      try {
        const response = await useHttpService().get<Template>(`/canvas_templates/${id}`);
        if (response.error) {
          throw response.error.error;
        }
        return response.data;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async addNewTemplateItem(template: Template) {
      this.loading = true;
      try {
        const response = await useHttpService().post<any>(`/canvas_templates`, { ...template });
        if (response.error) {
          throw response.error.error;
        }
        return response.data;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async updateTemplateItem(template: Template) {
      this.loading = true;
      try {
        const response = await useHttpService().patch<any>(`/canvas_templates/${template.id}`, { ...template });
        if (response.error) {
          throw response.error.error;
        }
        return response.data;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async removeTemplateItem(id: string) {
      this.loading = true;
      try {
        const response = await useHttpService().del<any>(`/canvas_templates`, { id });
        console.log('response', response);
        if (response.error) {
          throw response.error.error;
        }
        return response.data;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const response = await useHttpService().post<Record<string, any>>('/login', { email, password, remember_me: '1' });
        if (response.error) {
          throw response.error.error;
        }
        if (response.data?.token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', response.data.token);
        }
        return { success: true };
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
  },
});

export default store;
