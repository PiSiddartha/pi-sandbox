import SandboxPage from "@/components/SandboxPage";

export default function SettingsPage() {
  return (
    <SandboxPage
      title="Settings"
      description={[
        "Settings let you manage your account preferences, notifications, and other configuration options for the Pi platform.",
        "In the full Pi Repository this page is connected to your profile and tenant settings. In the Sandbox you can see the structure from the tutorial video. Authentication for the Sandbox (e.g. cognitive-based auth) can be added later.",
      ]}
    />
  );
}
