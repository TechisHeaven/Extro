"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const chartData = [
  { browser: "mon", transaction: 187, fill: "var(--mainColor)" },
  { browser: "tue", transaction: 200, fill: "var(--mainColor)" },
  { browser: "wed", transaction: 275, fill: "var(--mainColor)" },
  { browser: "thu", transaction: 173, fill: "var(--mainColor)" },
  { browser: "fri", transaction: 90, fill: "var(--mainColor)" },
  { browser: "sat", transaction: 90, fill: "var(--mainColor)" },
  { browser: "sun", transaction: 90, fill: "var(--mainColor)" },
];

const chartConfig = {
  mon: {
    label: "Mon",
  },
  tue: {
    label: "Tue",
    color: "hsl(var(--chart-1))",
  },
  wed: {
    label: "Wed",
    color: "hsl(var(--chart-2))",
  },
  thu: {
    label: "Thu",
    color: "hsl(var(--chart-3))",
  },
  fri: {
    label: "Fri",
    color: "hsl(var(--chart-4))",
  },
  sat: {
    label: "Sat",
    color: "hsl(var(--chart-5))",
  },
  sun: {
    label: "Sun",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface BarChartHandleProps {
  browser: string;
  transaction: number;
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  payload: { browser: string; transaction: number; fill: string };
  background: { x: number; y: number; width: number; height: number };
  tooltipPayload: [
    {
      strokeWidth: number;
      radius: number;
      dataKey: string;
      name: string;
      value: number;
      payload: {
        browser: string;
        transaction: number;
        fill: string;
      };
      hide: boolean;
    }
  ];
  tooltipPosition: { x: number; y: number };
}
export default function BarChartComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeChartIndex, setActiveChartIndex] = useState<number>(
    Number(searchParams.get("selected")) || -1
  );

  //handle click on bar chart
  function handleClick(e: BarChartHandleProps, index: number) {
    const selectedChartIndex = index + 1;
    const chartActiveParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (activeChartIndex === selectedChartIndex) {
      chartActiveParams.delete("selected");
      setActiveChartIndex(-1);
    } else {
      chartActiveParams.set("selected", JSON.stringify(selectedChartIndex));
      setActiveChartIndex(selectedChartIndex);
    }

    const search = chartActiveParams.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  return (
    <div>
      <ChartContainer config={chartConfig} className="h-[300px] max-w-[330px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="browser"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            className={`cursor-pointer`}
            onClick={handleClick}
            dataKey="transaction"
            strokeWidth={2}
            radius={8}
            activeIndex={activeChartIndex - 1}
            background
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              );
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
