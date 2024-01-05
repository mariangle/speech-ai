import { Icons } from '@/components/ui/icons';
import ThemeSwitcher from './theme-switcher';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t bg-background/30 backdrop-blur-lg">
      <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 space-y-2">
        <div className="">
          <div className="font-semibold">.taskify</div>
          <div className="text-xs mt-2 text-muted-foreground">
            © 2024 .taskify. All rights reserved.
          </div>
        </div>
        <div className="flex-gap md:justify-end">
          <ThemeSwitcher />
          <Icons.GitHub className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}
