import Ember from 'ember';
import layout from '../templates/components/delayed-render';

export default Ember.Component.extend({
  layout: layout,

  isTest: Ember.computed('ENV', function () {
    return this.get('ENV').environment === 'test';
  }),

  liquidFireEvents: Ember.inject.service(),

  // initially false in all envs except test
  delayFinished: false,

  delayTime: 600,

  didInsertElement() {
    if (this.get('isTest')) {
      this._finish();
      return;
    }

    Ember.run.next(() => {
      if (this.get('liquidFireEvents.renderedOnce')) {
        return;
      }

      this.set('liquidFireEvents.renderedOnce', true);
      this._finish();
    });

    this.get('liquidFireEvents').one('transitionAnimated', () => {
      this._finish();
    });

    Ember.run.later(() => {
      this._finish();
    }, this.delayTime);
  },

  _finish() {
    if (this.isDestroyed) {
      return;
    }

    this.set('delayFinished', true);
  }
});
