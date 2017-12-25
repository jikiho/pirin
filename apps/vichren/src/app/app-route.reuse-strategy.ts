/**
 * Application route reuse strategy.
 */
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class AppRouteReuseStrategy implements RouteReuseStrategy {
    cache = new Map<string, DetachedRouteHandle>();

    /**
     * Decides if the route should be stored.
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
console.log("SHOULD DETACH", arguments);
        return route.data.key ? true : false;
    }

    /**
     * Stores route information.
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
console.log("STORE", arguments);
        this.cache.set(route.data.key, handle);
    }

    /**
     * Checks route for restoration.
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
console.log("SHOULD ATTACH", arguments);
        return route.data.key ? this.cache.has(route.data.key) : false;
    }

    /**
     * Returns route data for restoration.
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
console.log("RETRIEVE", arguments);
        return this.cache.get(route.data.key);
    }

    /**
     * Reuse the route...
     */
    shouldReuseRoute(next: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
console.log("SHOULD REUSE", arguments);
        return next.routeConfig === current.routeConfig;
    }
}
