import { test, moduleFor } from 'ember-qunit';
import sinon from 'sinon';
import Ember from 'ember';
import withEventTransition from 'liquid-fire-events/transitions/with-event';

moduleFor('transition:with-event', 'WithEventTransition', {
  needs: [
    'service:liquid-fire-events'
  ]
});

test('events', function (assert) {
  assert.expect(0);
  const service = Ember.Service.extend(Ember.Evented).create();

  const callTransition = sinon.mock();
  const transitionContext = {
    lookup(path) {
      if (path === 'base-transition') {
        return callTransition;
      }
    },
    service: service
  };

  const began = sinon.mock();
  const ended = sinon.mock();

  began.once();
  callTransition.once().returns('the infos');
  ended.once();

  service.on('transitionBegan', began);
  service.on('transitionAnimated', ended);

  withEventTransition
    .call(transitionContext, 'base-transition')
    .then(function () {
      began.verify();
    })
    .then(function () {
      callTransition.verify();
    })
    .then(function () {
      ended.verify();
    });
});
