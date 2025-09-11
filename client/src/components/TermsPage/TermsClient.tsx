"use client";

import React, { useState } from "react";

const TermsClient = () => {
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", title: "Agreement to Terms" },
    { id: "services", title: "Our Services" },
    { id: "ip", title: "Intellectual Property" },
    { id: "userreps", title: "User Representations" },
    { id: "prohibited", title: "Prohibited Activities" },
    { id: "userdata", title: "User Data" },
    { id: "disclaimer", title: "Disclaimer" },
    { id: "contact", title: "Contact Us" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[90vh] bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Terms and Conditions
          </h1>
          <p className="text-gray-300 text-sm">
            Last updated: September 07, 2025
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4 bg-gray-100 p-3 md:p-4">
            <h2 className="font-bold text-base mb-3 text-gray-800">
              Table of Contents
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="md:w-3/4 p-4 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-sm max-w-none">
              {/* Agreement Section */}
              <section id="agreement" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  AGREEMENT TO OUR LEGAL TERMS
                </h2>
                <p className="text-gray-700 mb-2">
                  We are <span className="font-semibold">FrostyImage</span>{" "}
                  (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
                  &quot;our&quot;), a company registered in Serbia at
                  __________, Korzo - Gradsko Šetalište 55, Novi Pazar, Serbia
                  36300.
                </p>

                <p className="text-gray-700 mb-2">
                  We operate the website{" "}
                  <a
                    href="https://www.frostyimage.com/"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.frostyimage.com/
                  </a>{" "}
                  (the "Site"), as well as any other related products and
                  services that refer or link to these legal terms (the "Legal
                  Terms") (collectively, the "Services").
                </p>
                <p className="text-gray-700 mb-2">
                  You can contact us by email at{" "}
                  <a
                    href="mailto:carovacdavud6@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    carovacdavud6@gmail.com
                  </a>{" "}
                  or by mail to __________, Korzo - Gradsko Šetalište 55, Novi
                  Pazar, Serbia 36300.
                </p>
                <p className="text-gray-700">
                  These Legal Terms constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity
                  (&quot;you&quot;), and FrostyImage, concerning your access to
                  and use of the Services.
                </p>
              </section>

              {/* Services Section */}
              <section id="services" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  OUR SERVICES
                </h2>
                <p className="text-gray-700">
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation or which would subject
                  us to any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Services from other locations do so on their own initiative
                  and are solely responsible for compliance with local laws, if
                  and to the extent local laws are applicable.
                </p>
              </section>

              {/* Intellectual Property Section */}
              <section id="ip" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Our intellectual property
                  </h3>
                  <p className="text-gray-700 mb-2">
                    We are the owner or the licensee of all intellectual
                    property rights in our Services, including all source code,
                    databases, functionality, software, website designs, audio,
                    video, text, photographs, and graphics in the Services
                    (collectively, the "Content"), as well as the trademarks,
                    service marks, and logos contained therein (the "Marks").
                  </p>
                  <p className="text-gray-700">
                    Our Content and Marks are protected by copyright and
                    trademark laws (and various other intellectual property
                    rights and unfair competition laws) and treaties around the
                    world.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Your use of our Services
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Subject to your compliance with these Legal Terms, including
                    the "PROHIBITED ACTIVITIES" section below, we grant you a
                    non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="list-disc pl-4 mb-2 text-gray-700 space-y-1">
                    <li>access the Services; and</li>
                    <li>
                      download or print a copy of any portion of the Content to
                      which you have properly gained access,
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    solely for your personal, non-commercial use or internal
                    business purpose.
                  </p>
                </div>
              </section>

              {/* User Representations Section */}
              <section id="userreps" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  USER REPRESENTATIONS
                </h2>
                <p className="text-gray-700 mb-2">
                  By using the Services, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate,
                  current, and complete; (2) you will maintain the accuracy of
                  such information and promptly update such registration
                  information as necessary; (3) you have the legal capacity and
                  you agree to comply with these Legal Terms; (4) you are not
                  under the age of 13; (5) you are not a minor in the
                  jurisdiction in which you reside, or if a minor, you have
                  received parental permission to use the Services; (6) you will
                  not access the Services through automated or non-human means,
                  whether through a bot, script or otherwise; (7) you will not
                  use the Services for any illegal or unauthorized purpose; and
                  (8) your use of the Services will not violate any applicable
                  law or regulation.
                </p>
                <p className="text-gray-700">
                  If you provide any information that is untrue, inaccurate, not
                  current, or incomplete, we have the right to suspend or
                  terminate your account and refuse any and all current or
                  future use of the Services (or any portion thereof).
                </p>
              </section>

              {/* Prohibited Activities Section */}
              <section id="prohibited" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  PROHIBITED ACTIVITIES
                </h2>
                <p className="text-gray-700 mb-2">
                  You may not access or use the Services for any purpose other
                  than that for which we make the Services available. The
                  Services may not be used in connection with any commercial
                  endeavours except those that are specifically endorsed or
                  approved by us.
                </p>
                <p className="text-gray-700 mb-2 font-semibold">
                  As a user of the Services, you agree not to:
                </p>
                <ul className="list-disc pl-4 text-gray-700 space-y-1">
                  <li>
                    Systematically retrieve data or other content from the
                    Services to create or compile, directly or indirectly, a
                    collection, compilation, database, or directory without
                    written permission from us.
                  </li>
                  <li>
                    Trick, defraud, or mislead us and other users, especially in
                    any attempt to learn sensitive account information such as
                    user passwords.
                  </li>
                  <li>
                    Circumvent, disable, or otherwise interfere with
                    security-related features of the Services.
                  </li>
                  <li>
                    Disparage, tarnish, or otherwise harm, in our opinion, us
                    and/or the Services.
                  </li>
                  <li>
                    Use any information obtained from the Services in order to
                    harass, abuse, or harm another person.
                  </li>
                  <li>
                    Make improper use of our support services or submit false
                    reports of abuse or misconduct.
                  </li>
                  <li>
                    Use the Services in a manner inconsistent with any
                    applicable laws or regulations.
                  </li>
                </ul>
              </section>

              {/* User Data Section */}
              <section id="userdata" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  USER DATA
                </h2>
                <p className="text-gray-700">
                  We will maintain certain data that you transmit to the
                  Services for the purpose of managing the performance of the
                  Services, as well as data relating to your use of the
                  Services. Although we perform regular routine backups of data,
                  you are solely responsible for all data that you transmit or
                  that relates to any activity you have undertaken using the
                  Services. You agree that we shall have no liability to you for
                  any loss or corruption of any such data, and you hereby waive
                  any right of action against us arising from any such loss or
                  corruption of such data.
                </p>
              </section>

              {/* Disclaimer Section */}
              <section id="disclaimer" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  DISCLAIMER
                </h2>
                <p className="text-gray-700 mb-2">
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                  RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                  WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                  SERVICES AND YOUR USE THEREOF.
                </p>
                <p className="text-gray-700">
                  WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                  COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY
                  WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
                  WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
                  MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
                  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                  RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY
                  UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY
                  AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
                  STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                  TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES,
                  TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
                  THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS
                  OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR
                  DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY
                  CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
                  THE SERVICES.
                </p>
              </section>

              {/* Contact Section */}
              <section id="contact" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  CONTACT US
                </h2>
                <p className="text-gray-700 mb-2">
                  In order to resolve a complaint regarding the Services or to
                  receive further information regarding use of the Services,
                  please contact us at:
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="font-semibold">FrostyImage</p>
                  <p>Korzo - Gradsko Šetalište 55</p>
                  <p>Novi Pazar, Serbia 36300</p>
                  <p>Serbia</p>
                  <p className="mt-1">
                    <a
                      href="mailto:carovacdavud6@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      carovacdavud6@gmail.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsClient;
