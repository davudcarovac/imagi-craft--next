import { ReactNode } from "react";

export const metadata = {
  title: "Privacy Policy | FrostyImage",
  description:
    "Privacy Policy for FrostyImage explaining how we collect, use, share, and protect your data.",
};

const PrivacyClient = () => {
  const lastUpdated = "September 2025"; // update when you publish changes

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-slate">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> {lastUpdated}
      </p>

      <p>
        This Privacy Policy describes how <strong>FrostyImage</strong> (“we”,
        “us”, or “our”) collects, uses, shares, and protects your information
        when you use our website, application, and services (collectively, the
        “Services”). By using our Services, you agree to the practices described
        here.
      </p>

      <h2>Who We Are</h2>
      <p>
        <strong>FrostyImage</strong>
        <br />
        Novi Pazar, Serbia
        <br />
        Contact:{" "}
        <a href="mailto:support@frostyimage.com">support@frostyimage.com</a>
      </p>

      <h2>Scope</h2>
      <p>
        This Policy applies to users worldwide, including customers located in
        North America, Europe, Asia, and Australia.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Account Information:</strong> email, username, password
          (hashed), and optional profile image.
        </li>
        <li>
          <strong>Service Usage & Logs:</strong> basic technical events needed
          for authentication, session management, and service operation.
        </li>
        <li>
          <strong>Analytics Data:</strong> information collected via Google
          Analytics (e.g., page views, device/rough location, and engagement
          metrics). See “Cookies & Tracking” below.
        </li>
        <li>
          <strong>Payments:</strong> transactions are processed by{" "}
          <strong>Paddle</strong>. We do not store card numbers or full payment
          credentials. We keep basic records of transactions (e.g., product,
          amount, timestamp, status) to provide your plan and billing history.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve the Services.</li>
        <li>To authenticate you, secure accounts, and prevent abuse.</li>
        <li>To show your account details in the app (e.g., username, plan).</li>
        <li>To provide customer support and respond to requests.</li>
        <li>
          For analytics and product improvement (non-marketing; we do not send
          newsletters or marketing emails).
        </li>
        <li>To process payments and manage subscriptions via Paddle.</li>
      </ul>

      <h2>Legal Bases (where applicable, e.g., GDPR)</h2>
      <ul>
        <li>
          <strong>Contract necessity:</strong> to provide the Services you
          request (account, subscription, access).
        </li>
        <li>
          <strong>Legitimate interests:</strong> service security, fraud
          prevention, analytics, and improvement.
        </li>
        <li>
          <strong>Consent:</strong> where required for cookies/analytics in your
          region.
        </li>
        <li>
          <strong>Legal obligations:</strong> compliance with applicable laws.
        </li>
      </ul>

      <h2>Cookies & Tracking</h2>
      <p>
        We use cookies for security (e.g., session cookies, CSRF protection) and
        to remember your login. We also use Google Analytics for usage
        measurement. Depending on your region, we may display a cookie banner
        and honor your choices.
      </p>

      <h2>Payments via Paddle</h2>
      <p>
        We use <strong>Paddle</strong> as our payment provider. Paddle is
        responsible for processing your payment information (e.g., card data).
        We do not store your full card details on our servers. We retain basic
        transaction metadata necessary for your subscription and billing
        history.
      </p>

      <h2>Sharing & International Transfers</h2>
      <ul>
        <li>
          <strong>Service Providers:</strong> We share data with cloud and
          infrastructure providers (e.g., hosting, databases), analytics
          (Google), and payments (Paddle) to deliver the Services.
        </li>
        <li>
          <strong>International Transfers:</strong> Your data may be processed
          in countries outside your own. Where required, we rely on appropriate
          safeguards (such as contractual protections) to protect your data.
        </li>
        <li>
          <strong>No Sale of Personal Data:</strong> We do not sell personal
          information.
        </li>
      </ul>

      <h2>Security</h2>
      <p>
        We use industry-standard measures such as HTTPS, hashed passwords, and
        access controls. We also support optional two-factor authentication
        (2FA). No method of transmission or storage is 100% secure, but we
        strive to protect your information.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain personal data for as long as needed to provide the Services
        and for legitimate business needs (e.g., records of transactions).
        Account data is generally kept until you delete your account or we no
        longer need the information. We may retain certain data if required by
        law or for dispute resolution and security.
      </p>

      <h2>Your Rights</h2>
      <ul>
        <li>
          <strong>Access & Update:</strong> You can update your username,
          password, and profile image in your account settings.
        </li>
        <li>
          <strong>2FA:</strong> You may enable or disable two-factor
          authentication.
        </li>
        <li>
          <strong>Delete Account:</strong> You can request deletion of your
          account, after which we will delete or anonymize your personal data
          unless retention is required by law.
        </li>
        <li>
          <strong>Data Export:</strong> We do not currently offer a self-service
          export tool; we may add this in the future. You can contact us if you
          need assistance.
        </li>
        <li>
          <strong>Regional Rights:</strong> Depending on your location (e.g.,
          EU/EEA, UK, California), you may have additional rights. Contact us to
          exercise them.
        </li>
      </ul>

      <h2>Children’s Privacy</h2>
      <p>
        Our Services are not directed to children, and we do not knowingly
        collect personal information from children. If you believe a child has
        provided us personal data, please contact us so we can take appropriate
        action.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the
        updated version on this page and, if changes are material, we will
        provide a more prominent notice. Your continued use of the Services
        after the effective date constitutes acceptance of the updated Policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions or requests related to privacy, please contact us
        at <a href="mailto:support@frostyimage.com">support@frostyimage.com</a>.
      </p>
    </main>
  );
};

// Reusable section component with icon
const SectionWithIcon = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1aac83] bg-opacity-10 text-[#1aac83] mr-3">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default PrivacyClient;
