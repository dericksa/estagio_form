export default () => next => action => {
    const { type, payload, meta } = action;

    console.groupCollapsed(type);
    // tslint:disable-next-line
    // tslint:disable-next-line
    console.groupEnd();

  return next(action);
};
