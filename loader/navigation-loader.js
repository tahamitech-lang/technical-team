(() => {
  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) {
    throw new Error("Could not determine the loading page URL.");
  }

  const loaderUrl = new URL("loader.html", scriptUrl);

  document.addEventListener("click", event => {
    if (!(event instanceof MouseEvent) || event.defaultPrevented ||
        event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest("a[href]");
    if (!link || link.hasAttribute("download") ||
        (link.target && link.target.toLowerCase() !== "_self")) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    event.preventDefault();
    loaderUrl.searchParams.set("next", destination.href);
    window.location.assign(loaderUrl.href);
  });
})();
