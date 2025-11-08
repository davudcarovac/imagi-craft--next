"use client";

import React, { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
  content: string | string[] | React.ReactNode;
}

interface PrivacyPolicyClientProps {
  companyName?: string;
  lastUpdated?: string;
}

export default function PrivacyPolicyClient({
  companyName = "www.frostyimage.com",
  lastUpdated = "September 20, 2025",
}: PrivacyPolicyClientProps) {
  const [activeSection, setActiveSection] = useState<string>("owner");
  const [_, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Funkcija za praćenje aktivne sekcije
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 120;
        const sectionHeight = sectionElement.clientHeight;
        const sectionId = section.getAttribute("id");

        if (
          sectionId &&
          scrollY >= sectionTop &&
          scrollY < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const renderSectionContent = (
    content: string | string[] | React.ReactNode
  ): React.ReactNode => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-4 text-gray-700">
          {content.map((item, i) => (
            <li key={i} className="flex items-start group">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5 transform group-hover:scale-110 transition-transform duration-200">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
              <span className="leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === "string") {
      return <p className="text-gray-700 leading-relaxed text-lg">{content}</p>;
    }

    return <div className="text-gray-700 leading-relaxed">{content}</div>;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* SIDEBAR - Updated Design */}
      <aside className="lg:w-80 lg:h-screen lg:sticky lg:top-0 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/60 overflow-y-auto z-20">
        <div className="p-6 lg:p-8">
          {/* Updated Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-[#1aac83]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1aac83] saira-font">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-sm mt-3 saira-font">
              for{" "}
              <span className="font-semibold text-gray-800">{companyName}</span>
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1aac83]/10 border border-[#1aac83]/20 mt-3">
              <span className="w-2 h-2 bg-[#1aac83] rounded-full mr-2"></span>
              <span className="text-xs text-[#1aac83] font-medium saira-font">
                Last updated: {lastUpdated}
              </span>
            </div>
          </div>

          {/* Updated Navigation */}
          <nav className="space-y-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider saira-font">
                Quick Navigation
              </h3>
              <div className="w-8 h-8 bg-[#1aac83]/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#1aac83]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>

            {sections.map((section: Section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group border saira-font ${
                  activeSection === section.id
                    ? "bg-[#1aac83]/10 text-gray-900 shadow-md border-[#1aac83]/20 transform scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white border-gray-200/60 hover:border-[#1aac83]/30 hover:shadow-md hover:scale-105"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-[#1aac83]/20"
                        : "bg-gray-100/80 group-hover:bg-[#1aac83]/10"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        activeSection === section.id
                          ? "text-[#1aac83]"
                          : "text-gray-600 group-hover:text-[#1aac83]"
                      }`}
                    >
                      📄
                    </span>
                  </div>
                  <span className="text-sm font-medium leading-tight flex-1 saira-font">
                    {section.title}
                  </span>
                </div>
              </button>
            ))}
          </nav>

          {/* Updated Quick Actions */}
          <div className="mt-10 p-6 bg-[#1aac83] rounded-2xl shadow-lg text-white">
            <h4 className="text-lg font-semibold mb-3 flex items-center saira-font">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Need Help?
            </h4>
            <p className="text-white/80 text-sm mb-4 saira-font">
              Contact our Data Protection Officer for any privacy-related
              questions.
            </p>
            <button
              onClick={() => window.open("mailto:carovacdavud6@gmail.com")}
              className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 py-3 px-4 rounded-xl text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:shadow-lg flex items-center justify-center group saira-font"
            >
              <svg
                className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact DPO
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Updated Design */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Updated Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200/60 mb-6">
            <span className="w-2 h-2 bg-[#1aac83] rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 font-medium saira-font">
              Privacy & Compliance
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1aac83] mb-4 saira-font">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed saira-font">
            Protecting your privacy is our top priority. Learn how we collect,
            use, and safeguard your personal information.
          </p>
        </div>

        {/* Updated Table of Contents */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200/60 p-8 mb-12 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <svg
                className="w-6 h-6 text-[#1aac83]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1aac83] saira-font">
                Table of Contents
              </h2>
              <p className="text-gray-600 text-sm saira-font">
                Quickly navigate through our privacy policy sections
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section: Section, index: number) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                className={`group p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 saira-font ${
                  activeSection === section.id
                    ? "bg-[#1aac83]/10 text-gray-900 shadow-md border-[#1aac83]/20"
                    : "bg-white/60 text-gray-700 hover:bg-white border-gray-200/60 hover:border-[#1aac83]/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-[#1aac83]/20 text-[#1aac83]"
                        : "bg-gray-100/80 text-gray-600 group-hover:bg-[#1aac83]/10 group-hover:text-[#1aac83]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium flex-1 saira-font">
                    {section.title}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                      activeSection === section.id
                        ? "text-[#1aac83]"
                        : "text-gray-400 group-hover:text-[#1aac83]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Updated Content Sections */}
        <div className="space-y-8">
          {sections.map((section: Section, index: number) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-200/60 p-8 transition-all duration-500 hover:shadow-xl scroll-mt-32 group"
            >
              {/* Updated Section Header */}
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 w-14 h-14 bg-[#1aac83] rounded-2xl flex items-center justify-center mr-5 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#1aac83] pr-4 saira-font">
                      {section.title}
                    </h2>
                    <span className="px-3 py-1 bg-[#1aac83]/10 text-[#1aac83] rounded-full text-xs font-medium border border-[#1aac83]/20 saira-font">
                      Section {index + 1} of {sections.length}
                    </span>
                  </div>
                  <div className="w-20 h-1 bg-[#1aac83] rounded-full"></div>
                </div>
              </div>

              {/* Updated Content */}
              <div className="pl-0 lg:pl-4">
                {renderSectionContent(section.content)}
              </div>
            </section>
          ))}
        </div>

        {/* Updated Footer */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200/60">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/60">
            <div className="w-16 h-16 bg-[#1aac83] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto saira-font">
              This privacy policy relates solely to{" "}
              <span className="font-semibold text-gray-800">{companyName}</span>
              , unless otherwise stated. We are committed to protecting your
              privacy and ensuring transparency in our data practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => {
                  /* PDF download logic */
                }}
                className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-md group saira-font"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-600 group-hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => window.open("mailto:carovacdavud6@gmail.com")}
                className="flex items-center px-6 py-3 bg-[#1aac83] text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 group saira-font"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </button>
              <button
                onClick={() => {
                  /* Cookie settings logic */
                }}
                className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-md group saira-font"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-600 group-hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Cookie Settings
              </button>
            </div>
            <p className="text-gray-500 text-sm saira-font">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ✅ Updated Content Data
const sections: Section[] = [
  {
    id: "owner",
    title: "Owner and Data Controller",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-gray-700">
            <strong className="text-gray-900">
              Korzo - Gradsko Šetalište 55, Novi Pazar, Serbia
            </strong>
          </p>
          <p className="text-gray-600 mt-2">
            Owner contact email:{" "}
            <a
              href="mailto:carovacdavud6@gmail.com"
              className="text-[#1aac83] hover:text-[#1aac83] font-medium underline hover:no-underline transition-colors duration-200"
            >
              carovacdavud6@gmail.com
            </a>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "data-types",
    title: "Types of Data Collected",
    content:
      "The Owner does not provide a list of Personal Data types collected. Complete details are provided in dedicated sections or by specific explanations prior to data collection. Personal Data may be freely provided by the User or automatically collected as Usage Data. The use of Cookies or other tracking tools serves the purpose of providing and improving the Service.",
  },
  {
    id: "processing",
    title: "Mode and Place of Processing",
    content:
      "The Owner takes appropriate security measures to prevent unauthorized access, disclosure, or destruction of Data. Data is processed at the Owner's offices or other locations of involved parties. Personal Data is processed and stored for as long as required by its purpose or legal obligations.",
  },
  {
    id: "purposes",
    title: "Purposes of Processing",
    content:
      "Personal Data is collected to allow the Owner to provide its Service, comply with legal obligations, respond to enforcement requests, protect rights and interests, and improve user experience.",
  },
  {
    id: "advertising",
    title: "Interest-Based Advertising",
    content:
      "Users can opt out of interest-based advertising by using the opt-out features of each service or by following the guidance in the Cookie Policy.",
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    content:
      "This Application uses cookies and other trackers to ensure essential functionality and improve the user experience. For detailed information, please review the Cookie Policy.",
  },
  {
    id: "eu-info",
    title: "Information for EU Users",
    content: [
      "Users have given consent for one or more specific purposes.",
      "Provision of Data is necessary for performing an agreement.",
      "Processing is necessary for compliance with a legal obligation.",
      "Processing is related to a task carried out in the public interest.",
      "Processing is necessary for legitimate interests pursued by the Owner or a third party.",
    ],
  },
  {
    id: "rights",
    title: "User Rights (GDPR)",
    content: [
      "Withdraw consent at any time.",
      "Object to processing of their Data.",
      "Access and obtain a copy of their Data.",
      "Request rectification or update.",
      "Restrict or limit processing.",
      "Request deletion (right to be forgotten).",
      "Receive Data in a portable format.",
      "File a complaint with a data protection authority.",
    ],
  },
  {
    id: "additional",
    title: "Additional Information",
    content:
      "The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to legal action arising from improper use of this Application. Users may request more details regarding collection or processing at any time.",
  },
  {
    id: "definitions",
    title: "Definitions & Legal References",
    content: [
      "Personal Data: Any information allowing identification of a natural person.",
      "Usage Data: Information automatically collected such as IP, browser type, or session duration.",
      "User: The individual using this Application.",
      "Data Controller (Owner): The entity determining the purpose and means of data processing.",
      "Service: The service provided by this Application as described on this site.",
    ],
  },
];
