import { OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {

  protected destroyed$: Subject<boolean> = new Subject()

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}