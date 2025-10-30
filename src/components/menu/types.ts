import { type LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  sub?: MenuItem[];
  href?: string;
}

