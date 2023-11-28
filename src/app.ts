import MatrixAnimation from "./tools/webgl-animation.renderer";
import WebGLRenderer from "./tools/webgl-renderer.renderer";
import CustomMath from "./utils/custom-math";
import { getShader } from "./utils/get-shader";
import normaliseCoordinates from "./utils/normalise-coordinates";
import nullCheck from "./utils/null-check";

function App() {
  const renderer = new WebGLRenderer("glcanvas");
  
  renderer.setScene('static', () => {
    renderer.tools.setViewport();
    renderer.tools.clearCanvas({ red: 255, green: 254, blue: 244, alpha: 100 });

    // shaders
    renderer.tools.createAndCompileShader(getShader("vertex"), "vertex");
    renderer.tools.createAndCompileShader(getShader("fragment"), "fragment");

    // program
    const shaderProgram = renderer.tools.createAndLinkProgram();

    nullCheck(shaderProgram, "Shader program isn't created or linked correctly");
  });


  // triangle 1
  renderer.setScene('triangle 1', () => {
    // triangle 1 buffers
    const triangle1PositionBuffer = renderer.tools.createBufferWithData([
      ...normaliseCoordinates({x: 0, y: 2, z: 0}),
      ...normaliseCoordinates({x: -2, y: 0, z: 0}),
      ...normaliseCoordinates({x: 2, y: 0, z: 0}),
    ], WebGLRenderingContext.ARRAY_BUFFER);
    const triangle1ColorBuffer = renderer.tools.createBufferWithData([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0], WebGLRenderingContext.ARRAY_BUFFER);

    nullCheck(triangle1PositionBuffer, "Position buffer for triangle 1 isn't created correctly");
    nullCheck(triangle1ColorBuffer, "Color buffer for triangle 1 isn't created correctly");
    
    // locations
    const positionAttributeLocation = renderer.tools.getAttribLocation("a_position");
    const colorAttributeLocation = renderer.tools.getAttribLocation("a_color");

    nullCheck(positionAttributeLocation, "Position location is incorrect");
    nullCheck(colorAttributeLocation, "Color location is incorrect");

    // rendering
    renderer.tools.drawLocation(triangle1PositionBuffer, positionAttributeLocation!!, 3);
    renderer.tools.drawLocation(triangle1ColorBuffer, colorAttributeLocation!!, 3);
  });


  // triangle 2
  renderer.setScene('triangle 2', () => {
    // triangle 2 buffers
    const triangle2PositionBuffer = renderer.tools.createBufferWithData([
      ...normaliseCoordinates({x: 0, y: -2, z: 0}),
      ...normaliseCoordinates({x: -2, y: 0, z: 0}),
      ...normaliseCoordinates({x: 2, y: 0, z: 0}),
    ], WebGLRenderingContext.ARRAY_BUFFER);
    const triangle2ColorBuffer = renderer.tools.createBufferWithData([0.0, 1.0, 0.0, -0.5, 0.0, 0.0, 0.5, 0.0, 0.0], WebGLRenderingContext.ARRAY_BUFFER);

    nullCheck(triangle2PositionBuffer, "Position buffer for triangle 2 isn't created correctly");
    nullCheck(triangle2ColorBuffer, "Color buffer for triangle 2 isn't created correctly");
    
    // locations
    const positionAttributeLocation = renderer.tools.getAttribLocation("a_position");
    const colorAttributeLocation = renderer.tools.getAttribLocation("a_color");

    nullCheck(positionAttributeLocation, "Position location is incorrect");
    nullCheck(colorAttributeLocation, "Color location is incorrect");

    // rendering
    renderer.tools.drawLocation(triangle2PositionBuffer, positionAttributeLocation!!, 3);
    renderer.tools.drawLocation(triangle2ColorBuffer, colorAttributeLocation!!, 3);
  });


  // rectangle 1
  renderer.setScene('rectangle 1', () => renderer.animate((time) => {
    // rectangle buffers
    let rectangleCoordinates = [
      // -0.5, 0.5, 0.0,
      // -0.5, -0.5, 0.0,
      // 0.5, 0.5, 0.0,
      // 0.5, -0.5, 0.0,
      ...normaliseCoordinates({x: -1, y: 1, z: 0.0}),
      ...normaliseCoordinates({x: -1, y: -1, z: 0.0}),
      ...normaliseCoordinates({x: 1, y: 1, z: 0.0}),
      ...normaliseCoordinates({x: 1, y: -1, z: 0.0}),
    ];

    const matrixRotation = new MatrixAnimation(rectangleCoordinates);
    rectangleCoordinates = matrixRotation.rotate(CustomMath.radians(time));

    const rectanglePositionBuffer = renderer.tools.createBufferWithData(rectangleCoordinates, WebGLRenderingContext.ARRAY_BUFFER);
    const rectangleColorBuffer = renderer.tools.createBufferWithData([
      1.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
    ], WebGLRenderingContext.ARRAY_BUFFER);

    nullCheck(rectanglePositionBuffer, "Position buffer for rectangle isn't created correctly");
    nullCheck(rectangleColorBuffer, "Color buffer for rectangle isn't created correctly");
    
    // program
    const shaderProgram = renderer.tools.createAndLinkProgram();

    nullCheck(shaderProgram, "Shader program isn't created or linked correctly");

    // locations
    const positionAttributeLocation = renderer.tools.getAttribLocation("a_position");
    const colorAttributeLocation = renderer.tools.getAttribLocation("a_color");

    nullCheck(positionAttributeLocation, "Position location is incorrect");
    nullCheck(colorAttributeLocation, "Color location is incorrect");

    // rendering
    renderer.tools.drawLocation(rectanglePositionBuffer, positionAttributeLocation!!, 4);
    renderer.tools.drawLocation(rectangleColorBuffer, colorAttributeLocation!!, 4);
  }));


   // rectangle 2
  renderer.setScene('rectangle 2', () => renderer.animate((time) => {
    // rectangle buffers
    let rectangleCoordinates = [
      // -0.5, 0.5, 0.0,
      // -0.5, -0.5, 0.0,
      // 0.5, 0.5, 0.0,
      // 0.5, -0.5, 0.0,
      ...normaliseCoordinates({x: -0.2, y: 0.2, z: 0.0}),
      ...normaliseCoordinates({x: -0.2, y: -0.2, z: 0.0}),
      ...normaliseCoordinates({x: 0.2, y: 0.2, z: 0.0}),
      ...normaliseCoordinates({x: 0.2, y: -0.2, z: 0.0}),
    ];

    const matrixRotation = new MatrixAnimation(rectangleCoordinates);
    rectangleCoordinates = matrixRotation.hover(0.5, CustomMath.radians(time));

    const rectanglePositionBuffer = renderer.tools.createBufferWithData(rectangleCoordinates, WebGLRenderingContext.ARRAY_BUFFER);
    const rectangleColorBuffer = renderer.tools.createBufferWithData([
      1.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
    ], WebGLRenderingContext.ARRAY_BUFFER);

    nullCheck(rectanglePositionBuffer, "Position buffer for rectangle isn't created correctly");
    nullCheck(rectangleColorBuffer, "Color buffer for rectangle isn't created correctly");
    
    // program
    const shaderProgram = renderer.tools.createAndLinkProgram();

    nullCheck(shaderProgram, "Shader program isn't created or linked correctly");

    // locations
    const positionAttributeLocation = renderer.tools.getAttribLocation("a_position");
    const colorAttributeLocation = renderer.tools.getAttribLocation("a_color");

    nullCheck(positionAttributeLocation, "Position location is incorrect");
    nullCheck(colorAttributeLocation, "Color location is incorrect");

    // rendering
    renderer.tools.drawFanLocation(rectanglePositionBuffer, positionAttributeLocation!!, 4);
    renderer.tools.drawLocation(rectangleColorBuffer, colorAttributeLocation!!, 4);

    renderer.tools.getGl()
  }));

  renderer.startRendering();
}

export default App;
