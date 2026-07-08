// Polyfill to ensure global DOMRect exists in React Native JS runtime (Hermes)
// Simple implementation sufficient for most React Native use cases
if (typeof (globalThis as any).DOMRect === 'undefined') {
  class DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    bottom: number;
    right: number;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.top = y;
      this.left = x;
      this.bottom = y + height;
      this.right = x + width;
    }

    static fromRect(rect?: any) {
      if (!rect) {
        return new DOMRect();
      }
      return new DOMRect(rect.x ?? 0, rect.y ?? 0, rect.width ?? 0, rect.height ?? 0);
    }

    toJSON() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        top: this.top,
        left: this.left,
        bottom: this.bottom,
        right: this.right
      };
    }
  }

  // expose on global scope
  (globalThis as any).DOMRect = DOMRect;
}
