/**
 * This file provides polyfills for Node.js specific features
 * that might be used by open-libra-sdk in a browser environment.
 *
 * Import this file before importing open-libra-sdk to ensure
 * proper functionality in the browser.
 */

// Polyfill for the global object
if (typeof global === 'undefined') {
  (window as any).global = window;
}

// Polyfill for process
if (typeof process === 'undefined') {
  (window as any).process = {
    env: {},
    version: '',
    versions: {
      node: false,
    },
    browser: true,
    nextTick: (fn: Function, ...args: any[]) => setTimeout(() => fn(...args), 0),
  };
}

// Polyfill for Buffer if needed
if (typeof Buffer === 'undefined') {
  (window as any).Buffer = {
    from: (data: string, encoding?: string) => {
      if (encoding === 'hex') {
        return Uint8Array.from(
          data.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
        );
      }
      return new TextEncoder().encode(data);
    },
    isBuffer: () => false,
    alloc: (size: number) => new Uint8Array(size),
    allocUnsafe: (size: number) => new Uint8Array(size),
    byteLength: (str: string, encoding?: string) => new TextEncoder().encode(str).length,
    concat: (chunks: Uint8Array[]) => {
      const totalLength = chunks.reduce((acc, val) => acc + val.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      return result;
    }
  };
}

// Polyfill for crypto if needed
if (typeof crypto === 'undefined' || !crypto.subtle) {
  console.warn('Web Crypto API is not available in this browser. Cryptographic operations may fail.');
}

// Export a function to check if the polyfills are loaded
export function arePolyfillsLoaded(): boolean {
  return typeof (window as any).global !== 'undefined' &&
         typeof (window as any).process !== 'undefined' &&
         typeof (window as any).Buffer !== 'undefined';
}
