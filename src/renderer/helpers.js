function throttle(callback) {
  let resizeTimeout;
  return () => {
    if (!resizeTimeout) {
      const timeout = () => {
        resizeTimeout = null;
        callback();
      };
      resizeTimeout = setTimeout(timeout, 50);
    }
  };
}

// eslint-disable-next-line import/prefer-default-export
export { throttle };
