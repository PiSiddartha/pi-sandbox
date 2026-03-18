import SandboxPage from "@/components/SandboxPage";

export default function PiShieldPage() {
  return (
    <SandboxPage
      title="Pi Shield"
      productName="Pi Shield"
      productSlug="shield"
      description={[
        "Pi Shield provides fraud protection and security features for your payment operations. You can configure thresholds, review orders, and monitor config logs to keep your transactions secure.",
        "In the full Pi Repository this product is connected to live fraud and order-review APIs. In the Sandbox you can explore the layout and watch the tutorial video. Use the Request Access button when you want to enable Pi Shield for your account.",
      ]}
    />
  );
}
