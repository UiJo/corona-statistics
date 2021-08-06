import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StateAbbreviationType} from "./shared/models/state-abbreviation-type.model";

@Injectable({
  providedIn: 'root'
})
/**
 *  Service used for communication between dashboard and info-card component.
 *  Dashboard notifies the card when state(Bundesland) selection has changed, so the card can change its state.
 */
export class FilterNotifierService {

  private _stateChanged = new BehaviorSubject<StateAbbreviationType>(StateAbbreviationType.DE);

  get stateChanged(): Observable<StateAbbreviationType> {
    return this._stateChanged.asObservable();
  }

  /**
   * Notify the subscribers about the state change.
   */
  notifyStateChanged(state: StateAbbreviationType) {
    this._stateChanged.next(state);
  }

}
