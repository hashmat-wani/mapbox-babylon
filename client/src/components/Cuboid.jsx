import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

const Cuboid = ({ captureSrc }) => {
  const canvasRef = useRef();

  const createScene = (engine, canvas) => {
    const scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      4,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    light.intensity = 1.6;

    const mat = new StandardMaterial("mat", scene);
    const texture = new Texture(captureSrc, scene);
    mat.diffuseTexture = texture;

    const options = {
      wrap: true,
      width: (window.innerWidth / 145) * 0.7,
      height: (window.innerHeight / 145) * 0.7,
      depth: 0.5,
    };

    const box = MeshBuilder.CreateBox("box", options);
    box.material = mat;

    return scene;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);

    const scene = createScene(engine, canvas);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      createScene(engine, canvas);
    });
  }, []);

  return (
    <canvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
      ref={canvasRef}
    ></canvas>
  );
};

export default Cuboid;
