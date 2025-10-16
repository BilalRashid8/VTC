import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTransition(minMs = 300) {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), minMs);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return show;
}
