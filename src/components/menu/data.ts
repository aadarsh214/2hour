import {
  Home,
  Box,
  Building2,
  BookOpen,
  Headphones,
  Lightbulb,
  Leaf,
  TrendingUp,
  Mail,
  Cloud,
  Code2,
  Workflow,
  UsersRound,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import type { MenuItem } from "./types";

export const mainMenu: MenuItem[] = [
  { icon: Home, title: "Home", subtitle: "Welcome to our comprehensive platform" },
  {
    icon: Box,
    title: "Products & Services",
    subtitle: "Explore our comprehensive offerings",
    sub: [
      { icon: Server, title: "Software Solutions", subtitle: "Custom software development and deployment" },
      { icon: Cloud, title: "Cloud & Infrastructure", subtitle: "Scalable cloud solutions and infrastructure" },
      {
        icon: Headphones,
        title: "Consulting Services",
        subtitle: "Expert guidance and strategic support",
        sub: [
          {
            icon: Server,
            title: "Technical Consulting",
            subtitle: "Architecture and implementation guidance",
            sub: [
              { icon: Server, title: "System Architecture", subtitle: "Scalable system design and planning" },
              { icon: Zap, title: "Performance Optimization", subtitle: "Application and system optimization" },
              { icon: Shield, title: "Security Audits", subtitle: "Comprehensive security assessments" },
            ],
          },
          { icon: TrendingUp, title: "Business Strategy", subtitle: "Digital transformation and business planning" },
          {
            icon: BookOpen,
            title: "Training & Workshops",
            subtitle: "Team skill development and knowledge transfer",
            sub: [
              { icon: Code2, title: "Technical Training", subtitle: "Programming and technology skills" },
              { icon: Workflow, title: "Agile Methodologies", subtitle: "Scrum, Kanban, and agile practices" },
              { icon: UsersRound, title: "Leadership & Management", subtitle: "Technical leadership and team management" },
            ],
          },
        ],
      },
      { icon: Lightbulb, title: "Digital Transformation", subtitle: "Comprehensive digital transformation strategies" },
      { icon: Shield, title: "Cybersecurity Consulting", subtitle: "Comprehensive cybersecurity solutions" },
      { icon: BookOpen, title: "Data & Analytics Consulting", subtitle: "Data strategy, analytics, and business intelligence" },
      { icon: Zap, title: "DevOps & Platform Engineering", subtitle: "DevOps transformation and platform engineering" },
      { icon: Headphones, title: "Support & Maintenance", subtitle: "Ongoing maintenance and support services" },
    ],
  },
  { icon: Building2, title: "Industry Solutions", subtitle: "Specialized solutions for different industries" },
  { icon: BookOpen, title: "Resources", subtitle: "Knowledge base, tools, and learning materials" },
  { icon: Headphones, title: "Support", subtitle: "Get help and support when you need it" },
  { icon: Lightbulb, title: "Research & Innovation", subtitle: "Cutting-edge research and innovation initiatives" },
  { icon: Leaf, title: "Sustainability", subtitle: "Environmental responsibility and sustainable technology" },
  { icon: TrendingUp, title: "Investor Relations", subtitle: "Financial information and investor resources" },
  { icon: Mail, title: "Contact", subtitle: "Get in touch with our team" },
];
