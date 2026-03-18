import SandboxPage from "@/components/SandboxPage";

export default function ReportsPage() {
  return (
    <SandboxPage
      title="Reports"
      description={[
        "Reports give you access to transaction history, custom reports, and scheduled exports. You can filter by date, status, and other criteria and drill into individual transaction details.",
        "In the live Pi Repository this section is backed by real reporting APIs and data. Here in the Sandbox you can familiarize yourself with the layout and workflows via the tutorial video before going live.",
      ]}
    />
  );
}
