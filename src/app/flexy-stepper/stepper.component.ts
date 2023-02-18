import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  IFlexyStepperStep,
  IFlexyStepperDone,
  IFlexyStepperOptions,
} from './stepper.interface';

@Component({
  selector: 'flexy-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexyStepperComponent implements OnInit {
  @Input() steps: IFlexyStepperStep[];
  @Input() payload: any = {};
  @Input() options?: IFlexyStepperOptions;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  title: string;
  selectedIndex: number = 0;
  thisStepper: any;

  stack: number[] = [];
  checkpoints: number[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.steps?.length) {
      console.error('Не отправлен "steps"');
      return;
    }
    this.title = this.steps[0].title;
    this.thisStepper = this;

    if (this.options?.localStorageKey && !this.options.is_not_auto_continue) {
      this.loadFromLocalStorage();
    }
    this.refresh();
  }

  refresh(): void {
    this.cdRef.detectChanges();
    // this.cdRef.markForCheck();
  }

  loadFromLocalStorage(): void {
    if (!this.options.localStorageKey) {
      console.error('Не указан ключ для чтения с localStorage');
      return;
    }
    const localValues: string = localStorage.getItem(
      this.options.localStorageKey
    );
    let savedValues: any;
    if (localValues) {
      try {
        savedValues = JSON.parse(localValues);
      } catch (error) {
        console.error(
          'Ошибка при чтении данных с localStorage[' +
            this.options.localStorageKey +
            ']=',
          localValues
        );
      }
    }
    if (savedValues) {
      if (savedValues.payload) {
        // this.payload = savedValues.payload;
        for (const key in savedValues.payload) {
          if (Object.prototype.hasOwnProperty.call(savedValues.payload, key)) {
            this.payload[key] = savedValues.payload[key];
          }
        }
      }
      if (savedValues.stack) {
        this.stack = savedValues.stack;
      }
      if (savedValues.checkpoints) {
        this.checkpoints = savedValues.checkpoints;
      }
      let newIndex: number = this.stack[this.stack.length - 1];
      if (savedValues.goto) {
        this.steps.forEach((step: IFlexyStepperStep, index: number) => {
          if (step.key === savedValues.goto) {
            newIndex = index;
          }
        });
      }
      this.selectedIndex = newIndex;
      this.title = this.steps[newIndex].title;
    }
  }

  onDone(done: IFlexyStepperDone): void {
    delete this.options.result;
    if (done.payload) {
      this.payload = done.payload;
    }
    if (done.goto) {
      if (done.goto === 'continue') {
        this.loadFromLocalStorage();
      } else if (done.goto === 'cancel' || done.goto === 'success') {
        if (this.checkpoints.length) {
          const checkpoint: number = this.checkpoints.pop();
          this.selectedIndex = this.stack[checkpoint];
          this.stack.length = checkpoint;
          this.options.result = done.goto;
        } else {
          console.log('Нет is_checkpoint кто-бы уловил запрос');
        }
      } else if (done.goto === 'back') {
        this.options.result = done.goto;
        if (this.stack.length) {
          this.back();
        } else {
          //  Goto Home ?
        }
      } else {
        let newIndex: number = -1;
        this.steps.forEach((step: IFlexyStepperStep, index: number) => {
          if (step.key === done.goto) {
            newIndex = index;
          }
        });
        if (newIndex >= 0) {
          if (done.is_stop_back && this.checkpoints.length) {
            this.stack.length =
              this.checkpoints[this.checkpoints.length - 1] + 1;
          } else {
            this.stack.push(this.selectedIndex);
            if (done.is_checkpoint) {
              this.checkpoints.push(this.stack.length - 1);
            }
          }
          this.selectedIndex = newIndex;
          this.title = this.steps[newIndex].title;
          if (this.options?.localStorageKey) {
            localStorage.setItem(
              this.options.localStorageKey,
              JSON.stringify({
                payload: this.payload,
                stack: this.stack,
                checkpoints: this.checkpoints,
                goto: done.goto,
              })
            );
          }
        } else {
          console.error('Не найден ключ компоненты:', done.goto);
        }
      }
    }
    this.refresh();
  }

  back(url?): void {
    if (this.stack.length) {
      const newIndex: number = this.stack.pop();
      this.selectedIndex = newIndex;
      this.title = this.steps[newIndex].title;
      if (
        this.checkpoints.length &&
        this.stack.length <= this.checkpoints[this.checkpoints.length - 1]
      ) {
        this.checkpoints.pop();
      }
      if (this.options?.localStorageKey) {
        localStorage.setItem(
          this.options.localStorageKey,
          JSON.stringify({
            payload: this.payload,
            stack: this.stack,
            checkpoints: this.checkpoints,
            goto: this.steps[newIndex].key,
          })
        );
      }
      this.refresh();
    }
  }
}
