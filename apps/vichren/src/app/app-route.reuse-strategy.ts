/**
 * Application route reuse strategy.
 */
//TODO: refresh reused component route
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class AppRouteReuseStrategy implements RouteReuseStrategy {
    /**
     * Handlers storage.
     */
    private handlers = new Map<any, DetachedRouteHandle>();

    /**
     * Decides if the route should be stored.
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const key = this.getKey(route),
            should = !!key;

        return should;
    }

    /**
     * Stores route information.
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const key = this.getKey(route);

        this.handlers.set(key, handle);
    }

    /**
     * Checks route for restoration.
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const key = this.getKey(route),
            should = key ? this.handlers.has(key) : false;

        return should;
    }

    /**
     * Returns route data for restoration.
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const key = this.getKey(route),
            handle = key ? this.handlers.get(key) : null;
//TODO: refresh handle.componentRef.instance (component) route

        return handle;
    }

    /**
     * Reuse the route...
     */
    shouldReuseRoute(next: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        const should = next.routeConfig === current.routeConfig;

        return should;
    }

    private getKey(route: ActivatedRouteSnapshot): any {
        const key = route.data.reuse;

        return key || undefined;
    }
}
