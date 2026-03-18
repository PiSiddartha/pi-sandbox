import SandboxPage from "@/components/SandboxPage";

export default function PiShieldPage() {
  return (
    <SandboxPage
      title="Pi Shield"
      productName="Pi Shield"
      productSlug="shield"
      description={[
        "Pi Shield adds fraud protection and security controls to your payments. Set thresholds, review flagged orders, and monitor config logs so you can catch fraud without blocking good customers.",
        "Better fraud controls mean fewer chargebacks and more confidence in your approval rates. The tutorial shows how thresholds and reviews work in practice.",
      ]}
    />
  );
}
