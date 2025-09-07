"use client";

import React from "react";

const TermsClient = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Terms and Conditions
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Welcome to our platform (“Service”). By accessing or using our
          Service, you agree to comply with and be bound by these Terms and
          Conditions. If you do not agree, please discontinue use of the
          Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
        <p>
          You must be at least 18 years old or have the legal capacity in your
          jurisdiction to enter into binding agreements in order to use our
          Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          3. Subscription & Billing
        </h2>
        <p>
          Our Service is offered on a subscription basis. By subscribing, you
          authorize us (and our payment partners such as Paddle) to charge your
          chosen payment method for recurring fees until you cancel your
          subscription. Prices are displayed in EUR and may be subject to local
          taxes or fees.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          4. Cancellation & Refunds
        </h2>
        <p>
          You may cancel your subscription at any time through your account
          settings. Refunds are provided in accordance with our Refund Policy,
          which follows applicable consumer protection laws. Unless otherwise
          stated, all payments are non-refundable.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
        <p>
          You agree not to misuse our Service, including but not limited to:
          engaging in unlawful activity, attempting to disrupt the platform,
          reverse engineering the software, or sharing your account with others
          without authorization.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          6. Intellectual Property
        </h2>
        <p>
          All content, trademarks, and intellectual property associated with the
          Service remain the property of our company. You are granted a limited,
          non-transferable license to access and use the Service for personal or
          business use in accordance with these Terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          7. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, our company shall not be held
          liable for any direct, indirect, incidental, or consequential damages
          arising from your use of the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which our company is established, without
          regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Any changes will be
          posted on this page, and continued use of the Service after updates
          indicates your acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="text-blue-600 underline"
          >
            support@yourdomain.com
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default TermsClient;
