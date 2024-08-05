import MainCard from "@/app/(main)/MainCard";
import React from "react";
import HoverCardComponent from "../HoverCard/HoverCard";
import { Button } from "../button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ConnectWalletContainer = () => {
  return (
    <MainCard
      badge="2 Min Technical"
      className="w-full"
      description="connect your web3 wallet to track your web3 expenses too."
      title="Connect your Wallet"
    >
      <div className="justify-between items-center inline-flex w-full">
        <HoverCardComponent
          trigger={
            <Button className="p-2 px-4" variant="link">
              Learn More <ChevronRight className="w-4 h-4 " />
            </Button>
          }
        >
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Learn more</h4>
              <p className="text-sm">Connect your web3 wallet on one click.</p>
            </div>
          </div>
        </HoverCardComponent>
        <Button className="bg-mainColor px-4">Connect Wallet</Button>
      </div>
    </MainCard>
  );
};

export default ConnectWalletContainer;
