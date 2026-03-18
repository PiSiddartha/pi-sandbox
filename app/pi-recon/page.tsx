import SandboxPage from "@/components/SandboxPage";

export default function PiReconPage() {
  return (
    <SandboxPage
      title="Pi Recon"
      productName="Pi Recon"
      productSlug="recon"
      description={[
        "Pi Recon is an AI-powered reconciliation module that helps you match and resolve transactions across systems. You can upload data, manage reconciliation tables, and track updates in one place.",
        "In the full Pi Repository this product is connected to live reconciliation APIs and your data. In the Sandbox you can learn the workflows from the tutorial video. Use the Request Access button when you are ready to use Pi Recon.",
      ]}
    />
  );
}
