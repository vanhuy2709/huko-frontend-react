// Declare global types here
import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

export {};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */

  type TScene = 'start' | 'game' | 'end';

  type TAssetType = 'texture' | 'videoTexture' | 'glbModel' | 'cubemap' | 'htmlTexture';

  type TAssets = {
    name: string;
    type: string;
    path: string;
  };

  // Custom geometry and material classes
  class BentPlaneGeometry extends THREE.PlaneGeometry {
    constructor(radius: number, ...args: unknown[]);
  }

  class MeshSineMaterial extends THREE.MeshBasicMaterial {
    time: { value: number };
    constructor(parameters?: unknown);
  }

  interface IProject {
    id: number;
    title: string;
    description: string;
    content: string;
    tags: string[];
    videoUrl: string;
    thumbnailUrl: string;
    authorId: number;
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface ICategory {
    id: number;
    name: string;
    label: string;
    description: string;
    icon: string;
    slug: string;
  }

  interface IBlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: string;
    updatedAt: string;
    readTime: number;
    image: string;
    featured: boolean;
    views: number;
    likes: number;
  }

  interface IBlogCategory {
    id: number;
    name: string;
    label: string;
    description: string;
    color: string;
  }
}

// Extend react-three-fiber types
declare module '@react-three/fiber' {
  interface ThreeElements {
    bentPlaneGeometry: Object3DNode<BentPlaneGeometry, typeof BentPlaneGeometry>;
    meshSineMaterial: Object3DNode<MeshSineMaterial, typeof MeshSineMaterial>;
  }
}
