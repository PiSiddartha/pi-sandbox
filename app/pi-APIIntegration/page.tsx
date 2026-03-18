import SandboxPage from "@/components/SandboxPage";

export default function IntegrationsPage() {
  return (
    <SandboxPage
      title="Integrations"
      description={[
        "Integrations centralizes payment provider and acquirer management. You can configure connections to providers such as Stripe and Adyen, manage billing descriptors, and use the SCA (Strong Customer Authentication) framework.",
        "In the full Pi Repository this area is connected to live configuration and provider APIs. In the Sandbox you can learn the structure and flows from the tutorial video, then request access to the real integration modules when ready.",
      ]}
    />
  );
}
