import SandboxPage from "@/components/SandboxPage";

export default function DashboardPage() {
  return (
    <SandboxPage
      title="Dashboard"
      description={[
        "The Dashboard gives you a single view of your payment and transaction metrics. You can see real-time KPIs such as total transaction value, number of transactions, approval rate, and average transaction value, with optional trend comparisons.",
        "In the full Pi Repository, this page is connected to live APIs and shows interactive charts (e.g. transaction trends and today’s activity). Here in the Sandbox you can explore the layout and watch the tutorial video before requesting access to the live product.",
      ]}
    />
  );
}
