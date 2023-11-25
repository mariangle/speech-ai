import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    Palette,
    LineChart
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import ThemeSwitcher from "@/components/theme-switcher";

  
  import AuthService from "@/helpers/services/auth-service";
  const authService = new AuthService();
  
  const UserProfileDropdown = () => {
    
      const dropdownItems = [
        { label: "Analytics", key: "analytics", icon: <LineChart className="mr-2 h-4 w-4" />, href: "/analytics" },
        { label: "Billing", key: "billing", icon: <CreditCard className="mr-2 h-4 w-4" />, href: "/settings/account" },
        { label: "Account", key: "account", icon: <Settings className="mr-2 h-4 w-4" />, href: "/settings/account", shortcut: "⌘S"},
      ];
  
    const onLogout = async () => {
      await authService.logout();
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {dropdownItems.map((item) => (
                    <DropdownMenuItem key={item.key} >
                        {item.icon}
                        <span>{item.label}</span>
                        <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                ))}
                <ThemeSwitcher />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default UserProfileDropdown;
  