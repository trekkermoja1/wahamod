import { Observable } from 'rxjs';
export declare class SwitchObservable<T> extends Observable<T> {
    private subject$;
    constructor(fn?: (source: Observable<T>) => Observable<T>);
    switch(newObservable$: Observable<T>): void;
    complete(): void;
}
