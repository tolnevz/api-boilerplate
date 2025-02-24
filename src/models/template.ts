export interface Template {
  id: number;
  name: string;
  width: string;
  height: string;
  description: string;
  preview_image: any;
  tags: string[];
  type: string;
  objects: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}
