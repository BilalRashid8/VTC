import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { start, done } from "../progress.ts";

export default function ProgressOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    start();
    const timeout = setTimeout(done, 400); // la barre reste visible 0.4s
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
