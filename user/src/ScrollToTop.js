import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Get current page path

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when route changes
    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;
