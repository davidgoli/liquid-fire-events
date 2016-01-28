import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default function withEventTransition(delegateTo, ...args) {
  const viewRoot = this.oldView || this.newView;
  const service = this.service || getOwner(viewRoot).lookup('service:liquid-fire-events');

  return new Ember.RSVP.Promise((resolve) => {
    service.trigger('transitionBegan');
    resolve();
  }).then(() => {
    return this.lookup(delegateTo).apply(this, args);
  }).then((infos) => {
    service.trigger('transitionAnimated', this.newView);

    return infos;
  });
}
