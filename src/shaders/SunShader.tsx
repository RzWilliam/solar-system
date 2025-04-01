// Shader pour le soleil
const SunShader = {
  uniforms: {
    time: { value: 0 },
    baseTexture: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D baseTexture;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Effet de turbulence
      vec2 offset = vec2(
        sin(time + uv.y * 10.0) * 0.01,
        cos(time + uv.x * 10.0) * 0.01
      );

      vec4 baseColor = texture2D(baseTexture, uv + offset);

      // Output only the base texture with turbulence
      gl_FragColor = vec4(baseColor.rgb, 1.0);
    }
  `
};

export default SunShader;