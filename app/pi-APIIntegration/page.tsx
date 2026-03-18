import SandboxPage from "@/components/SandboxPage";

export default function IntegrationsPage() {
  return (
    <SandboxPage
      title="Integrations"
      description={[
        "Integrations centralizes your payment providers and acquirers. Configure connections (e.g. Stripe, Adyen), manage billing descriptors, and set up SCA and other compliance rules in one place.",
        "Keeping provider and compliance settings in one dashboard reduces errors and makes it easier to add or change integrations without jumping between systems.",
      ]}
    />
  );
}
