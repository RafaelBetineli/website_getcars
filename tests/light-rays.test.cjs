const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(readFileSync("src/components/LightRays.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

// Run the component's real effects with controlled browser and GPU lifecycles.
function mount(options = {}) {
  const effects = [];
  const frames = new Map();
  const windowEvents = new Map();
  const canvasEvents = new Map();
  const container = {
    clientWidth: options.width ?? 800,
    clientHeight: options.height ?? 600,
    dataset: {},
  };
  const canvas = {
    style: {},
    addEventListener: (name, fn) => canvasEvents.set(name, fn),
    removeEventListener: (name) => canvasEvents.delete(name),
    remove() {
      this.removed = true;
    },
  };
  const canvasContainer = { replaceChildren() {} };
  const refs = [container, canvasContainer, { x: 0.5, y: 0.55 }, { x: 0.5, y: 0.55 }];
  const motion = {
    matches: options.reduced ?? false,
    addEventListener(name, fn) {
      this.change = fn;
    },
    removeEventListener() {
      this.change = null;
    },
  };
  const stats = { draws: 0, released: false, warnings: [] };
  let nextFrame = 0;
  let resizeCallback;
  let lost = false;
  const gl = {
    canvas,
    LINK_STATUS: 1,
    drawingBufferWidth: 0,
    drawingBufferHeight: 0,
    isContextLost: () => lost,
    getProgramParameter: () => !options.shaderFailure,
    getProgramInfoLog: () => "Shader compilation failed",
    getExtension: () => ({
      loseContext() {
        stats.released = true;
      },
    }),
  };
  class Renderer {
    constructor() {
      if (options.noWebGL) throw new Error("WebGL unavailable");
      this.gl = gl;
      this.dpr = 1;
    }
    setSize(width, height) {
      gl.drawingBufferWidth = width;
      gl.drawingBufferHeight = height;
    }
    render() {
      if (options.renderFailure) throw new Error("GPU render failed");
      stats.draws++;
    }
  }
  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    require(name) {
      if (name === "react")
        return {
          useRef: () => ({ current: refs.shift() }),
          useState: () => [true, () => {}],
          useEffect: (effect) => effects.push(effect),
        };
      if (name === "react/jsx-runtime")
        return {
          jsx: (type, props) => ({ type, props }),
          jsxs: (type, props) => ({ type, props }),
        };
      if (name === "ogl")
        return {
          Renderer,
          Program: class {
            program = {};
            remove() {}
          },
          Triangle: class {
            remove() {}
          },
          Mesh: class {},
        };
      if (name.endsWith(".css")) return {};
      throw new Error(`Unexpected import: ${name}`);
    },
    window: {
      devicePixelRatio: 1,
      matchMedia: () => motion,
      addEventListener: (name, fn) => windowEvents.set(name, fn),
      removeEventListener: (name) => windowEvents.delete(name),
    },
    IntersectionObserver: class {
      observe() {}
      disconnect() {}
    },
    ResizeObserver: options.noResizeObserver
      ? undefined
      : class {
          constructor(fn) {
            resizeCallback = fn;
          }
          observe() {}
          disconnect() {}
        },
    requestAnimationFrame(fn) {
      const id = ++nextFrame;
      frames.set(id, fn);
      return id;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
    console: { warn: (...args) => stats.warnings.push(args) },
  };
  vm.runInNewContext(source, sandbox);
  module.exports.default({});
  const cleanup = effects.map((effect) => effect());
  return {
    container,
    motion,
    stats,
    frames,
    canvas,
    frame() {
      const queued = [...frames.entries()];
      for (const [id, fn] of queued) {
        frames.delete(id);
        fn(1000);
      }
    },
    resize(width, height) {
      container.clientWidth = width;
      container.clientHeight = height;
      (resizeCallback ?? windowEvents.get("resize"))();
    },
    loseContext() {
      lost = true;
      canvasEvents.get("webglcontextlost")();
    },
    unmount() {
      for (const fn of cleanup) fn?.();
    },
  };
}

test("WebGL animation renders and releases resources on unmount", () => {
  const app = mount();
  app.frame();
  assert.equal(app.stats.draws, 1);
  assert.equal(app.container.dataset.renderer, "webgl");
  assert.equal(app.frames.size, 1);
  app.unmount();
  assert.equal(app.frames.size, 0);
  assert.equal(app.stats.released, true);
  assert.equal(app.canvas.removed, true);
});

test("reduced motion redraws after resize without a continuous animation loop", () => {
  const app = mount({ reduced: true });
  app.frame();
  assert.equal(app.stats.draws, 1);
  assert.equal(app.frames.size, 0);
  app.resize(1000, 700);
  app.frame();
  assert.equal(app.stats.draws, 2);
  assert.equal(app.frames.size, 0);
  app.unmount();
});

test("initially empty layout draws once dimensions become available", () => {
  const app = mount({ reduced: true, width: 0, height: 0 });
  app.frame();
  assert.equal(app.stats.draws, 0);
  app.resize(800, 600);
  app.frame();
  assert.equal(app.stats.draws, 1);
  assert.equal(app.container.dataset.renderer, "webgl");
  app.unmount();
});

test("changing the motion preference stops and resumes continuous rendering", () => {
  const app = mount({ reduced: true });
  app.frame();
  app.motion.matches = false;
  app.motion.change();
  app.frame();
  assert.equal(app.frames.size, 1);
  app.motion.matches = true;
  app.motion.change();
  app.frame();
  assert.equal(app.frames.size, 0);
  assert.equal(app.container.dataset.reducedMotion, "true");
  app.unmount();
});

for (const failure of ["noWebGL", "shaderFailure", "renderFailure"]) {
  test(`${failure} keeps CSS lighting without crashing React`, () => {
    const app = mount({ [failure]: true });
    app.frame();
    assert.equal(app.container.dataset.renderer, "css");
    assert.equal(app.frames.size, 0);
    assert.equal(app.stats.warnings.length, 1);
    app.unmount();
  });
}

test("losing the GPU context switches back to CSS lighting", () => {
  const app = mount();
  app.frame();
  app.loseContext();
  assert.equal(app.container.dataset.renderer, "css");
  assert.equal(app.frames.size, 0);
  app.unmount();
});

test("window resize redraws when ResizeObserver is unavailable", () => {
  const app = mount({ reduced: true, noResizeObserver: true });
  app.frame();
  app.resize(900, 600);
  app.frame();
  assert.equal(app.stats.draws, 2);
  app.unmount();
});
