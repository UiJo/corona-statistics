import {Component, Input} from '@angular/core';
import {InfoCardSimpleModel} from "../shared/models/info-card.model";


@Component({
  selector: 'cs-info-card-simple',
  templateUrl: './info-card-simple.component.html',
  styleUrls: ['./info-card-simple.component.scss', '../shared/scss/card.scss']
})
/**
 * Simple card displaying the title and the scalar value from the input.
 */
export class InfoCardSimpleComponent {

  @Input()
  model!: InfoCardSimpleModel;

}


