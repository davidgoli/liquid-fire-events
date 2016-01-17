export default function withEventTransition(delegateTo, ...args) {
  return this.lookup(delegateTo).apply(this, args)
    .then((infos) => {
      if (this.newView) {
        this.lookup('service:liquid-fire-events')
          .trigger('transitionAnimated', this.newView);
      }

      return infos;
    });
}
