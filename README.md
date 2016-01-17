# Liquid-fire-events

Provides a service that you can use to subscribe to 2 events from Liquid Fire:
`transitionBegan` and `transitionAnimated`.

Example usage:

```js
export default Ember.Component.extend({
  liquidFireEvents: Ember.inject.service(),

  // initially false in all envs except test
  delayFinished: false,
  delayTime: 600,

  didInsertElement() {
    this.get('liquidFireEvents').one('transitionAnimated', () => {
      this._finish();
    });

    Ember.run.later(() => {
      this._finish()
    }, this.delayTime);
  },

  _finish() {
    if (!this.isDestroyed) {
      this.set('delayFinished', true);
    }
  }
})
```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
