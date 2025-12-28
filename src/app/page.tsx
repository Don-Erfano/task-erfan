import { ThemeSwitch } from "@/components";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-4 text-black dark:bg-black dark:text-white">
      <ThemeSwitch />
    </div>
  );
}
