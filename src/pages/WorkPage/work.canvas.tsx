import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useRouter } from '@tanstack/react-router';
import '@utils/geometry';

interface WorkCanvasProps {
  projects?: IProject[];
}

const WorkCanvas: React.FC<WorkCanvasProps> = ({ projects = [] }) => {
  // Debug log to see projects data
  console.log('WorkCanvas received projects:', projects);

  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
      <fog attach="fog" args={['#a79', 8.5, 12]} />
      <ScrollControls pages={4} infinite>
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel projects={projects} />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
      </ScrollControls>
      <Environment preset="dawn" background blur={0.5} />
    </Canvas>
  );
};

function Rig(props: Readonly<React.ComponentProps<'group'>>) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    }
    state.events.update?.(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
  radius = 1.4,
  count = 8,
  projects = []
}: {
  radius?: number;
  count?: number;
  projects?: IProject[];
}) {
  // Use projects if available, otherwise fallback to static images
  const displayItems = projects.length > 0 ? projects : Array.from({ length: count });
  const itemCount = projects.length > 0 ? projects.length : count;

  return displayItems.map((item, i) => {
    const isProject = projects.length > 0;
    const url = isProject
      ? (item as IProject).thumbnailUrl
      : `assets/images/img${Math.floor(i % 10) + 1}_.jpg`;

    return (
      <Card
        key={isProject ? (item as IProject).id : i}
        url={url}
        project={isProject ? (item as IProject) : undefined}
        position={[
          Math.sin((i / itemCount) * Math.PI * 2) * radius,
          0,
          Math.cos((i / itemCount) * Math.PI * 2) * radius
        ]}
        rotation={[0, Math.PI + (i / itemCount) * Math.PI * 2, 0]}
      />
    );
  });
}

interface CardProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  project?: IProject;
}

function Card({ url, project, ...props }: Readonly<CardProps>) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: React.PointerEvent) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  const router = useRouter();

  // Handle click to show project details
  const handleClick = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (project) {
      router.navigate({
        to: '/project/$projectId',
        params: { projectId: `${project.id}` }
      });
      // console.log('Clicked project:', project);
      // Here you can add navigation to project detail or show modal
    }
  };

  useFrame((_state, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
      easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
      easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    }
  });

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      onClick={handleClick}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props: Readonly<React.ComponentProps<'mesh'>>) {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture('assets/images/work_.png');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      const material = ref.current.material as any;
      if (material.time) {
        material.time.value += Math.abs(scroll.delta) * 4;
      }
      if (material.map && material.map.offset) {
        material.map.offset.x += delta / 2;
      }
    }
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default WorkCanvas;
