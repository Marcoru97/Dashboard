function throttle(callback) {
  let resizeTimeout;
  return () => {
    if (!resizeTimeout) {
      let timeout = () => {
        resizeTimeout = null;
        callback();
      };
      resizeTimeout = setTimeout(timeout, 50);
    }
  };
}

export { throttle };
