import SandboxPage from "@/components/SandboxPage";

export default function SettingsPage() {
  return (
    <SandboxPage
      title="Settings"
      description={[
        "Settings let you manage account preferences, notifications, and configuration for the Pi platform so everything is tuned to how you work.",
        "One place to control who sees what, how you're notified, and how the platform behaves for your team.",
      ]}
    />
  );
}
