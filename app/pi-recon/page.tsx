import SandboxPage from "@/components/SandboxPage";

export default function PiReconPage() {
  return (
    <SandboxPage
      title="Pi Recon"
      productName="Pi Recon"
      productSlug="recon"
      description={[
        "Pi Recon is an AI-powered reconciliation module that matches and resolves transactions across systems. Upload data, manage reconciliation tables, and track match rates and exceptions in one place.",
        "Automated matching and clear exception handling cut down manual recon work and help you close the books faster. The tutorial walks through the workflow.",
      ]}
    />
  );
}
