export interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 7, suffix: "+", label: "Years of Innovation" },
];
