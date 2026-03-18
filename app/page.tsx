import SandboxPage from "@/components/SandboxPage";

export default function DashboardPage() {
  return (
    <SandboxPage
      title="Dashboard"
      description={[
        "The Dashboard gives you a single view of your payment and transaction metrics. Real-time KPIs—total transaction value, volume, approval rate, and average ticket size—plus trend comparisons so you can see how you're performing at a glance.",
        "Charts and graphs here make it easier to spot patterns, catch issues early, and share a clear picture with your team. One place to see what's happening across your payments.",
      ]}
    />
  );
}
