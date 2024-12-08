// Placeholder for WebGL utilities. This can be expanded as needed.
export function initializeWebGL(canvas) {
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported, falling back on experimental-webgl");
      gl = canvas.getContext("experimental-webgl");
    }
    if (!gl) {
      throw new Error("Your browser does not support WebGL.");
    }
    return gl;
  }
  
  export function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shaders:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  