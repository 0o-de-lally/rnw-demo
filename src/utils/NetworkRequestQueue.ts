// NetworkRequestQueue.ts
// A simple service to queue and deduplicate in-flight network requests by key

export type RequestKey = string;

interface InFlightRequest<T> {
  promise: Promise<T>;
  count: number; // number of consumers waiting for this request
}

class NetworkRequestQueue {
  private queue: Map<RequestKey, InFlightRequest<any>> = new Map();

  // key: a string uniquely identifying the request (e.g. URL + params)
  // fn: a function that returns a Promise for the network request
  enqueue<T>(key: RequestKey, fn: () => Promise<T>): Promise<T> {
    if (this.queue.has(key)) {
      // If already in flight, return the same promise
      const inFlight = this.queue.get(key)!;
      inFlight.count++;
      return inFlight.promise;
    }
    // Not in flight, start the request
    const promise = fn().finally(() => {
      // Remove from queue when done
      const inFlight = this.queue.get(key);
      if (inFlight) {
        inFlight.count--;
        if (inFlight.count <= 0) {
          this.queue.delete(key);
        }
      }
    });
    this.queue.set(key, { promise, count: 1 });
    return promise;
  }

  // Optionally, a method to clear the queue (e.g. on logout)
  clear() {
    this.queue.clear();
  }
}

export const networkRequestQueue = new NetworkRequestQueue();
