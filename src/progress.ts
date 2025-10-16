import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configuration personnalisée (vitesse, apparence, etc.)
NProgress.configure({
  showSpinner: false,   // pas de cercle
  trickleSpeed: 200,    // vitesse de progression
  minimum: 0.1          // point de départ
});

export const start = () => NProgress.start();
export const done = () => NProgress.done();
