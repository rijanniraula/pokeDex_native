import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // adjust path
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import React from "react";
import { View } from "react-native";

export interface TabItem {
  key: string;
  title: string;
  content: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  tabListClassName?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultValue,
  className,
  tabListClassName,
}) => {
  const [value, setValue] = React.useState(defaultValue || tabs[0]?.key);

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className={className}
      style={{ flex: 1, zIndex: 100 }}
    >
      <TabsList
        className={cn("self-start gap-4 bg-transparent", tabListClassName)}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            style={{
              backgroundColor: "transparent",
              borderRadius: 0,
              borderBottomWidth: 2,
              borderBottomColor: tab.key === value ? "blue" : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: tab.key === value ? "black" : "gray",
              }}
              className="font-poppins-medium"
            >
              {tab.title}
            </Text>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.key}
          value={tab.key}
          style={{ flex: 1 }}
          className={cn("px-2 mt-2", tab.contentClassName)}
        >
          <View style={{ flex: 1 }}>{tab.content}</View>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
