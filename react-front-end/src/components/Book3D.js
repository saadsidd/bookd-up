import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from "three";
import './styles/Book3D.scss';

function FrontCover(props) {

  const { coverImage, pages } = props;

  const map = useLoader(TextureLoader, (coverImage === 'images/no-book-thumbnail.png') ? coverImage : `http://localhost:8081/${coverImage}`);
  const normalMap = useLoader(TextureLoader, 'textures/hardcover-normal.jpg');

  return (
    <mesh position={[0, 0, (pages && (pages / 5000 + 0.01)) || 0.075]}>
      <boxGeometry args={[0.6666, 1, 0.02]}/>
      <meshStandardMaterial
        map={map}
        normalMap={normalMap}
        roughness={0.1}
      />
    </mesh>
  );
}

function Pages(props) {

  const { pages } = props;

  const [
    mapTopBottom,
    normalMapTopBottom,
    mapSide,
    normalMapSide
  ] = useLoader(TextureLoader, [
    'textures/pages-base.jpg',
    'textures/pages-normal.jpg',
    'textures/pages-base.jpg',
    'textures/pages-normal.jpg'
  ]);

  mapSide.wrapS = mapSide.wrapT = normalMapSide.wrapS = normalMapSide.wrapT = RepeatWrapping;
  mapSide.rotation = normalMapSide.rotation = 1.4;

  return (
    <mesh>
      <boxGeometry args={[0.65, 0.975, (pages && (pages / 2500)) || 0.13]}/>
      <meshStandardMaterial attach='material-0' color={0xF8F0E3} map={mapSide} normalMap={normalMapSide} roughness={0.8}/>
      <meshStandardMaterial attach='material-1' color={0x000000}/>
      <meshStandardMaterial attach='material-2' color={0xF8F0E3} map={mapTopBottom} normalMap={normalMapTopBottom} roughness={0.8}/>
      <meshStandardMaterial attach='material-3' color={0xF8F0E3} map={mapTopBottom} normalMap={normalMapTopBottom} roughness={0.8}/>
    </mesh>
  );
}

function Spine(props) {

  const { pages, dominantColor } = props;
  let materialColor = 0x404040;

  if (dominantColor) {
    materialColor = `rgb(${dominantColor[0] > 10 ? dominantColor[0] - 10 : dominantColor[0]}, ${dominantColor[1] > 10 ? dominantColor[1] - 10 : dominantColor[1]}, ${dominantColor[2] > 10 ? dominantColor[2] - 10 : dominantColor[2]})`;
  }

  const normalMap = useLoader(TextureLoader, '/textures/spine-normal.jpg');

  return (
    <mesh position={[-0.345, 0, 0]}>
      <boxGeometry args={[0.025, 1, (pages && (pages / 2500 + 0.04)) || 0.17]}/>
      <meshStandardMaterial color={materialColor} normalMap={normalMap} roughness={0.1}/>
    </mesh>
  );
}

function BackCover(props) {

  const { pages, dominantColor } = props;
  let materialColor = 0x505050;

  if (dominantColor) {
    materialColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
  }

  const normalMap = useLoader(TextureLoader, 'textures/hardcover-normal.jpg');

  return (
    <mesh position={[0, 0, (pages && (-pages / 5000 - 0.01)) || -0.075]}>
      <boxGeometry args={[0.6666, 1, 0.02]} />
      <meshStandardMaterial color={materialColor} normalMap={normalMap} roughness={0.1}/>
    </mesh>
  );
}

function Scene(props) {

  const book = useRef(null);

  useFrame(({ mouse }) => {
    if (props.clicked) {
      book.current.rotation.set(-mouse.y * 1.5, mouse.x * 1.5, 0);
    } else {
      book.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight args={[0xaaaaaa, 2.5]}/>
      <spotLight args={[0xffffff, 1]} position={[0, -2, 2]}/>
      <spotLight args={[0xffffff, 1]} position={[-5, -2, 2]}/>
      <spotLight args={[0xffffff, 1]} position={[-2, -2, -2]}/>
      <group ref={book}>
        <FrontCover coverImage={props.coverImage} pages={props.pages} />
        <Pages pages={props.pages} />
        <Spine pages={props.pages} dominantColor={props.dominantColor} />
        <BackCover pages={props.pages} dominantColor={props.dominantColor} />
      </group>
    </>
  );
}

export default function Book3D(props) {

  const [clicked, setClicked] = useState(false);

  return (
    <Canvas
      className="canvas"
      camera={{position: [0, 0, 1]}}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onMouseOut={() => setClicked(false)}
    >
      <Suspense fallback={null}>
        <Scene coverImage={props.coverImage} pages={props.pages} dominantColor={props.dominantColor} clicked={clicked} />
      </Suspense>
    </Canvas>
  );

};