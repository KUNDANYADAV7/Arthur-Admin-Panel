import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";

const EmailButton: React.FC = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top + scrollY;

        // Detect when near footer
        setAtBottom(scrollY + windowHeight >= footerTop - 40);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openGmail = (): void => {
    const userAgent: string =
      navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent://compose?to=sandwichclub153@gmail.com#Intent;package=com.google.android.gm;scheme=mailto;end;";
    } else if (
      /iPad|iPhone|iPod/.test(userAgent) &&
      !(window as any).MSStream
    ) {
      window.location.href = "googlegmail://co?to=sandwichclub153@gmail.com";
    } else {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=sandwichclub153@gmail.com",
        "_blank"
      );
    }
  };

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        openGmail();
      }}
      className={`fixed z-50 right-4 md:right-8 transition-all duration-300 ${
        atBottom ? "bottom-32" : "bottom-6"
      }`}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Pulse Ring Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>

        {/* Email Button */}
        <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-md hover:scale-105 transition">
          <Mail className="w-6 h-6 text-white" />
        </div>
      </div>
    </a>
  );
};

export default EmailButton;
